package com.recipedia.service;

import com.recipedia.domain.Recipe;
import com.recipedia.domain.RecipeTag;
import com.recipedia.domain.auth.User;
import com.recipedia.dto.PageResponse;
import com.recipedia.dto.RecipeRequest;
import com.recipedia.dto.RecipeResponse;
import com.recipedia.repo.RecipeRepository;
import com.recipedia.util.EntityMapper;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

import static com.recipedia.util.RecipediaSpecification.containsTag;
import static com.recipedia.util.RecipediaSpecification.withAuthorId;

@Service
@RequiredArgsConstructor
public class RecipeService {

    private final EntityMapper recipeMapper;
    private final RecipeRepository recipeRepository;
    private final FileStorageService fileStorageService;

    public Long save(RecipeRequest request) {
        Recipe recipe = recipeMapper.toRecipe(request);
        return recipeRepository.save(recipe).getId();
    }

    public RecipeResponse findById(Long recipeId) {
        return recipeRepository.findById(recipeId)
                .map(recipeMapper::toRecipeResponse)
                .orElseThrow(() -> new EntityNotFoundException("No recipe found with id:" + recipeId));
    }

    public PageResponse<RecipeResponse> findAllRecipes(int page, int size, List<RecipeTag> tags) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        Page<Recipe> recipes = recipeRepository.findAll(containsTag(tags), pageable);

        List<RecipeResponse> recipeResponse = recipes.stream()
                .map(recipeMapper::toRecipeResponse)
                .toList();

        return new PageResponse<>(
                recipeResponse,
                recipes.getNumber(),
                recipes.getSize(),
                recipes.getTotalElements(),
                recipes.getTotalPages(),
                recipes.isFirst(),
                recipes.isLast()
        );
    }

    public PageResponse<RecipeResponse> findAllRecipesByOwner(int page, int size, List<RecipeTag> tags, Authentication connectedUser) {
        User user = (User) connectedUser.getPrincipal();

        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        Page<Recipe> recipes = recipeRepository.findAll(withAuthorId(user.getId()).and(containsTag(tags)), pageable);

        List<RecipeResponse> recipeResponse = recipes.stream()
                .map(recipeMapper::toRecipeResponse)
                .toList();

        return new PageResponse<>(
                recipeResponse,
                recipes.getNumber(),
                recipes.getSize(),
                recipes.getTotalElements(),
                recipes.getTotalPages(),
                recipes.isFirst(),
                recipes.isLast()
        );
    }

    public void uploadRecipeTitleImage(MultipartFile file, Authentication connectedUser, Long recipeId) {
        Recipe recipe = recipeRepository.findById(recipeId)
                .orElseThrow(() -> new EntityNotFoundException("No recipe found with id:" + recipeId));

        User user = (User) connectedUser.getPrincipal();
        var recipeTitleImage = fileStorageService.saveRecipeTitleImage(file, user.getId(), recipeId);
        recipe.setTitleImage(recipeTitleImage);
        recipeRepository.save(recipe);
    }

    public void deleteRecipe(Long recipeId) {
        recipeRepository.deleteById(recipeId);
    }
}
