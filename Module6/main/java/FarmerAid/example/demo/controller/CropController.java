package FarmerAid.example.demo.controller;

import FarmerAid.example.demo.dto.APIResponse;
import FarmerAid.example.demo.dto.CropDTO;
import FarmerAid.example.demo.model.Crop;
import FarmerAid.example.demo.service.CropService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/crops")
@CrossOrigin(origins = "http://localhost:3000", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE, RequestMethod.PUT})

public class CropController {

    @Autowired
    private CropService cropService;

    @PostMapping("/add")
    public APIResponse<Crop> addCrop(@RequestHeader("Authorization") String token, @RequestBody CropDTO dto) {
        token = token.replace("Bearer ", ""); // remove Bearer prefix
        Crop crop = cropService.addCrop(token, dto);
        return new APIResponse.Builder<Crop>()
                .data(crop)
                .message("Crop added successfully!")
                .build();
    }

    @GetMapping("/mine")
    public APIResponse<List<Crop>> getMyCrops(@RequestHeader("Authorization") String token) {
        token = token.replace("Bearer ", "");
        List<Crop> crops = cropService.getMyCrops(token);
        return new APIResponse.Builder<List<Crop>>()
                .data(crops)
                .message("Fetched all your crops successfully")
                .build();
    }
    @DeleteMapping("/delete/{id}")
    public APIResponse<String> deleteCrop(@RequestHeader("Authorization") String token,
                                          @PathVariable Long id) {
        token = token.replace("Bearer ", "");
        cropService.deleteCrop(token, id);
        return new APIResponse.Builder<String>()
                .message("Crop deleted successfully!")
                .build();
    }

}
