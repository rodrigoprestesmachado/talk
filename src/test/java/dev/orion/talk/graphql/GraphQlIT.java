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
package dev.orion.talk.graphql;

import static io.restassured.RestAssured.given;

import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;

import io.quarkus.test.junit.QuarkusTest;
import io.restassured.http.ContentType;
import io.vertx.core.cli.annotations.Description;
import jakarta.ws.rs.core.Response;

/**
 * Integration tests for GraphQL queries and mutations.
 */
@QuarkusTest
class GraphQlIT {

    /**
     * Test case for creating a channel through GraphQL.
     */
    @Test
    @Order(1)
    @Description("Create a Channel")
    void createChannel() {
        String query = """
        mutation addChannel {
            createChannel(channel: {
                name: \"My channel\",
            })
            {
                name
                hash
            }
        }
        """;
        given().when()
            .contentType(ContentType.JSON)
            .body(query)
            .post("/graphql")
        .then()
            .log().body()
            .statusCode(Response.Status.OK.getStatusCode());
    }

    /**
     * Test case for querying all messages through GraphQL.
     */
    @Test
    @Order(2)
    @Description("Query all messages through GraphQL")
    void queryAllMessages() {
        String query = """
        query allMessages {
            allMessages {
                hash
                text
                user {
                    hash
                }
                channel {
                    hash
                    name
                }
            }
        }
        """;
        given().when()
            .contentType(ContentType.JSON)
            .body(query)
            .post("/graphql")
        .then()
            .statusCode(Response.Status.OK.getStatusCode());
    }

}
