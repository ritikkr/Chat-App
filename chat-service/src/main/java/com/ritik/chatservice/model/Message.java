package com.ritik.chatservice.model;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Date;

@Entity
@Data
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String text;
    private byte[] media;

    private long toUserId;
    private long fromUserId;
    private Date sentAt;
    private Date deliveredAt;
    private Date readAt;

}
