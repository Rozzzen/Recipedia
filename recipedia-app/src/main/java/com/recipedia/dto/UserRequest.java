package com.recipedia.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public record UserRequest(

        Long id,

        @NotNull(message = "First name should not be empty")
        @NotEmpty(message = "First name should not be empty")
        String firstname,

        @NotNull(message = "Last name should not be empty")
        @NotEmpty(message = "Last name should not be empty")
        String lastname,

        @NotNull(message = "Email should not be empty")
        @NotEmpty(message = "Email should not be empty")
        String email) {
}
