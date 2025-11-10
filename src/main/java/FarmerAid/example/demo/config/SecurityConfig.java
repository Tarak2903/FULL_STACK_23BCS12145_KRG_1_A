package FarmerAid.example.demo.config;
import FarmerAid.example.demo.filter.JwtAuthenticationFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.util.List;

@Configuration
public class SecurityConfig {


    @Autowired
    private JwtAuthenticationFilter jwtAuthFilter;
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
       http
               .csrf(AbstractHttpConfigurer::disable)
               .cors(cors -> cors.configurationSource(request -> {
                   var config = new org.springframework.web.cors.CorsConfiguration();
                   config.setAllowedOrigins(List.of("http://localhost:3000"));
                   config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
                   config.setAllowedHeaders(List.of("Authorization", "Content-Type"));
                   config.setAllowCredentials(true);
                   return config;
               }))
               .sessionManagement(x->x.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
               .authorizeHttpRequests(
                       x->x
                               .requestMatchers("/api/auth/**").permitAll()
                               .anyRequest().authenticated()
               );
       http.addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

       return http.build();
    }
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

}
