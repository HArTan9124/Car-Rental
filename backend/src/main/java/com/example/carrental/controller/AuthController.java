package com.example.carrental.controller;

import java.security.SecureRandom;
import java.util.Base64;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.carrental.entity.SessionToken;
import com.example.carrental.entity.User;
import com.example.carrental.repository.SessionTokenRepository;
import com.example.carrental.repository.UserRepository;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SessionTokenRepository tokenRepository;

    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public static class SignupRequest {
        public String email;
        public String firstName;
        public String lastName;
        public String password;
    }

    public static class LoginRequest {
        public String email;
        public String password;
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignupRequest req) {
        if (userRepository.findByEmail(req.email).isPresent()) {
            return ResponseEntity.badRequest().body(Map.of("error","User already exists"));
        }
        String hash = encoder.encode(req.password);
        User u = new User(req.email, req.firstName, req.lastName, hash);
        userRepository.save(u);
        return ResponseEntity.ok(u);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest req) {
        Optional<User> opt = userRepository.findByEmail(req.email);
        if (opt.isEmpty()) return ResponseEntity.status(401).body(Map.of("error","Invalid credentials"));
        User u = opt.get();
        if (!encoder.matches(req.password, u.getPasswordHash())) return ResponseEntity.status(401).body(Map.of("error","Invalid credentials"));

        // generate token
        String t = generateToken();
        SessionToken token = new SessionToken(u.getId(), t);
        tokenRepository.save(token);
        return ResponseEntity.ok(Map.of("token", t));
    }

    private String generateToken() {
        byte[] b = new byte[32];
        new SecureRandom().nextBytes(b);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(b);
    }
}
