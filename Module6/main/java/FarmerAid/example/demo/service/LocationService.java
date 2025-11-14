package FarmerAid.example.demo.service;

import FarmerAid.example.demo.dto.LocationRequestDto;
import FarmerAid.example.demo.dto.LocationResponseDto;
import FarmerAid.example.demo.model.Location;
import FarmerAid.example.demo.model.User;
import FarmerAid.example.demo.repository.LocationRepository;
import FarmerAid.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class LocationService {

    @Autowired
    private LocationRepository locationRepository;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private UserRepository userRepository;

    // ✅ Add or update user location
    public LocationResponseDto addUser(String token, LocationRequestDto location) {
        String email = jwtService.extractUsername(token);
        User farmer = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Farmer not found"));

        Optional<Location> existingLocation = locationRepository.findByUser(farmer);
        Location location1 = existingLocation.orElseGet(Location::new);

        location1.setUser(farmer);
        location1.setLatitude(location.getLatitude());
        location1.setLongitude(location.getLongitude());

        locationRepository.save(location1);

        LocationResponseDto locationResponseDto = new LocationResponseDto();
        locationResponseDto.setLatitude(location1.getLatitude());
        locationResponseDto.setLongitude(location1.getLongitude());
        locationResponseDto.setUser_id(farmer.getId());
        return locationResponseDto;
    }

    public List<LocationResponseDto> getUsers(String token) {
        String email = jwtService.extractUsername(token);
        User currentFarmer = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Farmer not found"));

        Location currentLocation = locationRepository.findByUser(currentFarmer)
                .orElseThrow(() -> new RuntimeException("Current farmer location not found"));

        double currentLat = currentLocation.getLatitude();
        double currentLon = currentLocation.getLongitude();

        List<Location> allLocations = locationRepository.findAll();
        List<LocationResponseDto> nearbyFarmers = new ArrayList<>();

        for (Location loc : allLocations) {
            if (loc.getUser().getId().equals(currentFarmer.getId())) continue;

            double distance = calculateDistance(currentLat, currentLon, loc.getLatitude(), loc.getLongitude());
            if (distance <= 5.0) {
                LocationResponseDto dto = new LocationResponseDto();
                dto.setUser_id(loc.getUser().getId());
                dto.setLatitude(loc.getLatitude());
                dto.setLongitude(loc.getLongitude());
                nearbyFarmers.add(dto);
            }
        }

        return nearbyFarmers;
    }

    private double calculateDistance(double lat1, double lon1, double lat2, double lon2) {
        final int EARTH_RADIUS = 6371; // in kilometers
        double dLat = Math.toRadians(lat2 - lat1);
        double dLon = Math.toRadians(lon2 - lon1);

        double a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
                + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2))
                * Math.sin(dLon / 2) * Math.sin(dLon / 2);

        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return EARTH_RADIUS * c;
    }
}
