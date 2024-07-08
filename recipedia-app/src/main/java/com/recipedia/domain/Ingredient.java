package com.recipedia.domain;

import jakarta.persistence.Embeddable;
import jakarta.validation.constraints.NotEmpty;

@Embeddable
public record Ingredient(

        @NotEmpty(message = "Each ingredient must have a name")
        String name,

        @NotEmpty(message = "Each ingredient must have a quantity")
        String quantity) {
}
