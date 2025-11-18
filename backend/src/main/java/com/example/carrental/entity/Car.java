package com.example.carrental.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;

@Entity
public class Car {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;
    @Lob
    private String image;
    private Integer price;
    private String transmission;
    private Integer seatingCapacity;
    private String fuelType;
    private String location;
    // New fields
    private String brand;
    private String engineCapacity;
    private String airbags;
    private String mileage;
    private String bluetooth;
    private String vehicleType;
    private String bootSpace;
    private String gpsNavigation;
    private String sunroof;
    private String status;
    private Double rating;
    private Integer reviews;
    private String pickupLocation;

    public Car() {
    }

    public Car(String name, String image, Integer price, String transmission, Integer seatingCapacity, String fuelType, String location) {
        this.name = name;
        this.image = image;
        this.price = price;
        this.transmission = transmission;
        this.seatingCapacity = seatingCapacity;
        this.fuelType = fuelType;
        this.location = location;
    }

    public Car(String name, String image, Integer price, String transmission, Integer seatingCapacity, String fuelType, String location,
               String brand, String engineCapacity, String airbags, String mileage, String bluetooth, String vehicleType,
               String bootSpace, String gpsNavigation, String sunroof, String status, Double rating, Integer reviews, String pickupLocation) {
        this.name = name;
        this.image = image;
        this.price = price;
        this.transmission = transmission;
        this.seatingCapacity = seatingCapacity;
        this.fuelType = fuelType;
        this.location = location;
        this.brand = brand;
        this.engineCapacity = engineCapacity;
        this.airbags = airbags;
        this.mileage = mileage;
        this.bluetooth = bluetooth;
        this.vehicleType = vehicleType;
        this.bootSpace = bootSpace;
        this.gpsNavigation = gpsNavigation;
        this.sunroof = sunroof;
        this.status = status;
        this.rating = rating;
        this.reviews = reviews;
        this.pickupLocation = pickupLocation;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public String getTransmission() {
        return transmission;
    }

    public void setTransmission(String transmission) {
        this.transmission = transmission;
    }

    public Integer getSeatingCapacity() {
        return seatingCapacity;
    }

    public void setSeatingCapacity(Integer seatingCapacity) {
        this.seatingCapacity = seatingCapacity;
    }

    public String getFuelType() {
        return fuelType;
    }

    public void setFuelType(String fuelType) {
        this.fuelType = fuelType;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getEngineCapacity() {
        return engineCapacity;
    }

    public void setEngineCapacity(String engineCapacity) {
        this.engineCapacity = engineCapacity;
    }

    public String getAirbags() {
        return airbags;
    }

    public void setAirbags(String airbags) {
        this.airbags = airbags;
    }

    public String getMileage() {
        return mileage;
    }

    public void setMileage(String mileage) {
        this.mileage = mileage;
    }

    public String getBluetooth() {
        return bluetooth;
    }

    public void setBluetooth(String bluetooth) {
        this.bluetooth = bluetooth;
    }

    public String getVehicleType() {
        return vehicleType;
    }

    public void setVehicleType(String vehicleType) {
        this.vehicleType = vehicleType;
    }

    public String getBootSpace() {
        return bootSpace;
    }

    public void setBootSpace(String bootSpace) {
        this.bootSpace = bootSpace;
    }

    public String getGpsNavigation() {
        return gpsNavigation;
    }

    public void setGpsNavigation(String gpsNavigation) {
        this.gpsNavigation = gpsNavigation;
    }

    public String getSunroof() {
        return sunroof;
    }

    public void setSunroof(String sunroof) {
        this.sunroof = sunroof;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Double getRating() {
        return rating;
    }

    public void setRating(Double rating) {
        this.rating = rating;
    }

    public Integer getReviews() {
        return reviews;
    }

    public void setReviews(Integer reviews) {
        this.reviews = reviews;
    }

    public String getPickupLocation() {
        return pickupLocation;
    }

    public void setPickupLocation(String pickupLocation) {
        this.pickupLocation = pickupLocation;
    }
}
