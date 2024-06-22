package com.recipedia.util.mapper;

import com.recipedia.domain.Recipe;
import com.recipedia.domain.Review;
import com.recipedia.dto.ReviewRequest;
import com.recipedia.dto.ReviewResponse;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
public class ReviewMapper {
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
}
