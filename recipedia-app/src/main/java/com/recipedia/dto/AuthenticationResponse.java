package com.recipedia.dto;

import lombok.Builder;

@Builder
public record AuthenticationResponse
        (String jwtToken)
{}
