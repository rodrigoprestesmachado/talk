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
package dev.orion.talk;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.websocket.OnClose;
import jakarta.websocket.OnError;
import jakarta.websocket.OnMessage;
import jakarta.websocket.OnOpen;
import jakarta.websocket.Session;
import jakarta.websocket.server.PathParam;
import jakarta.websocket.server.ServerEndpoint;

@ServerEndpoint("/talk/{text}")
@ApplicationScoped
public class TalkWebSocket {

    @OnOpen
    public void onOpen(Session session, @PathParam("text") String text) {
        System.out.println("onOpen> " + text);
    }

    @OnClose
    public void onClose(Session session, @PathParam("text") String text) {
        System.out.println("onClose> " + text);
    }

    @OnError
    public void onError(Session session, @PathParam("text") String text, Throwable throwable) {
        System.out.println("onError> " + text + ": " + throwable);
    }

    @OnMessage
    public void onMessage(String message, @PathParam("text") String text) {
        System.out.println("onMessage> " + text + ": " + message);
    }
}
