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

        @NotNull(message = "100")
        @NotEmpty(message = "100")
        String title,

        @NotNull(message = "101")
        @NotEmpty(message = "101")
        String description,

        @NotNull(message = "102")
        @NotEmpty(message = "102")
        @Pattern(regexp = "^(?:[1-5]?\\d(?:\\.\\d+)?|60(?:\\.0+)?) (minutes|minute|mins|min|hours|hour|hrs|hr)$", message = "102")
        String preparationTime,

        @NotNull(message = "103")
        @NotEmpty(message = "103")
        @Pattern(regexp = "^(?:[1-5]?\\d(?:\\.\\d+)?|60(?:\\.0+)?) (minutes|minute|mins|min|hours|hour|hrs|hr)$", message = "103")
        String cookingTime,

        @NotEmpty(message = "104")
        List<@Valid CookingStep> cookingSteps,

        @NotEmpty(message = "105")
        List<@Valid Ingredient> ingredients,

        List<RecipeTag> tags
) {
}
