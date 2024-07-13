package com.recipedia.dto;


import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record ReviewRequest(

        @Positive(message = "Rate should be positive")
        @Min(value = 0, message = "Rate should not be less than 0")
        @Max(value = 5, message = "Rate should not be greater than 5")
        Double rate,

        String comment,

        @NotNull(message = "Recipe ID should not be empty")
        Long recipeId
) {
}
