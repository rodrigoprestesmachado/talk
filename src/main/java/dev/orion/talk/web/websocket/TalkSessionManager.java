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

import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CopyOnWriteArraySet;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.websocket.Session;

@ApplicationScoped
public class TalkSessionManager {

    /** Sessions of a channel. */
    private Map<String, Set<Session>> channels = new ConcurrentHashMap<>();

    /**
     * Add a session to a channel.
     *
     * @param channel A hash of a channel.
     * @param session A session object.
     */
    public void add(final String channel, final Session session) {
        Set<Session> group = channels.computeIfAbsent(channel,
                k -> new CopyOnWriteArraySet<>());
        group.add(session);
    }

    /**
     * Remove a session from a channel.
     *
     * @param channel A hash of a channel.
     * @param session A session object.
     */
    public void remove(final String channel, final Session session) {
        Set<Session> group = channels.get(channel);
        if (group != null) {
            group.remove(session);
            if (group.isEmpty()) {
                channels.remove(channel);
            }
        }
    }

    /**
     * Get all sessions of a channel.
     *
     * @param channel A hash of a channel.
     * @return A set of sessions.
     */
    public Set<Session> getSessions(final String channel) {
        return channels.get(channel);
    }

}
