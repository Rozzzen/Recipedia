package com.recipedia.service;

import com.recipedia.domain.Recipe;
import com.recipedia.domain.Review;
import com.recipedia.domain.auth.User;
import com.recipedia.dto.PageResponse;
import com.recipedia.dto.ReviewRequest;
import com.recipedia.dto.ReviewResponse;
import com.recipedia.exception.OperationNotPermittedException;
import com.recipedia.repo.RecipeRepository;
import com.recipedia.repo.ReviewRepository;
import com.recipedia.util.mapper.ReviewMapper;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class ReviewService {
    private final RecipeRepository recipeRepository;
    private final ReviewMapper reviewMapper;
    private final ReviewRepository reviewRepository;

    public Long save(ReviewRequest request, Authentication connectedUser) {
        User user = (User) connectedUser.getPrincipal();
        Recipe recipe = recipeRepository.findById(request.recipeId())
                .orElseThrow(() -> new EntityNotFoundException("No recipe found with id:" + request.recipeId()));

        if (Objects.equals(recipe.getCreatedBy(), user.getId())) {
            throw new OperationNotPermittedException("You cannot give review to your own recipe");
        }
        Review review = reviewMapper.toReview(request);
        return reviewRepository.save(review).getId();
    }

    public PageResponse<ReviewResponse> findAllReviewsByRecipe(Long recipeId, int page, int size, Authentication connectedUser) {
        Pageable pageable = PageRequest.of(page, size);
        User user = (User) connectedUser.getPrincipal();
        Page<Review> reviews = reviewRepository.findAllByRecipeId(recipeId, pageable);
        List<ReviewResponse> reviewResponses = reviews.stream()
                .map(r -> reviewMapper.toReviewResponse(r, user.getId()))
                .toList();
        return new PageResponse<>(
                reviewResponses,
                reviews.getNumber(),
                reviews.getSize(),
                reviews.getTotalElements(),
                reviews.getTotalPages(),
                reviews.isFirst(),
                reviews.isLast()
        );
    }
}
