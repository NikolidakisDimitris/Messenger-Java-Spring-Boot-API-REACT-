package com.bootcamp.project.springBootAPI.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bootcamp.project.springBootAPI.request.UserRequest;
import com.bootcamp.project.springBootAPI.request.UserRoleRequest;
import com.bootcamp.project.springBootAPI.security.CurrentUser;
import com.bootcamp.project.springBootAPI.security.UserPrincipal;
import com.bootcamp.project.springBootAPI.services.UserServices;

@RestController
@RequestMapping("/api/users")
public class UserController {

	@Autowired
	UserServices userServices;

	@GetMapping(produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	@PreAuthorize("hasRole('USER')")
	public List<String> getUsers() {

		return userServices.getUsers();
	}

	@GetMapping(path = "/about/me", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	@PreAuthorize("hasRole('USER')")
	public UserRequest getUserInfo(@CurrentUser UserPrincipal currentUser) {

		return userServices.getUserInfo(currentUser);
	}

	@GetMapping(path = "/rolelist", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	@PreAuthorize("hasRole('USER')")
	public List<UserRequest> getUserList(@CurrentUser UserPrincipal currentUser) {

		return userServices.getUserList();

	}

	@PostMapping(path = "/addrole", consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
	@PreAuthorize("hasRole('ADMIN') or hasRole('GOD')")
	public void addRole(@CurrentUser UserPrincipal currentUser, @RequestBody UserRoleRequest roleRequest) {
		userServices.addRole(roleRequest);
	}

	@PostMapping(path = "/deleterole", consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
	@PreAuthorize("hasRole('ADMIN') or hasRole('GOD')")
	public void deleteRole(@CurrentUser UserPrincipal currentUser, @RequestBody UserRoleRequest roleRequest) {
		userServices.deleteRole(roleRequest);
	}

	@PostMapping(path = "/updatepassword", consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
	@PreAuthorize("hasRole('USER')")
	public ResponseEntity<?> updatePassword(@CurrentUser UserPrincipal currentUser,
			@RequestBody UserRequest passwordRequest) {
		return userServices.updatePassword(currentUser, passwordRequest);
	}

	@PostMapping(path = "/updatename", consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
	@PreAuthorize("hasRole('USER')")
	public ResponseEntity<?> updateName(@CurrentUser UserPrincipal currentUser, @RequestBody UserRequest nameRequest) {
		return userServices.updateName(currentUser, nameRequest);
	}

}
