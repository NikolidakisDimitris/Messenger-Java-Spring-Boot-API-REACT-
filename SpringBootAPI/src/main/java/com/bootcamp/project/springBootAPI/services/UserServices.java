package com.bootcamp.project.springBootAPI.services;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.bootcamp.project.springBootAPI.exceptions.AppException;
import com.bootcamp.project.springBootAPI.model.Role;
import com.bootcamp.project.springBootAPI.model.User;
import com.bootcamp.project.springBootAPI.repository.RoleRepository;
import com.bootcamp.project.springBootAPI.repository.UserRepository;
import com.bootcamp.project.springBootAPI.request.UserRequest;
import com.bootcamp.project.springBootAPI.request.UserRoleRequest;
import com.bootcamp.project.springBootAPI.response.ApiResponse;
import com.bootcamp.project.springBootAPI.security.UserPrincipal;

@Service
public class UserServices {

	@Autowired
	UserRepository userRepository;

	@Autowired
	RoleRepository roleRepository;

	@Autowired
	PasswordEncoder passwordEncoder;

	public List<String> getUsers() {
		Collection<User> users = (Collection<User>) userRepository.findAll();

		return users.stream().map(u -> {
			return u.getUsername();
		}).collect(Collectors.toList());

	}

	public UserRequest getUserInfo(UserPrincipal currentUser) {

		UserRequest user = new UserRequest();
		user.setName(currentUser.getName());
		user.setUsername(currentUser.getUsername());
		user.setEmail(currentUser.getEmail());
		user.setRoles(currentUser.getAuthorities().stream().map(r -> {
			return r.getAuthority();
		}).collect(Collectors.toList()));

		return user;

	}

	public List<UserRequest> getUserList() {

		Collection<User> users = (Collection<User>) userRepository.findAll();

		List<UserRequest> userRequests = users.stream().map(u -> {
			UserRequest userRequest = new UserRequest();
			userRequest.setId(u.getId());
			userRequest.setName(u.getName());
			userRequest.setUsername(u.getUsername());
			userRequest.setEmail(u.getEmail());

			userRequest.setRoles(u.getRoles().stream().map(r -> {
				return r.getName().toString();
			}).collect(Collectors.toList()));

			return userRequest;
		}).collect(Collectors.toList());

		return userRequests;

	}

	public void addRole(UserRoleRequest roleRequest) {
		if (roleRequest != null && roleRequest.getRoleId() > 0 && roleRequest.getUserId() > 0) {
			User user = userRepository.findById(roleRequest.getUserId())
					.orElseThrow(() -> new AppException("User not Found !"));

			Role role = roleRepository.findById(roleRequest.getRoleId())
					.orElseThrow(() -> new AppException("Role not Found !"));
			user.getRoles().add(role);

			userRepository.save(user);
		} else {
			throw new AppException("Wrong body");
		}
	}

	public void deleteRole(UserRoleRequest roleRequest) {
		if (roleRequest != null && roleRequest.getRoleId() > 0 && roleRequest.getUserId() > 0) {
			User user = userRepository.findById(roleRequest.getUserId())
					.orElseThrow(() -> new AppException("User not Found !"));

			Role role = roleRepository.findById(roleRequest.getRoleId())
					.orElseThrow(() -> new AppException("Role not Found !"));
			user.getRoles().remove(role);

			userRepository.save(user);
		} else {
			throw new AppException("Wrong body");
		}
	}

	public ResponseEntity<?> updatePassword(UserPrincipal currentUser, UserRequest passwordRequest) {

		if (passwordRequest.getPassword().length() > 5 && passwordRequest.getPassword().length() < 101
				&& passwordRequest.getPassword() != null) {
			User user = userRepository.findByUsernameIgnoreCase(currentUser.getUsername()).get();

			user.setPassword(passwordEncoder.encode(passwordRequest.getPassword()));

			userRepository.save(user);
			return ResponseEntity.ok(new ApiResponse(true, "Password updated succesfully"));
		} else {
			return new ResponseEntity(new ApiResponse(false, "The given username doesn't exist"),
					HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> updateName(UserPrincipal currentUser, UserRequest nameRequest) {
		
		if (nameRequest.getName().length() < 41 && nameRequest.getName().length() > 3 && nameRequest.getName() != null) {
			User user = userRepository.findByUsernameIgnoreCase(currentUser.getUsername()).get();
			user.setName(nameRequest.getName());
			userRepository.save(user);
			return ResponseEntity.ok(new ApiResponse(true, "Name updated succesfully"));
		} else {
			return new ResponseEntity(new ApiResponse(false, "The given username doesn't exist"),
					HttpStatus.BAD_REQUEST);
		}
	}

}
