package com.campus.navigation.service; 
import org.springframework.stereotype.Service; 
import com.campus.navigation.entity.User; 
import com.campus.navigation.repository.UserRepository; 
@Service public class UserService {
	private final UserRepository userRepository; 
	public UserService(UserRepository userRepository) { 
		this.userRepository = userRepository; 
		} 
	public User registerUser(User user) { 
		if (userRepository.existsByEmail(user.getEmail())) { 
			return null; 
			} 
		return userRepository.save(user);
		}
	public User loginUser(String email, String password) { 
		User user = userRepository.findByEmail(email); 
		if (user != null && user.getPassword().equals(password)) { 
			return user; 
			} 
		return null; 
		} 
	}