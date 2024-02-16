package com.ritik.chatservice.service;

import com.ritik.chatservice.model.Contact;

public interface ContactService {

    public Contact createContact(Contact contact);

    public Contact updateContactById(Contact contact, long id);

    public Contact deleteContactById(long id);

}
