package com.ritik.chatservice.exception;

import com.ritik.chatservice.response.NotFoundResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.Date;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler
    public ResponseEntity<NotFoundResponse> userNotFoundExceptionHandler(UserNotFoundException userNotFoundException){
        NotFoundResponse userNotFoundResponse = new NotFoundResponse();
        userNotFoundResponse.setText(userNotFoundException.getMessage());
        userNotFoundResponse.setErrorTimeStamp(new Date());

        return new ResponseEntity<>(userNotFoundResponse, HttpStatus.NOT_FOUND);
    }
    @ExceptionHandler
    public ResponseEntity<NotFoundResponse> messageNotFoundExceptionHandler(MessageNotFoundException messageNotFoundException){
        NotFoundResponse userNotFoundResponse = new NotFoundResponse();
        userNotFoundResponse.setText(messageNotFoundException.getMessage());
        userNotFoundResponse.setErrorTimeStamp(new Date());

        return new ResponseEntity<>(userNotFoundResponse, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler
    public ResponseEntity<NotFoundResponse> wrongCredentialExceptionHandler(WrongCredentialException wrongCredentialException){
        NotFoundResponse userNotFoundResponse = new NotFoundResponse();
        userNotFoundResponse.setText(wrongCredentialException.getMessage());
        userNotFoundResponse.setErrorTimeStamp(new Date());

        return new ResponseEntity<>(userNotFoundResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    public ResponseEntity<NotFoundResponse> userNameAlreadyExistExceptionHandler(UserNameAlreadyExistException userNameAlreadyExistException){
        NotFoundResponse userNotFoundResponse = new NotFoundResponse();
        userNotFoundResponse.setText(userNameAlreadyExistException.getMessage());
        userNotFoundResponse.setErrorTimeStamp(new Date());

        return new ResponseEntity<>(userNotFoundResponse, HttpStatus.BAD_REQUEST);
    }
}
