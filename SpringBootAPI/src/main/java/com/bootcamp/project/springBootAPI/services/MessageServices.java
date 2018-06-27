package com.bootcamp.project.springBootAPI.services;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.bootcamp.project.springBootAPI.model.Message;
import com.bootcamp.project.springBootAPI.model.User;
import com.bootcamp.project.springBootAPI.repository.MessageRepository;
import com.bootcamp.project.springBootAPI.repository.UserRepository;
import com.bootcamp.project.springBootAPI.request.MessageRequest;
import com.bootcamp.project.springBootAPI.response.ApiResponse;
import com.bootcamp.project.springBootAPI.security.UserPrincipal;

@Service
public class MessageServices {

	@Autowired
	private MessageRepository messageRepository;

	@Autowired
	private UserRepository userRepository;
	
	private static final Logger logger = LoggerFactory.getLogger(MessageServices.class);

	public ResponseEntity<?> sendMessage(UserPrincipal currentUser, MessageRequest messageRequest) {

		Optional<User> sender = userRepository.findById(currentUser.getId());
		Optional<User> receiver = userRepository.findByUsernameIgnoreCase(messageRequest.getReceiver());

		try {

			User send = sender.get();
			User receive = receiver.get();
			Message message = new Message(messageRequest.getId(), messageRequest.getMessage(), send, receive);

			messageRepository.save(message);

			return ResponseEntity.ok(new ApiResponse(true, "Message sent successfully"));
		} catch (Exception e) {

			return new ResponseEntity(new ApiResponse(false, "Invalid request"), HttpStatus.BAD_REQUEST);
		}
	}

	public List<MessageRequest> getSent(UserPrincipal currentUser) {

		Optional<User> sender = userRepository.findByUsernameIgnoreCase(currentUser.getUsername());
		try {

			Set<Message> messages = sender.get().getSentMessage();

			List<MessageRequest> messagesRequest = messages.stream().map(m -> {
				MessageRequest messageRequest = new MessageRequest();
				messageRequest.setId(m.getId());
				messageRequest.setMessage(m.getMessage());
				messageRequest.setSender(m.getSender().getUsername());
				messageRequest.setReceiver(m.getReceiver().getUsername());
				return messageRequest;
			}).collect(Collectors.toList());

			return messagesRequest;

		} catch (Exception e) {
			return Collections.emptyList();
		}
	}

	public List<MessageRequest> getSentMsgByUsername(String username) {
		Optional<User> sender = userRepository.findByUsernameIgnoreCase(username);

		try {

			Set<Message> messages = sender.get().getSentMessage();

			List<MessageRequest> messagesRequest = messages.stream().map(m -> {
				MessageRequest messageRequest = new MessageRequest();
				messageRequest.setId(m.getId());
				messageRequest.setMessage(m.getMessage());
				messageRequest.setSender(m.getSender().getUsername());
				messageRequest.setReceiver(m.getReceiver().getUsername());
				return messageRequest;
			}).collect(Collectors.toList());

			return messagesRequest;

		} catch (Exception e) {
			return Collections.emptyList();
		}

	}

	public List<MessageRequest> getReceived(UserPrincipal currentUser) {

		Optional<User> receiver = userRepository.findByUsernameIgnoreCase(currentUser.getUsername());
		try {

			Set<Message> messages = receiver.get().getReceivedMessage();

			List<MessageRequest> messagesRequest = messages.stream().map(m -> {
				MessageRequest messageRequest = new MessageRequest();
				messageRequest.setId(m.getId());
				messageRequest.setMessage(m.getMessage());
				messageRequest.setSender(m.getSender().getUsername());
				messageRequest.setReceiver(m.getReceiver().getUsername());
				return messageRequest;
			}).collect(Collectors.toList());

			return messagesRequest;

		} catch (Exception e) {
			return Collections.emptyList();
		}

	}

	public List<MessageRequest> getReceivedMsgByUsername(String username) {

		Optional<User> receiver = userRepository.findByUsernameIgnoreCase(username);
		try {

			Set<Message> messages = receiver.get().getReceivedMessage();

			List<MessageRequest> messagesRequest = messages.stream().map(m -> {
				MessageRequest messageRequest = new MessageRequest();
				messageRequest.setId(m.getId());
				messageRequest.setMessage(m.getMessage());
				messageRequest.setSender(m.getSender().getUsername());
				messageRequest.setReceiver(m.getReceiver().getUsername());
				return messageRequest;
			}).collect(Collectors.toList());

			return messagesRequest;

		} catch (Exception e) {
			return Collections.emptyList();
		}
	}

	public List<MessageRequest> getMessageList(UserPrincipal currentUser) {

		Optional<User> user = userRepository.findById(currentUser.getId());
		try {

			Set<Message> sentmessages = user.get().getSentMessage();
			Set<Message> receivedmessages = user.get().getReceivedMessage();

			Set<Message> messages = sentmessages.stream().collect(Collectors.toSet());
			messages.addAll(receivedmessages);

			List<MessageRequest> messagesRequest = messages.stream().map(m -> {
				MessageRequest messageRequest = new MessageRequest();
				messageRequest.setId(m.getId());
				messageRequest.setMessage(m.getMessage());
				messageRequest.setSender(m.getSender().getUsername());
				messageRequest.setReceiver(m.getReceiver().getUsername());
				return messageRequest;
			}).collect(Collectors.toList());

			return messagesRequest;

		} catch (Exception e) {
			return Collections.emptyList();
		}
	}

	public ResponseEntity<?> deleteMessage(Long id) {

		try {
			messageRepository.deleteById(id);
		} catch (Exception e) {
			return new ResponseEntity(new ApiResponse(false, "Invalid operation"), HttpStatus.BAD_REQUEST);
		}
		return ResponseEntity.ok(new ApiResponse(true, "Message was deleted successfully"));
	}
	
	public ResponseEntity<?> updateMessage(MessageRequest messageRequest) {

		Optional<User> sender = userRepository.findByUsernameIgnoreCase(messageRequest.getSender());
		Optional<User> receiver = userRepository.findByUsernameIgnoreCase(messageRequest.getReceiver());

		try {
			User send = sender.get();
			User receive = receiver.get();
			Message message = new Message(messageRequest.getId(), messageRequest.getMessage(), send, receive);

			messageRepository.save(message);

		} catch (Exception e) {

			return new ResponseEntity(new ApiResponse(false, "Invalid request"), HttpStatus.BAD_REQUEST);
		}
		return ResponseEntity.ok(new ApiResponse(true, "Message updated successfully"));

	}

}
