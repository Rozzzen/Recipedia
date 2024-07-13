package com.recipedia.controller;

import com.recipedia.dto.ReviewRequest;
import com.recipedia.dto.ReviewResponse;
import com.recipedia.service.ReviewService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Tag(name = "Review")
@RequestMapping("reviews")
public class ReviewController {

    private final ReviewService reviewService;

    @PostMapping
    public ResponseEntity<Long> saveReview(
            @Valid @RequestBody ReviewRequest request,
            Authentication connectedUser
    ) {
        return ResponseEntity.ok(reviewService.save(request, connectedUser));
    }

    //TODO lazy load(like youtube comments)?
    @GetMapping("/{recipe-id}")
    public ResponseEntity<List<ReviewResponse>> findAllReviewsByRecipe(
            @PathVariable("recipe-id") Long recipeId
    ) {
        return ResponseEntity.ok(reviewService.findAllReviewsByRecipe(recipeId));
    }
}
