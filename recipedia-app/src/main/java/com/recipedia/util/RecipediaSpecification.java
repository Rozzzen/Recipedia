package com.recipedia.util;

import com.recipedia.domain.Recipe;
import com.recipedia.domain.RecipeTag;
import jakarta.persistence.criteria.Join;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;

public class RecipediaSpecification {

    public static Specification<Recipe> withAuthorId(Long authorId) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("createdBy"), authorId);
    }

    public static Specification<Recipe> containsTag(List<RecipeTag> tags) {
        return (root, query, criteriaBuilder) -> {
            if (tags == null || tags.isEmpty())
                return criteriaBuilder.conjunction();

            Join<Recipe, RecipeTag> joinedTags = root.join("tags");
            return joinedTags.in(tags);
        };
    }
}
