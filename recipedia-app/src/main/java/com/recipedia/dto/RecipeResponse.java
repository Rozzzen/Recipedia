package com.recipedia.dto;

import com.recipedia.domain.CookingStep;
import com.recipedia.domain.Ingredient;
import com.recipedia.domain.RecipeTag;
import lombok.Builder;

import java.time.Duration;
import java.util.List;

@Builder
public record RecipeResponse(
        Long id,
        String title,
        String description,
        Duration preparationTime,
        Duration cookingTime,
        List<CookingStep> cookingSteps,
        List<Ingredient> ingredientList,
        List<RecipeTag> tags
) {
}
