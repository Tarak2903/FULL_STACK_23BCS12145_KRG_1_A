package FarmerAid.example.demo.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Crop {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String cropName;
    private Double quantity;
    private Double price;

    @ManyToOne
    @JoinColumn(name = "farmer_id")
    private User farmer;
}
