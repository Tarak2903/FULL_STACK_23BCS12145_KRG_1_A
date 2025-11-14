package FarmerAid.example.demo.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class Location {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long Id;

    private double latitude;
    private double longitude;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private  User user;
}
