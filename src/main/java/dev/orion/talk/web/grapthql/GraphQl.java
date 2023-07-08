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
package dev.orion.talk.web.grapthql;

import java.util.List;

import org.eclipse.microprofile.graphql.Description;
import org.eclipse.microprofile.graphql.GraphQLApi;
import org.eclipse.microprofile.graphql.Mutation;
import org.eclipse.microprofile.graphql.Query;

import dev.orion.talk.adapters.controllers.ServiceController;
import dev.orion.talk.adapters.persistence.entity.ChannelEntity;
import dev.orion.talk.adapters.persistence.entity.MessageEntity;
import io.smallrye.mutiny.Uni;
import jakarta.inject.Inject;

/**
 * GraphQl.
 */
@GraphQLApi
public class GraphQl {

    /**
     * Service controller.
     */
    @Inject
    private ServiceController controller;

    /**
     * Get all Messages from the service.
     *
     * @return List of Messages.
     */
    @Query("allMessages")
    @Description("Get all Messages from the service")
    public Uni<List<MessageEntity>> getAllMessages() {
        return controller.getAllMessages();
    }

    /**
     * Create a Message throught Graphql.
     *
     * @param channel Channel to create.
     * @return Channel created.
     */
    @Mutation
    public Uni<MessageEntity> createMessage(
        final String text,
        final String userHash,
        final String channelHash) {
        return controller.createMessage(text, userHash, channelHash);
    }

    /**
     * Create a Channel throught Graphql.
     *
     * @param channel Channel to create.
     * @return Channel created.
     */
    @Mutation
    public Uni<ChannelEntity> createChannel(final ChannelEntity channel) {
        return controller.addChannel(channel);
    }

}
