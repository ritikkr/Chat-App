package com.ritik.chatservice.exception;

public class UserNameAlreadyExistException extends RuntimeException{

    public UserNameAlreadyExistException(String message){
        super(message);
    }
}
