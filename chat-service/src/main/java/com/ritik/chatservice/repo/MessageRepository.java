package com.ritik.chatservice.repo;

import com.ritik.chatservice.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {

    List<Message> getMessagesByFromUserId(long fromUserId);
    List<Message> getMessagesByToUserId(long toUserId);

}
