package com.bootcamp.project.springBootAPI.request;

import java.util.List;

import com.bootcamp.project.springBootAPI.model.RoleType;

public class RoleRequest {

	private Long id;
	private List<RoleType> roles;

	public RoleRequest() {
		super();
	}

	public RoleRequest(Long id, List<RoleType> roles) {
		super();
		this.id = id;
		this.roles = roles;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public List<RoleType> getRoles() {
		return roles;
	}

	public void setRoles(List<RoleType> roles) {
		this.roles = roles;
	}
}
