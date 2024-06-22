package com.recipedia.controller;

import com.recipedia.dto.PageResponse;
import com.recipedia.dto.ReviewRequest;
import com.recipedia.dto.ReviewResponse;
import com.recipedia.service.ReviewService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/recipe/{recipe-id}")
    public ResponseEntity<PageResponse<ReviewResponse>> findAllReviewsByRecipe(
            @PathVariable("recipe-id") Long recipeId,
            @RequestParam(name = "page", defaultValue = "0", required = false) int page,
            @RequestParam(name = "size", defaultValue = "10", required = false) int size,
            Authentication connectedUser
    ) {
        return ResponseEntity.ok(reviewService.findAllReviewsByRecipe(recipeId, page, size, connectedUser));
    }


}
