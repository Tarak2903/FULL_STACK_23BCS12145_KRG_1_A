package FarmerAid.example.demo.dto;

import lombok.Data;

@Data
public class CropDTO {
    private String cropName;
    private Double quantity;
    private Double price;
}
