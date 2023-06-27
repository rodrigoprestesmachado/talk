/**
 * @License
 * Copyright 2023 Orion Services @ https://github.com/orion-services
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package dev.orion.talk.web.websocket;

import java.util.Set;
import java.util.logging.Level;
import java.util.logging.Logger;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.websocket.OnClose;
import jakarta.websocket.OnError;
import jakarta.websocket.OnMessage;
import jakarta.websocket.OnOpen;
import jakarta.websocket.Session;
import jakarta.websocket.server.PathParam;
import jakarta.websocket.server.ServerEndpoint;

/**
 * Talk WebSocket.
 */
@ServerEndpoint("/talk/{channel}/{user}")
@ApplicationScoped
public class TalkSocket {

    /** Logger. */
    private Logger log = Logger.getLogger(TalkSocket.class.getName());

    /** Groups of sessions organized by channel. */
    @Inject
    private TalkSessionManager manager;

    /**
     * On open.
     *
     * @param session WebSocket Session
     * @param channel The hash of a channel
     * @param user The hash of a user
     */
    @OnOpen
    public void onOpen(final Session session,
        @PathParam("channel") final String channel,
        @PathParam("user") final String user) {
        manager.add(channel, session);
        broadcast(user + " " + channel + " connected", channel);
    }

    /**
     * On close.
     *
     * @param session WebSocket Session
     * @param channel The hash of a channel
     * @param user The hash of a user
     */
    @OnClose
    public void onClose(final Session session,
        @PathParam("channel") final String channel,
        @PathParam("user") final String user) {
        manager.remove(channel, session);
        broadcast(user + " " + channel + " left", channel);
    }

    /**
     * On error.
     *
     * @param session WebSocket Session
     * @param channel The hash of a channel
     * @param user The hash of a user
     * @param throwable Throwable
     */
    @OnError
    public void onError(final Session session,
        @PathParam("channel") final String channel,
        @PathParam("user") final String user, final Throwable throwable) {
        manager.remove(channel, session);
        broadcast(user + " " + channel + " left on error: " + throwable,
            channel);
    }

    /**
     * On message.
     *
     * @param message A message
     * @param channel The hash of a channel
     * @param user The hash of a user
     */
    @OnMessage
    public void onMessage(final String message,
        @PathParam("channel") final String channel,
        @PathParam("user") final String user) {
        if ("_ready_".equalsIgnoreCase(message)) {
            broadcast(user + " " + channel + " joined", channel);
        } else {
            broadcast(user + " " + channel + " " + message, channel);
        }
    }

    /**
     * Broadcast the messages to all sessions.
     *
     * @param message A message
     * @param channel The hash of a channel
     */
    private void broadcast(final String message, final String channel) {
        Set<Session> sessions = manager.getSessions(channel);
        sessions.forEach(s -> {
            s.getAsyncRemote().sendObject(message, result ->  {
                if (result.getException() != null
                    && log.isLoggable(Level.INFO)) {
                    log.log(Level.INFO, "{} Error {}",
                        new Object[]{channel, result.getException()});
                }
            });
        });
    }

}
