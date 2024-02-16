package com.ritik.chatservice.controller;

import com.ritik.chatservice.model.*;
import com.ritik.chatservice.model.dto.AllUserDto;
import com.ritik.chatservice.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/api/v1/user")
@CrossOrigin("*")
public class UserController {

    @Autowired
    UserService userService;

    @GetMapping("/{id}")
    public ResponseEntity<AllUserDto> getUserById(@PathVariable("id") long id){
        AllUserDto user = userService.getUserById(id);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @GetMapping("/all")
    public ResponseEntity<List<AllUserDto>> getAllUserSearch(){
        return new ResponseEntity<>(userService.getAllUserSearch(), HttpStatus.OK);
    }
    @PostMapping("/add")
    public ResponseEntity<User> addUser(@RequestBody User user){
        User createdUser = userService.createUser(user);
        return new ResponseEntity<>(createdUser, HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<User> loginUser(@RequestBody Login login){
            return new ResponseEntity<>(userService.loginUser(login), HttpStatus.OK);
    }
    @GetMapping("/logout/{id}")
    public ResponseEntity setUserToOffline(@PathVariable("id") long id){
        userService.setUserToOffline(id);
        return new ResponseEntity<>( HttpStatus.OK);
    }

    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody Register register){
        return new ResponseEntity<>(userService.registerUser(register), HttpStatus.OK);
    }


    @GetMapping("/chatList/{id}")
    public ResponseEntity<List<UserChat>> getUserChatList(@PathVariable("id") long id){
        return new ResponseEntity<>(userService.getUserChatsById(id), HttpStatus.OK);
    }


    @PostMapping("/chatList/{id}")
    public ResponseEntity<List<UserChat>> addUserChatById(@PathVariable("id") long id, @RequestBody UserChat userChat){
        return new ResponseEntity<>(userService.addUserChatById(userChat, id), HttpStatus.OK);
    }

}
