package com.recipedia.dto;

import jakarta.validation.constraints.*;

public record RegistrationRequest(
        @NotEmpty(message = "First name is mandatory")
        @NotNull(message = "First name is mandatory")
        @NotBlank(message = "First name is mandatory")
        String firstname,
        @NotEmpty(message = "Last name is mandatory")
        @NotNull(message = "Last name is mandatory")
        @NotBlank(message = "Last name is mandatory")
        String lastname,
        @Email(message = "email is not formatted")
        @NotEmpty(message = "Email is mandatory")
        @NotNull(message = "Email is mandatory")
        @NotBlank(message = "Email is mandatory")
        String email,
        @NotEmpty(message = "Password is mandatory")
        @NotNull(message = "Password is mandatory")
        @Size(min = 8, message = "Password should be at least 8 characters long")
        String password
) {}
