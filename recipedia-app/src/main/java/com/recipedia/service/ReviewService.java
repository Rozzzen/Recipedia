package com.recipedia.service;

import com.recipedia.domain.Recipe;
import com.recipedia.domain.Review;
import com.recipedia.domain.auth.User;
import com.recipedia.dto.ReviewRequest;
import com.recipedia.dto.ReviewResponse;
import com.recipedia.exception.OperationNotPermittedException;
import com.recipedia.repo.RecipeRepository;
import com.recipedia.repo.ReviewRepository;
import com.recipedia.repo.UserRepository;
import com.recipedia.util.EntityMapper;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class ReviewService {
    private final RecipeRepository recipeRepository;
    private final UserRepository userRepository;
    private final EntityMapper reviewMapper;
    private final ReviewRepository reviewRepository;
    private final EntityMapper entityMapper;

    public Long save(ReviewRequest request, Authentication connectedUser) {
        User user = (User) connectedUser.getPrincipal();
        Recipe recipe = recipeRepository.findById(request.recipeId())
                .orElseThrow(() -> new EntityNotFoundException("No recipe found with id:" + request.recipeId()));

        boolean isReviewed = reviewRepository.findAllByRecipeId(request.recipeId())
                .stream()
                .map(Review::getCreatedBy)
                .anyMatch(createdBy -> createdBy.equals(user.getId()));

        if (Objects.equals(recipe.getCreatedBy(), user.getId())) {
            throw new OperationNotPermittedException("You cannot give review to your own recipe");
        }
        else if (isReviewed) {
            throw new OperationNotPermittedException("You have already reviewed this recipe");
        }

        Review review = reviewMapper.toReview(request);
        return reviewRepository.save(review).getId();
    }

    public List<ReviewResponse> findAllReviewsByRecipe(Long recipeId) {
        List<Review> reviews = reviewRepository.findAllByRecipeId(recipeId);

        return reviews.stream()

                .map(r -> reviewMapper.toReviewResponse(
                        r, entityMapper.toUserResponse(
                                userRepository.findById(
                                        r.getCreatedBy())
                                        .orElseThrow(() -> new UsernameNotFoundException("user(author) not found")))))
                .toList();
    }
}
