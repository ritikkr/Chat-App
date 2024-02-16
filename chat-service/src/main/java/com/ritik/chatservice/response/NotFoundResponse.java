package com.ritik.chatservice.response;

import java.util.Date;

public class NotFoundResponse {

    String text;
    Date ErrorTimeStamp;

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Date getErrorTimeStamp() {
        return ErrorTimeStamp;
    }

    public void setErrorTimeStamp(Date errorTimeStamp) {
        ErrorTimeStamp = errorTimeStamp;
    }
}
