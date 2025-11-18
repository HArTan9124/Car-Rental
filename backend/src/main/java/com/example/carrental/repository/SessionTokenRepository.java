package com.example.carrental.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.carrental.entity.SessionToken;

public interface SessionTokenRepository extends JpaRepository<SessionToken, Long> {
    Optional<SessionToken> findByToken(String token);
}
