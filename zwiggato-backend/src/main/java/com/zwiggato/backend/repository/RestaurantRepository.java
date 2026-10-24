package com.zwiggato.backend.repository;

import com.zwiggato.backend.entity.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {
    List<Restaurant> findByNameContainingIgnoreCaseOrCategoryContainingIgnoreCase(String name, String category);
}
