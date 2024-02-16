package com.ritik.chatservice.service.impl;

import com.ritik.chatservice.exception.MessageNotFoundException;
import com.ritik.chatservice.exception.UserNotFoundException;
import com.ritik.chatservice.model.Message;
import com.ritik.chatservice.model.User;
import com.ritik.chatservice.model.UserChat;
import com.ritik.chatservice.repo.MessageRepository;
import com.ritik.chatservice.repo.UserRepository;
import com.ritik.chatservice.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class MessageServiceImpl implements MessageService {

    @Autowired
    MessageRepository messageRepository;

    @Autowired
    UserRepository userRepository;

    @Override
    public Message createMessage(Message message) {
        return messageRepository.save(message);
    }

    @Override
    public Message updateMessage(String newMessage, long messageId) {
        Message message = messageRepository.findById(messageId).orElseThrow(() -> new MessageNotFoundException("No Message found with id "+messageId));
        message.setText(newMessage);
        messageRepository.save(message);
        return message;
    }

    @Override
    public void deleteMessage(long messageId) {
        Optional<Message> existingMessage = messageRepository.findById(messageId);
        if(!existingMessage.isPresent()){
            throw new MessageNotFoundException("No Message found with id"+ messageId);
        }
        messageRepository.deleteById(messageId);
    }

    @Override
    public Message sendMessage(Message message){
        message.setSentAt(new Date());
        User fromUsr = userRepository.findById(message.getFromUserId()).orElseThrow(() -> new UserNotFoundException("No Usr found with id"+message.getFromUserId()));
        User toUsr = userRepository.findById(message.getToUserId()).orElseThrow(() -> new UserNotFoundException("No Usr found with id"+message.getToUserId()));

        Message savedMessage = messageRepository.save(message);

        List<UserChat> fromUserChatList = fromUsr.getUserChatList();
        List<UserChat> toUserChatList = toUsr.getUserChatList();

        boolean isToUserAlreadyExistInFromChatList = false;
        boolean isFromUserAlreadyExistInToChatList = false;
        for(UserChat userChat: fromUserChatList){
            if(userChat.getUserId() == toUsr.getId()){
                isToUserAlreadyExistInFromChatList = true;
                userChat.setLastMessageId(savedMessage.getId());
                break;
            }
        }
        if(!isToUserAlreadyExistInFromChatList){
            UserChat userChat = new UserChat();
            userChat.setUserId(toUsr.getId());
            userChat.setLastMessageId(savedMessage.getId());
            fromUserChatList.add(userChat);
        }

        for(UserChat userChat: toUserChatList){
            if(userChat.getUserId() == fromUsr.getId()){
                isFromUserAlreadyExistInToChatList = true;
                userChat.setLastMessageId(savedMessage.getId());
                break;
            }
        }
        if(!isFromUserAlreadyExistInToChatList){
            UserChat chat = new UserChat();
            chat.setUserId(fromUsr.getId());
            chat.setLastMessageId(savedMessage.getId());
            toUserChatList.add(chat);
        }

        fromUsr.setUserChatList(fromUserChatList);
        toUsr.setUserChatList(toUserChatList);

        userRepository.save(fromUsr);
        userRepository.save(toUsr);


        return savedMessage;
    }

    @Override
    public Message getMessageById(long id){
        return messageRepository.findById(id).orElseThrow(() -> new MessageNotFoundException("No Message found with id"+id));
    }

    @Override
    public Message greetFromCompanyForNewUser(long companyId, long toUserId){
        Message message = new Message();
        message.setText("Hello, Welcome message from company");
        message.setToUserId(toUserId);
        message.setFromUserId(companyId);
        message.setSentAt(new Date());



        return messageRepository.save(message);
    }

    @Override
    public List<Message> getMessageByUserId(long userId){
        System.out.println("In Service"+userId);
        List<Message> messages = messageRepository.getMessagesByFromUserId(userId);
        List<Message> messages1 = messageRepository.getMessagesByToUserId(userId);

        System.out.println(messages);
        messages.addAll(messages1);
        return messages;
    }

    @Override
    public List<Message> getMessageBetweenTwoUser(long fromUserId, long toId){
        List<Message> result = new ArrayList<>();
        List<Message> fromMessageList = messageRepository.getMessagesByFromUserId(fromUserId);
        List<Message> toMessageList = messageRepository.getMessagesByFromUserId(toId);
        result.addAll(fromMessageList.stream().filter((msg) -> msg.getToUserId() == toId).collect(Collectors.toList()));
        result.addAll(toMessageList.stream().filter((msg) -> msg.getToUserId() == fromUserId).collect(Collectors.toList()));

        return result;
    }
}
