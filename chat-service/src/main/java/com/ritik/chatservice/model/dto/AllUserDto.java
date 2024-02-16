package com.ritik.chatservice.model.dto;

import lombok.Data;

import java.util.Date;

@Data
public class AllUserDto {

    private long userId;

    private long phoneNumber;
    private String userName;
    private String bio;
    private String firstName;
    private String lastName;
    private boolean isOnline;
    private Date lastOnlineTime;





}
