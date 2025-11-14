package FarmerAid.example.demo.controller;

import FarmerAid.example.demo.dto.APIResponse;
import FarmerAid.example.demo.dto.LoginReqDTO;
import FarmerAid.example.demo.dto.LoginResponse;
import FarmerAid.example.demo.model.User;
import FarmerAid.example.demo.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<APIResponse<LoginResponse>> login(@RequestBody LoginReqDTO request) {


        try{
            String token=authService.login(request.getEmail(), request.getPassword());
            LoginResponse login = new LoginResponse(request.getEmail());
            APIResponse<LoginResponse> response= new APIResponse.Builder<LoginResponse>()
                    .data(login)
                    .token(token)
                    .message("User Successfully authenticated")
                    .build();
            return ResponseEntity.ok(response);
        }
        catch(Exception e){
                APIResponse<LoginResponse>response=new APIResponse.Builder<LoginResponse>()
                        .message(e.getMessage())
                        .build();
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }

    }

    @PostMapping("/signup")
    public String signup(@RequestBody User user) {
        authService.signup(user.getEmail(), user.getPassword());
        return "User registered successfully";
    }
}
