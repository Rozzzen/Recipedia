package com.recipedia.service;

import com.recipedia.domain.auth.User;
import com.recipedia.dto.UserRequest;
import com.recipedia.dto.UserResponse;
import com.recipedia.repo.UserRepository;
import com.recipedia.util.EntityMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final FileStorageService fileStorageService;
    private final EntityMapper userMapper;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String userEmail) throws UsernameNotFoundException {
        return userRepository.findByEmail(userEmail).orElseThrow(() -> new UsernameNotFoundException("username not found: " + userEmail));
    }

    public void uploadProfilePicture(MultipartFile file, Authentication connectedUser) {
        User user = (User) connectedUser.getPrincipal();
        String profilePicture = fileStorageService.saveUserProfilePicture(file, user);
        user.setProfilePicture(profilePicture);
        userRepository.save(user);
    }

    public UserResponse getAuthenticatedUser(Authentication connectedUser) {
        User principal = (User) connectedUser.getPrincipal();
        User user = userRepository.findById(principal.getId()).orElseThrow(() -> new UsernameNotFoundException("user not found: " + principal.getId()));

        return userMapper.toUserResponse(user);
    }

    public Long save(UserRequest request) {
        User user = userMapper.toUser(request);
        return userRepository.save(user).getId();
    }
}
