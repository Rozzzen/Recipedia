package com.recipedia.repo;

import com.recipedia.domain.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {

    @Query("""
             SELECT review
             FROM Review  review
             WHERE review.recipe.id = :recipeId
            """)
    Page<Review> findAllByRecipeId(Long recipeId, Pageable pageable);
}
