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
package dev.orion.talk.adapters.controllers;

import java.util.UUID;

import org.modelmapper.ModelMapper;

import dev.orion.talk.adapters.persistence.entity.ChannelEntity;
import dev.orion.talk.adapters.persistence.entity.MessageEntity;
import dev.orion.talk.adapters.persistence.entity.UserEntity;
import dev.orion.talk.adapters.persistence.repository.ChannelRepository;
import dev.orion.talk.adapters.persistence.repository.MessageRepository;
import dev.orion.talk.adapters.persistence.repository.UserRepository;
import dev.orion.talk.model.Message;
import dev.orion.talk.usecase.MessageUC;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

/**
 * Controller.
 */
@ApplicationScoped
public class Controller {

    /**
     * Message repository.
     */
    @Inject
    private MessageRepository messageRepo;

    /**
     * User repository.
     */
    @Inject
    private UserRepository userRepo;

    /**
     * Channel repository.
     */
    @Inject
    private ChannelRepository channelRepo;

    /**
     * Message use case.
     */
    private MessageUC uc = new MessageUC();

    /**
     * Model mapper.
     */
    private ModelMapper mapper = new ModelMapper();

    /**
     * Creates a message.
     *
     * @param text        A {@link String} with the message text
     * @param userHash    A {@link String} with the user hash
     * @param channelHash A {@link String} with the channel hash
     * @return A {@link Uni} of {@link MessageEntity}
     */
    public Uni<MessageEntity> createMessage(final String text,
            final String userHash, final String channelHash) {
        return findUser(userHash)
            .onItem().transformToUni(user -> {
                return findChannel(channelHash)
                    .onItem().ifNotNull().transformToUni(channel -> {
                        // Create message
                        Message message = uc.createMessage(text);
                        // Map message to message entity
                        MessageEntity messageEntity = mapper.map(
                            message, MessageEntity.class);

                        // Verify if channel has a name
                        channel.setName(channel.getName() == null
                            ? UUID.randomUUID().toString()
                            : channel.getName());

                        // Set message channel and user
                        messageEntity.setChannel(channel);
                        messageEntity.setUser(user);

                        // Persist message
                        return messageRepo.persistMessage(messageEntity)
                            .onItem().ifNotNull().transform(m -> m);
                    });
            });
    }

    /**
     * Finds a user by hash.
     *
     * @param userHash A {@link String} hash of the user
     * @return A {@link Uni} of {@link UserEntity}
     */
    private Uni<UserEntity> findUser(final String userHash) {
        return userRepo.find("hash = ?1", userHash).firstResult()
            .onItem().ifNotNull().transform(user -> user)
            .onItem().ifNull().continueWith(() -> {
                UserEntity user = new UserEntity();
                user.setHash(userHash);
                return user;
            });
    }

    /**
     * Finds a channel by hash.
     *
     * @param channelHash A {@link String} hash of the user
     * @return A {@link Uni} of {@link ChannelEntity}
     */
    private Uni<ChannelEntity> findChannel(final String channelHash) {
        return channelRepo.find("hash = ?1", channelHash).firstResult()
            .onItem().ifNotNull().transform(user -> user)
            .onItem().ifNull().continueWith(() -> {
                ChannelEntity channel = new ChannelEntity();
                channel.setHash(channelHash);
                return channel;
            });
    }

}
