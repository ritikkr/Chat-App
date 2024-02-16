package com.ritik.chatservice.service;

import com.ritik.chatservice.model.*;
import com.ritik.chatservice.model.dto.AllUserDto;

import java.util.Date;
import java.util.List;

public interface UserService {

    public User createUser(User user);

    User loginUser(Login login);

    User registerUser(Register register);

    public AllUserDto getUserById(long id);

    public User updateUserById(User user, long id);

    public void deleteUserById(long id);
    public void setOnlineById(long id);
    public void setUserToOffline(long id);
    public boolean getOnlineById(long id);
    public Date getLastOnlineTimeById(long id);
    public List<Status> addStatusById(Status status, long id);
    public List<Status> getStatusById(long id);


    public List<UserChat> addUserChatById(UserChat userChat, long id);
    public List<UserChat> getUserChatsById(long id);

    public List<AllUserDto> getAllUserSearch();
}
