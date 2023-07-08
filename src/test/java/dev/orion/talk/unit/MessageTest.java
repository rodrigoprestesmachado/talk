package dev.orion.talk.unit;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import dev.orion.talk.model.Message;
import dev.orion.talk.model.User;

import java.time.Instant;

public class MessageTest {

    @Test
    public void testSetText() {
        Message message = new Message();
        message.setText("Hello, World!");

        Assertions.assertEquals("Hello, World!", message.getText());
    }

    @Test
    public void testSetHash() {
        Message message = new Message();
        message.setHash("abc123");

        Assertions.assertEquals("abc123", message.getHash());
    }

    @Test
    public void testSetUser() {
        Message message = new Message();
        User user = new User();
        user.setHash("test-hash");
        message.setUser(user);
        Assertions.assertEquals(user, message.getUser());
    }

    @Test
    public void testSetTimestamp() {
        Message message = new Message();
        Instant timestamp = Instant.now();
        message.setTimestamp(timestamp);
        Assertions.assertEquals(timestamp, message.getTimestamp());
    }

    @Test
    public void testMessageConstructor() {
        Message message = new Message();

        Assertions.assertNotNull(message.getHash());
    }
}
