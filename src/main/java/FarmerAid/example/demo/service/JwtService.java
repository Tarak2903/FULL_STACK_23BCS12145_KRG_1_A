package FarmerAid.example.demo.service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Value;
import java.security.Key;
import java.util.Date;

@Service
public class JwtService {
    @Value("${jwt.secret}")
    private String secretKey;
        private final long exptime = 1000*60*60;


        public String generateToken(String email){
            Key key= Keys.hmacShaKeyFor(secretKey.getBytes());
            return Jwts.builder()
                    .setSubject(email)
                    .signWith(key, SignatureAlgorithm.HS256)
                    .setIssuedAt(new Date())
                    .setExpiration(new Date(System.currentTimeMillis()+exptime))
                    .compact();
        }

        public String extractUsername(String token){
            Key key =Keys.hmacShaKeyFor(secretKey.getBytes());
            return Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token)
                    .getBody()
                    .getSubject();
        }
      public boolean isExpired(String token){
            Key key =Keys.hmacShaKeyFor(secretKey.getBytes());
            return Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token)
                    .getBody()
                    .getExpiration().before(new Date());
      }
      public boolean validateToken(String token,String email){

            return !isExpired(token)&&extractUsername(token).equals(email);
      }
}
