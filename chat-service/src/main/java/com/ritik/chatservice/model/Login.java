package com.ritik.chatservice.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Login {

    String userName;
    String password;

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
