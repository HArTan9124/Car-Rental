package com.example.carrental;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.example.carrental.entity.Car;
import com.example.carrental.entity.User;
import com.example.carrental.repository.CarRepository;
import com.example.carrental.repository.UserRepository;

@Component
public class DataLoader implements CommandLineRunner {

    private final CarRepository carRepository;
    private final UserRepository userRepository;

    public DataLoader(CarRepository carRepository, UserRepository userRepository) {
        this.carRepository = carRepository;
        this.userRepository = userRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        if (carRepository.count() == 0) {
            carRepository.save(new Car(
                "Maruti Swift",
                "/maruti-swift-black-hatchback-night.jpg",
                1800,
                "manual",
                5,
                "petrol",
                "City C",
                "Swift",
                "N/A",
                "N/A",
                "N/A",
                "N/A",
                "Sedan",
                "N/A",
                "N/A",
                "N/A",
                "available",
                4.2,
                25,
                "City C"
            ));

            carRepository.save(new Car(
                "Hyundai Creta",
                "/hyundai-creta-white-suv.jpg",
                3000,
                "automatic",
                5,
                "petrol",
                "City A",
                "Hyundai",
                "N/A",
                "N/A",
                "N/A",
                "N/A",
                "SUV",
                "N/A",
                "N/A",
                "N/A",
                "available",
                4.5,
                48,
                "City A"
            ));
        }

        if (userRepository.count() == 0) {
            // create a default user with password 'password' hashed using bcrypt
            org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder enc = new org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder();
            String hash = enc.encode("password");
            userRepository.save(new User("demo@example.com", "Demo", "User", hash));
        }
    }
}
