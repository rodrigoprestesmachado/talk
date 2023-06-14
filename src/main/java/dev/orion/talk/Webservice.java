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

import dev.orion.talk.adapters.controllers.Controller;
import dev.orion.talk.adapters.persistence.entity.MessageEntity;
import io.smallrye.mutiny.Uni;
import jakarta.inject.Inject;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

@Path("/talk/message")
public class Webservice {

    @Inject
    Controller controller;

    @Path("/create/{text}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Uni<MessageEntity> createMessage(String text) {
        return controller.createMessage(text)
            .onItem().ifNotNull().transform(message -> message);
    }

}
