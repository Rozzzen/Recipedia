package com.recipedia.util;

import com.recipedia.domain.Recipe;
import com.recipedia.domain.Review;
import com.recipedia.domain.auth.User;
import com.recipedia.dto.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
public class EntityMapper {

    @Value("${application.file.uploads.no-image}")
    private String noImage;

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
                .titleImage(noImage)
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

    public Review toReview(ReviewRequest request) {
        return Review.builder()
                .rate(request.rate())
                .comment(request.comment())
                .recipe(Recipe.builder()
                        .id(request.recipeId())
                        .build())
                .build();
    }

    public ReviewResponse toReviewResponse(Review review, Long id) {
        return ReviewResponse.builder()
                .rate(review.getRate())
                .comment(review.getComment())
                .ownFeedback(Objects.equals(review.getCreatedBy(), id))
                .build();
    }

    public UserResponse toUserResponse(User user) {
        return UserResponse.builder()
                .id(user.getId())
                .firstname(user.getFirstname())
                .lastname(user.getLastname())
                .email(user.getEmail())
                .profilePicture(FileUtils.readFileFromLocation(user.getProfilePicture()))
                .build();
    }

    public User toUser(UserRequest userRequest) {
        return User.builder()
                .id(userRequest.id())
                .firstname(userRequest.firstname())
                .lastname(userRequest.lastname())
                .email(userRequest.email())
                .build();
    }
}
