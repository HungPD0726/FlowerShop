package com.flowerstore.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AddressResponse {
    private Long id;
    private String recipientName;
    private String phone;
    private String province;
    private String district;
    private String ward;
    private String detailAddress;
    private Boolean isDefault;
}
