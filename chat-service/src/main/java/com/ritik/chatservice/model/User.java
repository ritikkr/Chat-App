package com.ritik.chatservice.model;

import lombok.Data;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity(name = "USER_Table")
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private long phoneNumber;
    private String userName;
    private String bio;
    private String firstName;
    private String lastName;
    private boolean isOnline;
    private Date lastOnlineTime;
    private String password;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "status_id")
    private List<Status> statusList;


    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "userchat_id")
    private List<UserChat> userChatList;



}
