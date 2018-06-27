package com.bootcamp.project.springBootAPI.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bootcamp.project.springBootAPI.request.LoginRequest;
import com.bootcamp.project.springBootAPI.request.SignUpRequest;
import com.bootcamp.project.springBootAPI.services.AuthServices;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

	@Autowired
	AuthServices authServices;

	@PostMapping("/signin")
	public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
		return this.authServices.authenticateUser(loginRequest);
	}

	@PostMapping("/signup")
	public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpRequest signUpRequest) {
		return this.authServices.registerUser(signUpRequest);
	}
}