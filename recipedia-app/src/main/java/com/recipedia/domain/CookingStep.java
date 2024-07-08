package com.recipedia.domain;

import jakarta.persistence.Embeddable;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

@Embeddable
public record CookingStep(

        @NotEmpty(message = "Each step should contain text")
        String text,

        @NotNull
        Integer number
) {
}