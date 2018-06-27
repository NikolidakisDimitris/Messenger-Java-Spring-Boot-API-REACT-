package com.bootcamp.project.springBootAPI.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.bootcamp.project.springBootAPI.model.Message;
import com.bootcamp.project.springBootAPI.model.User;

@Repository
public interface MessageRepository extends CrudRepository<Message, Long> {
	List<Message> findAllBySender(User user);

	List<Message> findAllByReceiver(User user);

	@Transactional
	@Modifying
	void deleteById(Long id);

	@Query("Select m from Message m where m.id = :id")
	Message findAllByMessageId(@Param("id") Long Id);
}