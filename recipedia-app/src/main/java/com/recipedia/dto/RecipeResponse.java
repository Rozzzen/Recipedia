package com.recipedia.dto;

import com.recipedia.domain.CookingStep;
import com.recipedia.domain.Ingredient;
import com.recipedia.domain.RecipeTag;
import lombok.Builder;

import java.util.List;

@Builder
public record RecipeResponse(
        Long id,
        Long createdBy,
        String title,
        String description,
        String preparationTime,
        String cookingTime,
        Double rate,
        List<CookingStep> cookingSteps,
        List<Ingredient> ingredients,
        List<RecipeTag> tags,
        byte[] titleImage) {
}
