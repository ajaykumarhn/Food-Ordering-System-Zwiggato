package com.zwiggato.backend;

import com.zwiggato.backend.entity.MenuItem;
import com.zwiggato.backend.entity.Restaurant;
import com.zwiggato.backend.repository.MenuItemRepository;
import com.zwiggato.backend.repository.RestaurantRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class DataInitializer {

    @Bean
    public CommandLineRunner initializeDatabase(RestaurantRepository restaurantRepository,
            MenuItemRepository menuItemRepository) {
        return args -> {
            if (restaurantRepository.count() > 0) {
                return;
            }

            Restaurant burgerKing = new Restaurant();
            burgerKing.setName("Burger King");
            burgerKing.setCategory("American, Fast Food");
            burgerKing.setRating("4.5");
            burgerKing.setDeliveryTime("25-30 min");
            burgerKing.setImageUrl("https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=800&q=80");

            Restaurant pizzaHut = new Restaurant();
            pizzaHut.setName("Pizza Hut");
            pizzaHut.setCategory("Italian, Pizza");
            pizzaHut.setRating("4.2");
            pizzaHut.setDeliveryTime("35-40 min");
            pizzaHut.setImageUrl("https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80");

            Restaurant sushiZen = new Restaurant();
            sushiZen.setName("Sushi Zen");
            sushiZen.setCategory("Japanese, Sushi");
            sushiZen.setRating("4.8");
            sushiZen.setDeliveryTime("40-45 min");
            sushiZen.setImageUrl("https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&q=80");

            Restaurant tacoBell = new Restaurant();
            tacoBell.setName("Taco Bell");
            tacoBell.setCategory("Mexican, Fast Food");
            tacoBell.setRating("4.0");
            tacoBell.setDeliveryTime("15-20 min");
            tacoBell.setImageUrl("https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&q=80");

            restaurantRepository.saveAll(List.of(burgerKing, pizzaHut, sushiZen, tacoBell));

            menuItemRepository.saveAll(List.of(
                    createMenuItem("Classic Cheeseburger", "Juicy beef patty with melted cheese, lettuce, and tomato",
                            160.0, "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80", "Burgers",
                            burgerKing),
                    createMenuItem("Loaded Fries", "Crispy fries topped with cheese and bacon bits", 100.0,
                            "https://images.unsplash.com/photo-1534080564583-6be75777b70a?w=500&q=80", "Sides",
                            burgerKing),
                    createMenuItem("Margherita Pizza", "Fresh tomatoes, mozzarella cheese, and basil", 170.0,
                            "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500&q=80", "Pizza",
                            pizzaHut),
                    createMenuItem("Pepperoni Feast", "Classic pepperoni with extra cheese", 200.0,
                            "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500&q=80", "Pizza",
                            pizzaHut),
                    createMenuItem("Spicy Chicken Wings", "Crispy wings tossed in buffalo sauce", 180.0,
                            "https://images.unsplash.com/photo-1569691899455-88464f6d3ab1?w=500&q=80", "Sides",
                            tacoBell),
                    createMenuItem("Quesadilla Supreme", "Grilled tortilla stuffed with chicken and cheese", 150.0,
                            "https://images.unsplash.com/photo-1615870216519-2f9fa575fa5c?w=500&q=80", "Mexican",
                            tacoBell),
                    createMenuItem("Sushi Combo Box", "Assorted nigiri and rolls", 200.0,
                            "https://images.unsplash.com/photo-1553621042-f6e147245754?w=500&q=80", "Sushi", sushiZen),
                    createMenuItem("Salmon Roll", "Fresh salmon with rice and seaweed", 170.0,
                            "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500&q=80", "Sushi",
                            sushiZen),
                    createMenuItem("Caesar Salad", "Crisp romaine, parmesan, croutons, and Caesar dressing", 130.0,
                            "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=500&q=80", "Healthy",
                            burgerKing),
                    createMenuItem("Chocolate Lava Cake", "Warm chocolate cake with a gooey center", 70.0,
                            "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=500&q=80", "Dessert",
                            pizzaHut)));
        };
    }

    private MenuItem createMenuItem(String name, String description, double price, String imageUrl, String category,
            Restaurant restaurant) {
        MenuItem menuItem = new MenuItem();
        menuItem.setName(name);
        menuItem.setDescription(description);
        menuItem.setPrice(price);
        menuItem.setImageUrl(imageUrl);
        menuItem.setCategory(category);
        menuItem.setRestaurant(restaurant);
        return menuItem;
    }
}
