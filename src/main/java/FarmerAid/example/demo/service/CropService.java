package FarmerAid.example.demo.service;

import FarmerAid.example.demo.dto.CropDTO;
import FarmerAid.example.demo.model.Crop;
import FarmerAid.example.demo.model.User;
import FarmerAid.example.demo.repository.CropRepository;
import FarmerAid.example.demo.repository.UserRepository;
import FarmerAid.example.demo.service.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CropService {

    @Autowired
    private CropRepository cropRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtService jwtService;

    public Crop addCrop(String token, CropDTO dto) {
        String email = jwtService.extractUsername(token);
        User farmer = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Farmer not found"));

        Crop crop = new Crop();
        crop.setCropName(dto.getCropName());
        crop.setQuantity(dto.getQuantity());
        crop.setPrice(dto.getPrice());
        crop.setFarmer(farmer);

        return cropRepository.save(crop);
    }

    public List<Crop> getMyCrops(String token) {
        String email = jwtService.extractUsername(token);
        User farmer = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Farmer not found"));

        return cropRepository.findByFarmer(farmer);
    }
    public void deleteCrop(String token, Long id) {
        String email = jwtService.extractUsername(token);
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));

        Crop crop = cropRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Crop not found"));

        if (!crop.getFarmer().getId().equals(user.getId())) {
            throw new RuntimeException("You can delete only your own crops!");
        }

        cropRepository.delete(crop);
    }

}
