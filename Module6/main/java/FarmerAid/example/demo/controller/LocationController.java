package FarmerAid.example.demo.controller;

import FarmerAid.example.demo.dto.APIResponse;
import FarmerAid.example.demo.dto.LocationRequestDto;
import FarmerAid.example.demo.dto.LocationResponseDto;
import FarmerAid.example.demo.model.Location;
import FarmerAid.example.demo.model.User;
import FarmerAid.example.demo.service.LocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE, RequestMethod.PUT})
@RequestMapping("/api/location")
public class LocationController {

    LocationRequestDto locationRequestDto;

    @Autowired
    private LocationService  locationService;

    @GetMapping("/nearby")
    public ResponseEntity<APIResponse<List<LocationResponseDto>>> getNearbyFarmers(
            @RequestHeader("Authorization") String token) {

        try {
            token = token.replace("Bearer ", "");
            List<LocationResponseDto> nearby = locationService.getUsers(token);

            return ResponseEntity.ok(
                    new APIResponse.Builder<List<LocationResponseDto>>()
                            .data(nearby)
                            .message("Nearby farmers fetched successfully")
                            .build()
            );

        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(
                    new APIResponse.Builder<List<LocationResponseDto>>()
                            .message("Error: " + e.getMessage())
                            .data(Collections.emptyList())
                            .build()
            );

        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(
                    new APIResponse.Builder<List<LocationResponseDto>>()
                            .message("Unexpected error occurred: " + e.getMessage())
                            .build()
            );
        }
    }

    @PostMapping("/add")
    public ResponseEntity<APIResponse<LocationResponseDto>>
    addLocation(@RequestHeader("Authorization") String token , @RequestBody LocationRequestDto locationRequestDto){
        try{
            token = token.replace("Bearer ","");
            LocationResponseDto locationResponseDto = locationService.addUser(token,locationRequestDto);

            return ResponseEntity.ok(new APIResponse.Builder<LocationResponseDto>()
                    .data(locationResponseDto)
                    .message("Location added Successfully")
                    .token(token)
                    .build());
        }
    catch(Exception e){
            return ResponseEntity.status(500).body(
                    new APIResponse.Builder<LocationResponseDto>()
                            .message("Error")
                            .build()
            );
    }


    }


}
