package com.recipedia.controller;

import com.recipedia.domain.RecipeTag;
import com.recipedia.dto.PageResponse;
import com.recipedia.dto.RecipeRequest;
import com.recipedia.dto.RecipeResponse;
import com.recipedia.service.RecipeService;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("recipes")
@RequiredArgsConstructor
@Tag(name = "Recipe")
public class RecipeController {

    private final RecipeService recipeService;

    @PostMapping
    public ResponseEntity<Long> saveRecipe(
            @Valid @RequestBody RecipeRequest request) {
        return ResponseEntity.ok(recipeService.save(request));
    }

    @GetMapping("{recipe-id}")
    public ResponseEntity<RecipeResponse> findRecipeById(
            @PathVariable("recipe-id") Long recipeId) {
        return ResponseEntity.ok(recipeService.findById(recipeId));
    }

    @DeleteMapping("{recipe-id}")
    public ResponseEntity<Void> deleteRecipeById(
            @PathVariable("recipe-id") Long recipeId) {
        recipeService.deleteRecipe(recipeId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<PageResponse<RecipeResponse>> findAllRecipes(
            @RequestParam(name = "page", defaultValue = "0", required = false) int page,
            @RequestParam(name = "size", defaultValue = "10", required = false) int size,
            @RequestParam(name = "search", required = false) String searchString,
            @RequestParam(name = "tags", required = false) List<RecipeTag> tags) {
        return ResponseEntity.ok(recipeService.findAllRecipes(page, size, tags, searchString));
    }

    @GetMapping("/author")
    public ResponseEntity<PageResponse<RecipeResponse>> findAllRecipesByAuthor(
            @RequestParam(name = "page", defaultValue = "0", required = false) int page,
            @RequestParam(name = "size", defaultValue = "10", required = false) int size,
            @RequestParam(name = "search", required = false) String searchString,
            @RequestParam(name = "tags", required = false) List<RecipeTag> tags,
            Authentication connectedUser) {
        return ResponseEntity.ok(recipeService.findAllRecipesByOwner(page, size, tags, searchString, connectedUser));
    }

    @PostMapping(value = "/image/{recipe-id}", consumes = "multipart/form-data")
    public ResponseEntity<?> uploadRecipeTitleImage(
            @PathVariable("recipe-id") Long recipeId,
            @Parameter()
            @RequestPart("file") MultipartFile file,
            Authentication connectedUser
    ) {
        recipeService.uploadRecipeTitleImage(file, connectedUser, recipeId);
        return ResponseEntity.accepted().build();
    }
}
