package com.bootcamp.project.springBootAPI.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.bootcamp.project.springBootAPI.model.User;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {
	Optional<User> findByEmail(String email);

	Optional<User> findByUsernameOrEmailIgnoreCase(String username, String email);

	List<User> findByIdIn(List<Long> userIds);

	Optional<User> findByUsernameIgnoreCase(String username);

	Boolean existsByUsername(String username);

	Boolean existsByEmail(String email);

	@Transactional
	@Modifying
	void deleteById(Long id);

}