package FarmerAid.example.demo.repository;

import FarmerAid.example.demo.model.Location;
import FarmerAid.example.demo.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LocationRepository extends JpaRepository<Location,Long> {
    Optional<Location> findByUser(User user);
}
