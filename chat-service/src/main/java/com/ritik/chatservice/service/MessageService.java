package com.ritik.chatservice.service;

import com.ritik.chatservice.model.Message;

import java.util.List;

public interface MessageService {

    /**
     * This function will create the user
     * will get invoke when someone sent a message
     * @param message message details like text, media, its timing
     * @return message detail
     */
    public Message createMessage(Message message);

    /**
     * This function will only edit the text message
     * @param newMessage new text for message
     * @param messageId message id
     * @return updated message
     */
    public Message updateMessage(String newMessage, long messageId);

    /**
     * This function will delete the message for given id
     * @param messageId message id
     */
    public void deleteMessage(long messageId);

    public Message sendMessage(Message message);
    public Message greetFromCompanyForNewUser(long companyId, long toUserId);
    public Message getMessageById(long id);
    public List<Message> getMessageBetweenTwoUser(long fromUserId, long toId);

    public List<Message> getMessageByUserId(long userId);

}
