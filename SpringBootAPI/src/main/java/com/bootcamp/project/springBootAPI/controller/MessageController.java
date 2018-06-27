package com.bootcamp.project.springBootAPI.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bootcamp.project.springBootAPI.request.MessageRequest;
import com.bootcamp.project.springBootAPI.security.CurrentUser;
import com.bootcamp.project.springBootAPI.security.UserPrincipal;
import com.bootcamp.project.springBootAPI.services.MessageServices;

@RestController
@RequestMapping("/api/message")
public class MessageController {

	@Autowired
	private MessageServices messageServices;

	@PostMapping(path = "/send", consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
	@PreAuthorize("hasRole('USER')")
	public ResponseEntity<?> sendMessage(@CurrentUser UserPrincipal currentUser,
			@RequestBody MessageRequest messageRequest) {

		return messageServices.sendMessage(currentUser, messageRequest);

	}

	@GetMapping(path = "/sentmessages", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	@PreAuthorize("hasRole('USER')")
	public List<MessageRequest> getSent(@CurrentUser UserPrincipal currentUser) {
		return messageServices.getSent(currentUser);
	}

	@GetMapping(path = "/sentmessages/{username}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	@PreAuthorize("hasRole('ADMIN') or hasRole('GOD')")
	public List<MessageRequest> getSentMsgByUsername(@CurrentUser UserPrincipal currentUser,
			@PathVariable("username") String username) {

		return messageServices.getSentMsgByUsername(username);
	}

	@GetMapping(path = "/receivedmessages", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	@PreAuthorize("hasRole('USER')")
	public List<MessageRequest> getReceived(@CurrentUser UserPrincipal currentUser) {

		return messageServices.getReceived(currentUser);

	}

	@GetMapping(path = "/receivedmessages/{username}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	@PreAuthorize("hasRole('ADMIN') or hasRole('GOD')")
	public List<MessageRequest> getReceivedMsgByUsername(@CurrentUser UserPrincipal currentUser,
			@PathVariable("username") String username) {

		return messageServices.getReceivedMsgByUsername(username);

	}

	@GetMapping(path = "/allmessages", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	@PreAuthorize("hasRole('USER')")
	public List<MessageRequest> getMessageList(@CurrentUser UserPrincipal currentUser) {

		return messageServices.getMessageList(currentUser);
	}

	@PostMapping(path = "/deletemessage/{id}")
	@PreAuthorize("hasRole('USER') or hasRole('GOD') or hasRole('ADMIN')")
	public ResponseEntity<?> deletemessage(@CurrentUser UserPrincipal currentUser, @PathVariable("id") Long id) {

		return messageServices.deleteMessage(id);
	}

	@PostMapping(path = "/updatemessage", consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
	@PreAuthorize("hasRole('GOD') or hasRole('ADMIN')")
	public ResponseEntity<?> updateMessage(@CurrentUser UserPrincipal currentUser,
			@RequestBody MessageRequest messageRequest) {

		return messageServices.updateMessage(messageRequest);

	}
}