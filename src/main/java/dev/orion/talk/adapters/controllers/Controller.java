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

import org.modelmapper.ModelMapper;

import dev.orion.talk.adapters.persistence.entity.MessageEntity;
import dev.orion.talk.adapters.persistence.repository.MessageRepository;
import dev.orion.talk.model.Message;
import dev.orion.talk.usecase.MessageUC;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

@ApplicationScoped
public class Controller {

    @Inject
    MessageRepository repo;

    MessageUC uc = new MessageUC();

    ModelMapper mapper = new ModelMapper();

    /**
     * Creates a message.
     *
     * @param text A {@link String} with the message text
     * @return A {@link Uni} of {@link MessageEntity}
     */
    public Uni<MessageEntity> createMessage(String text) {
        Message message = uc.createMessage(text);
        MessageEntity e = mapper.map(message, MessageEntity.class);
        return repo.persistMessage(e)
            .onItem().ifNotNull().transform(m -> m);
    }

}
