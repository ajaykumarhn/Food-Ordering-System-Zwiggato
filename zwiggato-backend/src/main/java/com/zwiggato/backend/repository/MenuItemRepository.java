package com.zwiggato.backend.repository;

import com.zwiggato.backend.entity.MenuItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MenuItemRepository extends JpaRepository<MenuItem, Long> {
    @Query("select m from MenuItem m where " +
            "(:restaurantId is null or m.restaurant.id = :restaurantId) " +
            "and (:search is null or lower(m.name) like lower(concat('%', :search, '%')) " +
            "or lower(m.description) like lower(concat('%', :search, '%'))) " +
            "and (:category is null or lower(m.category) like lower(concat('%', :category, '%')))" )
    List<MenuItem> search(
            @Param("restaurantId") Long restaurantId,
            @Param("search") String search,
            @Param("category") String category
    );
}
