package com.ritik.chatservice.exception;

public class WrongCredentialException extends RuntimeException{

    public WrongCredentialException(String message){
        super(message);
    }
}
