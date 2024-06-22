package com.recipedia.domain;

import jakarta.persistence.Embeddable;
import jakarta.validation.constraints.NotEmpty;

@Embeddable
public record Ingredient(
        @NotEmpty(message = "105")
        String name,
        @NotEmpty(message = "105")
        String quantity) {
}
