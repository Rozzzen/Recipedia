package com.recipedia.dto;

import lombok.Builder;

@Builder
public record UserResponse(Long id,
                           String firstname,
                           String lastname,
                           String email,
                           byte[] profilePicture) {

}
