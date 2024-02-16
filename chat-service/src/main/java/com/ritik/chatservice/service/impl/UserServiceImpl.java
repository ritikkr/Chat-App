package com.ritik.chatservice.service.impl;

import com.ritik.chatservice.exception.UserNameAlreadyExistException;
import com.ritik.chatservice.exception.UserNotFoundException;
import com.ritik.chatservice.exception.WrongCredentialException;
import com.ritik.chatservice.model.*;
import com.ritik.chatservice.model.dto.AllUserDto;
import com.ritik.chatservice.repo.ContactRepository;
import com.ritik.chatservice.repo.MessageRepository;
import com.ritik.chatservice.repo.StatusRepository;
import com.ritik.chatservice.repo.UserRepository;
import com.ritik.chatservice.service.MessageService;
import com.ritik.chatservice.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    StatusRepository statusRepository;

    @Autowired
    ContactRepository contactRepository;

    @Autowired
    MessageService messageService;

    @Autowired
    MessageRepository messageRepository;


    /**
     * create user
     * @param user user detail
     * @return created user
     */
    @Override
    public User createUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public User loginUser(Login login){
        User user = userRepository.findByUserName(login.getUserName()).orElseThrow(() -> new UserNotFoundException("No user found with userName "+login.getUserName()));
        if(!user.getPassword().equals(login.getPassword())){
            throw new WrongCredentialException("Username or password is wrong");
        }
        user.setOnline(true);
        userRepository.save(user);
        return user;

    }

    @Override
    public User registerUser(Register register){
        Optional<User> user = userRepository.findByUserName(register.getUserName());
        if(user.isPresent()){
            throw new UserNameAlreadyExistException("Username already exists "+register.getUserName());
        }
        User newUser = new User();
        newUser.setUserName(register.getUserName());
        newUser.setPhoneNumber(register.getPhoneNumber());
        newUser.setFirstName(register.getFirstName());
        newUser.setLastName(register.getLastName());
        newUser.setPassword(register.getPassword());

        User company = userRepository.findByUserName("company").orElseThrow(() ->  new UserNotFoundException("Company Id not found"));
//        Message message = messageService.greetFromCompanyForNewUser(company.getId(), newUser.getId());

        User savedNewUser = userRepository.save(newUser);



        Message message = new Message();
        message.setText("Hello, Welcome message from company"+newUser.getFirstName());
        message.setToUserId(savedNewUser.getId());
        message.setFromUserId(company.getId());
        message.setSentAt(new Date());


        Message savedMessage = messageRepository.save(message);


        List<UserChat> newUserChatList = new ArrayList<>();
        UserChat userChat = new UserChat();
        userChat.setUserId(company.getId());
        userChat.setLastMessageId(savedMessage.getId());

        newUserChatList.add(userChat);
        savedNewUser.setUserChatList(newUserChatList);



        return userRepository.save(savedNewUser);
    }

    public AllUserDto getUserById(long id){
        User user = userRepository.findById(id).orElseThrow(() ->  new UserNotFoundException("No User found with id: "+id));
        AllUserDto userDto = new AllUserDto();
        userDto.setUserName(user.getUserName());
        userDto.setUserId(user.getId());
        userDto.setOnline(user.isOnline());
        userDto.setPhoneNumber(user.getPhoneNumber());
        userDto.setLastName(user.getLastName());
        userDto.setFirstName(user.getFirstName());
        userDto.setBio(user.getBio());
        userDto.setLastOnlineTime(user.getLastOnlineTime());

        return userDto;
    }

    @Override
    public User updateUserById(User user, long id) {
        User existingUser = userRepository.findById(id).orElseThrow(() -> new UserNotFoundException("No user found with Id: "+id));
        existingUser.setUserName(user.getUserName());
        existingUser.setBio(user.getBio());
        existingUser.setPhoneNumber(user.getPhoneNumber());
        return userRepository.save(existingUser);
    }

    @Override
    public void deleteUserById(long id) {
        Optional<User> user = userRepository.findById(id);
        if(!user.isPresent()){
            throw new UserNotFoundException("No user found with Id: "+id);
        }
        userRepository.deleteById(id);
    }

    public void setOnlineById(long id){
        User user = userRepository.findById(id).orElseThrow(() ->  new UserNotFoundException("No User Found with id"+ id));
        user.setOnline(true);
    }

    public void setUserToOffline(long id){
        User user = userRepository.findById(id).orElseThrow(() ->  new UserNotFoundException("No User Found with id"+ id));
        user.setOnline(false);
        userRepository.save(user);
    }

    public boolean getOnlineById(long id){
        User user = userRepository.findById(id).orElseThrow(() ->  new UserNotFoundException("No User Found with id"+ id));
        return user.isOnline();
    }

    public Date getLastOnlineTimeById(long id){
        User user = userRepository.findById(id).orElseThrow(() ->  new UserNotFoundException("No User Found with id"+ id));
        return user.getLastOnlineTime();
    }

    public List<Status> addStatusById(Status status, long id){
        User user = userRepository.findById(id).orElseThrow(() -> new UserNotFoundException("No User found with id: "+id));
//        Status status1 = statusRepository.save(status);
        List<Status> existingStatuses = user.getStatusList();
        existingStatuses.add(status);
        userRepository.save(user);
        return existingStatuses;
    }

    public List<Status> getStatusById(long id){
        User user = userRepository.findById(id).orElseThrow(() -> new UserNotFoundException("No User found with id: "+id));
        return user.getStatusList();
    }

    public List<AllUserDto> getAllUserSearch(){
        List<User> userList = userRepository.findAll();
        List<AllUserDto> result = new ArrayList<>();
        for(User user: userList){
            AllUserDto userDto = new AllUserDto();
            userDto.setUserId(user.getId());
            userDto.setFirstName(user.getFirstName());
            userDto.setLastName(user.getLastName());
            userDto.setBio(user.getBio());
            userDto.setOnline(user.isOnline());
            userDto.setPhoneNumber(user.getPhoneNumber());
            userDto.setLastOnlineTime(user.getLastOnlineTime());
            userDto.setUserName(user.getUserName());
            result.add(userDto);
        }
        return result;
    }
    public List<UserChat> addUserChatById(UserChat userChat, long id){
        User user = userRepository.findById(id).orElseThrow(() -> new UserNotFoundException("No User found with id: "+id));
        List<UserChat> existingUserChats = user.getUserChatList();
        existingUserChats.add(userChat);
        userRepository.save(user);
        return existingUserChats;
    }

    public List<UserChat> getUserChatsById(long id){
        User user = userRepository.findById(id).orElseThrow(() -> new UserNotFoundException("No User found with id: "+id));
        return user.getUserChatList();
    }




}
