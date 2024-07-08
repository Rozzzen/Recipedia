package com.recipedia.dto;


import jakarta.validation.constraints.*;

public record ReviewRequest(

        @Positive(message = "Rate should be positive")
        @Min(value = 0, message = "Rate should not be less than 0")
        @Max(value = 5, message = "Rate should not be greater than 5")
        Double rate,

        @NotNull(message = "Comment should not be empty")
        @NotEmpty(message = "Comment should not be empty")
        @NotBlank(message = "Comment should not be empty")
        String comment,

        @NotNull(message = "Recipe ID should not be empty")
        Long recipeId
) {
}
