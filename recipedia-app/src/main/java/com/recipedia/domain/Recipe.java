package com.recipedia.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "recipe")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Recipe {

    @Id
    @GeneratedValue
    private Long id;

    private Duration preparationTime;
    private Duration cookingTime;

    private String title;
    private String description;

    @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Review> reviews;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "ingredient",
            joinColumns = @JoinColumn(name = "recipe_id", nullable = false))
    private List<Ingredient> ingredientList;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "cooking_step",
            joinColumns = @JoinColumn(name = "recipe_id", nullable = false))
    private List<CookingStep> cookingSteps;

    @ElementCollection(targetClass = RecipeTag.class)
    @CollectionTable(name = "recipe_tag", joinColumns = @JoinColumn(name = "recipe_id"))
    @Enumerated(EnumType.STRING)
    @Column(name = "name")
    private List<RecipeTag> tags;

    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(insertable = false)
    private LocalDateTime lastModifiedDate;

    @CreatedBy
    @Column(nullable = false, updatable = false)
    private Long createdBy;

    @LastModifiedBy
    @Column(insertable = false)
    private Long lastModifiedBy;

    @Transient
    public double getRate() {
        if (reviews == null || reviews.isEmpty()) {
            return 0D;
        }

        var rate = this.reviews.stream()
                .mapToDouble(Review::getRate)
                .average()
                .orElse(0.0);

        return Math.round(rate * 10.0) / 10.0;
    }
}
