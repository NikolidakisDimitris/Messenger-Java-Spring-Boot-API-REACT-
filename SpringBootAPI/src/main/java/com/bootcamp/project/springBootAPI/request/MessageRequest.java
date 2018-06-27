package com.bootcamp.project.springBootAPI.request;

public class MessageRequest {

	private Long id;

	private String message;

	private String sender;

	private String receiver;

	public MessageRequest() {
	}

	public MessageRequest(Long id, String message, String sender, String receiver) {
		this.id = id;
		this.message = message;
		this.sender = sender;
		this.receiver = receiver;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public String getSender() {
		return sender;
	}

	public void setSender(String sender) {
		this.sender = sender;
	}

	public String getReceiver() {
		return receiver;
	}

	public void setReceiver(String receiver) {
		this.receiver = receiver;
	}

}
