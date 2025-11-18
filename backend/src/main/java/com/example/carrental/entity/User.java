package com.example.carrental.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "\"user\"")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(unique = true)
    private String email;

    private String firstName;
    private String lastName;

    private String passwordHash;
    // Driving license fields
    private String dlNumber;
    private String dlName;
    private String dlAddress;
    private String dlFrontImagePath;
    private String dlBackImagePath;

    public User() {}

    public User(String email, String firstName, String lastName, String passwordHash) {
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.passwordHash = passwordHash;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }

    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }

    public String getPasswordHash() { return passwordHash; }
    public void setPasswordHash(String passwordHash) { this.passwordHash = passwordHash; }

    public String getDlNumber() { return dlNumber; }
    public void setDlNumber(String dlNumber) { this.dlNumber = dlNumber; }

    public String getDlName() { return dlName; }
    public void setDlName(String dlName) { this.dlName = dlName; }

    public String getDlAddress() { return dlAddress; }
    public void setDlAddress(String dlAddress) { this.dlAddress = dlAddress; }

    public String getDlFrontImagePath() { return dlFrontImagePath; }
    public void setDlFrontImagePath(String dlFrontImagePath) { this.dlFrontImagePath = dlFrontImagePath; }

    public String getDlBackImagePath() { return dlBackImagePath; }
    public void setDlBackImagePath(String dlBackImagePath) { this.dlBackImagePath = dlBackImagePath; }
}
