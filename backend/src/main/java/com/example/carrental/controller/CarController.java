package com.example.carrental.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.carrental.entity.Car;
import com.example.carrental.repository.CarRepository;

@RestController
@RequestMapping("/api/cars")
public class CarController {

    @Autowired
    private CarRepository carRepository;

    @GetMapping
    public List<Car> getAllCars() {
        return carRepository.findAll();
    }

    @GetMapping("/{id}")
    public Car getCarById(@PathVariable Long id) {
        return carRepository.findById(id).orElse(null);
    }

    @PostMapping
    public Car addCar(@RequestBody Car car) {
        return carRepository.save(car);
    }

    @PutMapping("/{id}")
    public Car updateCar(@PathVariable Long id, @RequestBody Car carDetails) {
        Car car = carRepository.findById(id).orElse(null);
        if (car != null) {
            System.out.println("[DEBUG] updateCar called for id=" + id + " with payload: " + carDetails);
            car.setName(carDetails.getName());
            car.setImage(carDetails.getImage());
            car.setPrice(carDetails.getPrice());
            car.setTransmission(carDetails.getTransmission());
            car.setSeatingCapacity(carDetails.getSeatingCapacity());
            car.setFuelType(carDetails.getFuelType());
            car.setLocation(carDetails.getLocation());
            // New fields
            car.setBrand(carDetails.getBrand());
            car.setEngineCapacity(carDetails.getEngineCapacity());
            car.setAirbags(carDetails.getAirbags());
            car.setMileage(carDetails.getMileage());
            car.setBluetooth(carDetails.getBluetooth());
            car.setVehicleType(carDetails.getVehicleType());
            car.setBootSpace(carDetails.getBootSpace());
            car.setGpsNavigation(carDetails.getGpsNavigation());
            car.setSunroof(carDetails.getSunroof());
            car.setStatus(carDetails.getStatus());
            car.setRating(carDetails.getRating());
            car.setReviews(carDetails.getReviews());
            car.setPickupLocation(carDetails.getPickupLocation());
            Car saved = carRepository.save(car);
            System.out.println("[DEBUG] saved car: " + saved);
            return saved;
        }
        return null;
    }

    @DeleteMapping("/{id}")
    public void deleteCar(@PathVariable Long id) {
        carRepository.deleteById(id);
    }
}
