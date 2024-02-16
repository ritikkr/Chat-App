package com.ritik.chatservice.exception;

import lombok.Getter;
import lombok.Setter;


public class UserNotFoundException extends RuntimeException{

    public UserNotFoundException(String message){
        super(message);
    }

}
