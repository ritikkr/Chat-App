package com.ritik.chatservice.service;

import com.ritik.chatservice.model.UserChat;

/**
 * This class is responsible for business logic related to user chat
 * @author Ritik
 * @version 1.0.0
 */
public interface UserChatService {

    /**
     * This function will create the user
     * @param userChat model contains user info
     * @return create user details
     */
    public UserChat createUserChat(UserChat userChat);

    /**
     * This function will update the user detail
     * @param userChat contains updated details for user
     * @param userId user id for whom need to update
     * @return
     */

    public UserChat updateUserChatByUserId(UserChat userChat, long userId);

    /**
     * This function will delete the user chat details
     * @param id user chat id
     */
    public void deleteUserChatById(long id);
}
