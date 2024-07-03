package com.recipedia.domain;

import jakarta.persistence.Embeddable;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class CookingStep {

    @NotEmpty(message = "104")
    private String text;

    private String image;

    @NotNull(message = "104")
    private Integer number;
}