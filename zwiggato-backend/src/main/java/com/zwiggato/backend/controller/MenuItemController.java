package com.zwiggato.backend.controller;

import com.zwiggato.backend.entity.MenuItem;
import com.zwiggato.backend.repository.MenuItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/menu-items")
@CrossOrigin(origins = "http://localhost:5173")
public class MenuItemController {

    @Autowired
    private MenuItemRepository menuItemRepository;

    @GetMapping
    public List<MenuItem> getMenuItems(
            @RequestParam(value = "restaurantId", required = false) Long restaurantId,
            @RequestParam(value = "search", required = false) String search,
            @RequestParam(value = "category", required = false) String category
    ) {
        if (search != null && search.isBlank()) {
            search = null;
        }
        if (category != null && category.isBlank()) {
            category = null;
        }
        return menuItemRepository.search(restaurantId, search, category);
    }
}
