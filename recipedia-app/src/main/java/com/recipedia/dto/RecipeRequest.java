package com.recipedia.dto;

import com.recipedia.domain.CookingStep;
import com.recipedia.domain.Ingredient;
import com.recipedia.domain.RecipeTag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.time.Duration;
import java.util.List;

public record RecipeRequest(
        Long id,
        @NotNull(message = "100")
        @NotEmpty(message = "100")
        String title,
        @NotNull(message = "101")
        @NotEmpty(message = "101")
        String description,
        @NotNull(message = "102")
        Duration preparationTime,
        @NotNull(message = "103")
        Duration cookingTime,
        @NotEmpty(message = "104")
        List<@Valid CookingStep> cookingSteps,
        @NotEmpty(message = "105")
        List<@Valid Ingredient> ingredientList,

        List<RecipeTag> tags
) {
}
