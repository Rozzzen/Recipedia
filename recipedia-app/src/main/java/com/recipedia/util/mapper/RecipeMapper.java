package com.recipedia.util.mapper;

import com.recipedia.domain.Recipe;
import com.recipedia.dto.RecipeRequest;
import com.recipedia.dto.RecipeResponse;
import com.recipedia.util.FileUtils;
import org.springframework.stereotype.Service;

@Service
public class RecipeMapper {
    public Recipe toRecipe(RecipeRequest recipeRequest) {
        return Recipe.builder()
                .id(recipeRequest.id())
                .title(recipeRequest.title())
                .description(recipeRequest.description())
                .preparationTime(recipeRequest.preparationTime())
                .cookingTime(recipeRequest.cookingTime())
                .cookingSteps(recipeRequest.cookingSteps())
                .ingredients(recipeRequest.ingredients())
                .tags(recipeRequest.tags())
                .build();
    }

    public RecipeResponse toRecipeResponse(Recipe recipe) {
        return RecipeResponse.builder()
                .id(recipe.getId())
                .title(recipe.getTitle())
                .description(recipe.getDescription())
                .rate(recipe.getRate())
                .preparationTime(recipe.getPreparationTime())
                .cookingTime(recipe.getCookingTime())
                .cookingSteps(recipe.getCookingSteps())
                .ingredients(recipe.getIngredients())
                .tags(recipe.getTags())
                .titleImage(FileUtils.readFileFromLocation(recipe.getTitleImage()))
                .build();
    }
}
