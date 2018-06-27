package com.bootcamp.project.springBootAPI.model;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import com.bootcamp.project.springBootAPI.model.audit.DateAudit;

@Entity
@Table(name = "message")
public class Message extends DateAudit {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	@NotBlank
	@Size(max = 250)
	private String message;

	@ManyToOne(fetch = FetchType.LAZY)
	private User sender;

	@ManyToOne(fetch = FetchType.LAZY)
	private User receiver;

	public Message() {
	}

	public Message(Long id, String message, User sender, User receiver) {
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

	public User getSender() {
		return sender;
	}

	public void setSender(User sender) {
		this.sender = sender;
	}

	public User getReceiver() {
		return receiver;
	}

	public void setReceiver(User receiver) {
		this.receiver = receiver;
	}

}
