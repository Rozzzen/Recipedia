package com.recipedia.dto;

import com.recipedia.domain.CookingStep;
import com.recipedia.domain.Ingredient;
import com.recipedia.domain.RecipeTag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

import java.util.List;

public record RecipeRequest(
        Long id,

        @NotNull(message = "Title should not be empty")
        @NotEmpty(message = "Title should not be empty")
        String title,

        @NotNull(message = "Description should not be empty")
        @NotEmpty(message = "Description should not be empty")
        String description,

        @NotNull(message = "Preparation time should not be empty")
        @NotEmpty(message = "Preparation time should not be empty")
        @Pattern(regexp = "^(?:[1-5]?\\d(?:\\.\\d+)?|60(?:\\.0+)?) (minutes|minute|mins|min|hours|hour|hrs|hr)$", message = "Preparation time should be a valid duration in minutes or hours")
        String preparationTime,

        @NotNull(message = "Cooking time should not be empty")
        @NotEmpty(message = "Cooking time should not be empty")
        @Pattern(regexp = "^(?:[1-5]?\\d(?:\\.\\d+)?|60(?:\\.0+)?) (minutes|minute|mins|min|hours|hour|hrs|hr)$", message = "Cooking time should be a valid duration in minutes or hours")
        String cookingTime,

        @NotEmpty(message = "Cooking steps should not be empty")
        List<@Valid CookingStep> cookingSteps,

        @NotEmpty(message = "Ingredients should not be empty")
        List<@Valid Ingredient> ingredients,

        List<RecipeTag> tags
) {
}
