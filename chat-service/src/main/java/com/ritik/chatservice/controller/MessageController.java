package com.ritik.chatservice.controller;

import com.ritik.chatservice.model.Message;
import com.ritik.chatservice.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping("/api/v1/message")
@CrossOrigin("*")
public class MessageController {

    @Autowired
    MessageService messageService;

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Message>> getMessageByUserId(@PathVariable("userId") long userId) {
        System.out.println("In Controoler");
        return new ResponseEntity<>(messageService.getMessageByUserId(userId), HttpStatus.OK);
    }

    @GetMapping("/from/{fromId}/to/{toId}")
    public ResponseEntity<List<Message>> getMessageBetweenTwoUser(@PathVariable("fromId") long fromId, @PathVariable("toId") long toId){
        return new ResponseEntity<>(messageService.getMessageBetweenTwoUser(fromId, toId), HttpStatus.OK);
    }

    @PostMapping("/send")
    public ResponseEntity<Message> sendMessage(@RequestBody Message message){
        return new ResponseEntity<>(messageService.sendMessage(message), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Message> getMessageDetailById(@PathVariable("id") long id){
        return new ResponseEntity<>(messageService.getMessageById(id), HttpStatus.OK);
    }

    @PutMapping("/{id}/{newText}")
    public ResponseEntity<Message> updateMessageById(@PathVariable("id") long id, @PathVariable("newText") String newText){
        return new ResponseEntity<>(messageService.updateMessage(newText, id), HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteMessageById(@PathVariable("id") long id){
        messageService.deleteMessage(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
