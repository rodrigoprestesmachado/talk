---
layout: default
title: Create Channel
parent: Features
nav_order: 4
---

## Create Channel

* A client sends the name of the channel to the service.
* The service verifies if the name is note empty, persist the
  data and returns the a JSON object representing a channel.

## GraphQL

The channel only can be created using GraphQL. The following example shows how
through a mutation in `/graphql` endpoint.

  * Example of request:

    ```shell
        curl  -X POST \
            'http://localhost:8080/graphql' \
            --header 'Accept: */*' \
            --data-raw '{"query":"mutation addChannel {\n  createChannel(channel: {\n    name: \"My channel\"\n  }\n  )\n  {\n    name\n    hash\n    messages {\n      hash\n      text\n    }\n  }\n}","variables":"{}"}'
    ```

  * Example of mutation:

    ```json
        mutation addChannel {
            createChannel(channel: {
                name: "My channel"
            })
            {
                name
                hash
                messages {
                    hash
                    text
                }
            }
        }
    ```

* Example of answer:

    ```json
        {
            "data": {
                "createChannel": {
                    "name": "My channel",
                    "hash": "6077a738-77ce-404d-8568-ef08374fd0bd",
                    "messages": []
                }
            }
        }
    ```
