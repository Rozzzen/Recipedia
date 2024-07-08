package com.recipedia.controller;

import com.recipedia.dto.UserRequest;
import com.recipedia.dto.UserResponse;
import com.recipedia.service.UserService;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("user")
@RequiredArgsConstructor
@Tag(name = "User")
public class UserController {

    private final UserService userService;

    @PostMapping(value = "/image", consumes = "multipart/form-data")
    public ResponseEntity<?> uploadProfilePicture(
            @Parameter()
            @RequestPart("file") MultipartFile file,
            Authentication connectedUser
    ) {
        userService.uploadProfilePicture(file, connectedUser);
        return ResponseEntity.accepted().build();
    }

    @PostMapping
    public ResponseEntity<Long> saveUser(
            @Valid @RequestBody UserRequest request) {
        return ResponseEntity.ok(userService.save(request));
    }

    @GetMapping
    public ResponseEntity<UserResponse> loadUser(
            Authentication connectedUser
    ) {
        return ResponseEntity.ok(
                userService.getAuthenticatedUser(connectedUser)
        );
    }
}
