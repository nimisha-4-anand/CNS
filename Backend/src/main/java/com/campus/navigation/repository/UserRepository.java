package com.campus.navigation.repository; 
import org.springframework.data.jpa.repository.JpaRepository; 
import com.campus.navigation.entity.User; 
public interface UserRepository extends JpaRepository<User, Long> { 
	User findByEmail(String email); 
boolean existsByEmail(String email); 
                                   }