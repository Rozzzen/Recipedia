package com.recipedia.service;

import com.recipedia.domain.auth.EmailTemplate;
import com.recipedia.domain.auth.Token;
import com.recipedia.domain.auth.User;
import com.recipedia.dto.AuthenticationRequest;
import com.recipedia.dto.AuthenticationResponse;
import com.recipedia.dto.RegistrationRequest;
import com.recipedia.repo.RoleRepository;
import com.recipedia.repo.TokenRepository;
import com.recipedia.repo.UserRepository;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final TokenRepository tokenRepository;
    private final EmailService emailService;
    private final AuthenticationManager authManager;
    private final JwtService jwtService;

    @Value("${application.mailing.frontend.activation-url}")
    private String activationUrl;
    @Value("${application.file.uploads.default-profile-picture}")
    private String defaultProfilePicture;

    private final int ACTIVATION_CODE_LENGTH = 6;

    public void register(RegistrationRequest request) throws MessagingException {
        //todo custom exception
        var userRole = roleRepository.findByName("USER").orElseThrow(IllegalStateException::new);
        var user = User.builder()
                .firstname(request.firstname())
                .lastname(request.lastname())
                .email(request.email())
                .password(passwordEncoder.encode(request.password()))
                .accountLocked(false)
                .enabled(false)
                .roles(List.of(userRole))
                .profilePicture(defaultProfilePicture)
                .build();
        userRepository.save(user);
        sendVerificationEmail(user);
    }

    private void sendVerificationEmail(User user) throws MessagingException {
        var newToken = generateAndSaveActivationToken(user);
        emailService.sendEmail(
                user.getEmail(),
                user.getFullName(),
                EmailTemplate.ACTIVATE_ACCOUNT,
                activationUrl,
                newToken,
                "Account activation"
        );
    }

    private String generateAndSaveActivationToken(User user) {
        String generatedToken = generateActivationCode();
        var token = Token.builder()
                .token(generatedToken)
                .user(user)
                .build();
        tokenRepository.save(token);
        return generatedToken;
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        var auth = authManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.email(), request.password())
        );
        var claims = new HashMap<String, Object>();
        var user = (User) auth.getPrincipal();
        claims.put("fullName", user.getFullName());
        var jwtToken = jwtService.generateToken(claims, user);
        return AuthenticationResponse.builder()
                .jwtToken(jwtToken).build();
    }

    @Transactional
    public void activateAccount(String token) throws MessagingException {
        Token savedToken = tokenRepository.findByToken(token)
                //todo custom exception
                .orElseThrow(RuntimeException::new);
        if (LocalDateTime.now().isAfter(savedToken.getExpiresAt())) {
            sendVerificationEmail(savedToken.getUser());
            throw new RuntimeException("Activation token has expired. A new Token has been sent");
        }
        var user = userRepository.findById(savedToken.getUser().getId())
                .orElseThrow(() -> new UsernameNotFoundException("User with id" + savedToken.getUser().getId() + "not found"));
        user.setEnabled(true);
        userRepository.save(user);
        savedToken.setValidatedAt(LocalDateTime.now());
        tokenRepository.save(savedToken);
    }

    private String generateActivationCode() {
        String characters = "0123456789";
        StringBuilder codeBuilder = new StringBuilder();
        SecureRandom secureRandom = new SecureRandom();
        for (int i = 0; i < ACTIVATION_CODE_LENGTH; i++) {
            int randomIndex = secureRandom.nextInt(characters.length());
            codeBuilder.append(characters.charAt(randomIndex));
        }
        return codeBuilder.toString();
    }
}
