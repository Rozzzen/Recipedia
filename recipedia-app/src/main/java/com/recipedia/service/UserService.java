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
        User user = (User) connectedUser.getPrincipal();
        return userMapper.toUserResponse(user);
    }

    public UserResponse getUser(Long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new UsernameNotFoundException("user not found: " + id));
        return userMapper.toUserResponse(user);
    }

    public Long update(UserRequest request) {
        User user = userRepository.findById(request.id())
                .orElseThrow(() -> new UsernameNotFoundException("user not found: " + request.id()));
        user.setFirstname(request.firstname());
        user.setLastname(request.lastname());
        return userRepository.save(user).getId();
    }
}