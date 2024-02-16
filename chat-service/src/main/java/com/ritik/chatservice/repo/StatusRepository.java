package com.ritik.chatservice.repo;

import com.ritik.chatservice.model.Status;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StatusRepository extends JpaRepository<Status,Long> {
}
