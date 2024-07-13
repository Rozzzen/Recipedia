package com.recipedia.repo;

import com.recipedia.domain.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {

    @Query("""
             SELECT review
             FROM Review  review
             WHERE review.recipe.id = :recipeId
            """)
    List<Review> findAllByRecipeId(Long recipeId);
}
