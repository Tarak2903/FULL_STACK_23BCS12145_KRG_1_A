package FarmerAid.example.demo.service;

import FarmerAid.example.demo.model.User;
import FarmerAid.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private PasswordEncoder passwordEncoder;


    public String login(String email, String password){
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isEmpty()) {
            throw new RuntimeException("User not Found");
        }
        if(!passwordEncoder.matches(password, user.get().getPassword())){
            throw new RuntimeException("Wrong password");
        }

        return jwtService.generateToken(email);
    }

    public void signup(String email, String password) {
        Optional<User> existingUser = userRepository.findByEmail(email);

        if (existingUser.isPresent()) {
            throw new RuntimeException("User already exists");
        }

        User newUser = new User();
        newUser.setEmail(email);
        newUser.setPassword(passwordEncoder.encode(password));

        userRepository.save(newUser);
    }

}
