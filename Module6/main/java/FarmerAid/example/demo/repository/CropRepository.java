package FarmerAid.example.demo.repository;

import FarmerAid.example.demo.model.Crop;
import FarmerAid.example.demo.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CropRepository extends JpaRepository<Crop, Long> {
    List<Crop> findByFarmer(User farmer);
}
