package com.ritik.chatservice.service;

import com.ritik.chatservice.model.Status;

public interface StatusService {

    public Status createStatusByUserId(Long userId);

    public Status deleteStatusById(Long id);
}
