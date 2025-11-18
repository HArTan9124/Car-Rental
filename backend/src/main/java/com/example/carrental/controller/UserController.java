package com.example.carrental.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.carrental.entity.User;
import com.example.carrental.repository.UserRepository;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    // Upload DL front/back and update user info
    @PostMapping(path = "{id}/dl", consumes = {"multipart/form-data"})
    public ResponseEntity<?> uploadDl(@PathVariable Long id,
            @RequestParam(required = false) String dlNumber,
            @RequestParam(required = false) String dlName,
            @RequestParam(required = false) String dlAddress,
            @RequestParam(required = false) MultipartFile front,
            @RequestParam(required = false) MultipartFile back) {
        Optional<User> opt = userRepository.findById(id);
        User u;
        if (opt.isEmpty()) {
            System.out.println("[UserController] uploadDl: user not found id=" + id);
            // Dev convenience: if placeholder id 1 is used and missing, create a demo user
            if (id == 1L) {
                System.out.println("[UserController] creating demo user id=1 for dev");
                // if demo user already exists, re-use it to avoid unique constraint violation
                var existing = userRepository.findByEmail("demo@example.com");
                if (existing.isPresent()) {
                    u = existing.get();
                } else {
                    org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder enc = new org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder();
                    String hash = enc.encode("password");
                    User created = new User("demo@example.com", "Demo", "User", hash);
                    User saved = userRepository.save(created);
                    u = saved;
                }
            } else {
                return ResponseEntity.status(404).body(Map.of("error","User not found"));
            }
        } else {
            u = opt.get();
        }
        try {
            System.out.println("[UserController] uploadDl: received dlNumber=" + dlNumber + " dlName=" + dlName + " dlAddress=" + dlAddress + " frontPresent=" + (front!=null) + " backPresent=" + (back!=null));

            Path uploadDir = Paths.get("./backend-uploads");
            if (!Files.exists(uploadDir)) Files.createDirectories(uploadDir);

            boolean changed = false;
            if (front != null && !front.isEmpty()) {
                String fn = System.currentTimeMillis() + "-front-" + StringUtils.cleanPath(front.getOriginalFilename());
                Path p = uploadDir.resolve(fn);
                Files.copy(front.getInputStream(), p);
                u.setDlFrontImagePath(p.toString());
                changed = true;
                System.out.println("[UserController] uploadDl: saved front to " + p.toString());
            }
            if (back != null && !back.isEmpty()) {
                String fn = System.currentTimeMillis() + "-back-" + StringUtils.cleanPath(back.getOriginalFilename());
                Path p = uploadDir.resolve(fn);
                Files.copy(back.getInputStream(), p);
                u.setDlBackImagePath(p.toString());
                changed = true;
                System.out.println("[UserController] uploadDl: saved back to " + p.toString());
            }

            if (dlNumber != null && !dlNumber.isBlank()) { u.setDlNumber(dlNumber); changed = true; }
            if (dlName != null && !dlName.isBlank()) { u.setDlName(dlName); changed = true; }
            if (dlAddress != null && !dlAddress.isBlank()) { u.setDlAddress(dlAddress); changed = true; }

            if (!changed) {
                System.out.println("[UserController] uploadDl: no fields or files provided in request");
                return ResponseEntity.badRequest().body(Map.of("error","No DL fields or files provided"));
            }

            userRepository.save(u);
            System.out.println("[UserController] uploadDl: user updated id=" + u.getId());
            return ResponseEntity.ok(u);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(Map.of("error","Failed to save files"));
        }
    }

    // simple GET to inspect user during dev
    @GetMapping("{id}")
    public ResponseEntity<?> getUser(@PathVariable Long id) {
        Optional<User> opt = userRepository.findById(id);
        if (opt.isEmpty()) return ResponseEntity.status(404).body(Map.of("error","User not found"));
        return ResponseEntity.ok(opt.get());
    }
}
