---
layout: default
title: Create Channel
parent: Use Cases
nav_order: 4
---

## Create Channel

* A client sends a text, user hash and the channel hash to the service. Note: if
  the user hash or channel hash does not exist, the service will create in the
  data base.
* The service verifies if user hash and channel hash are note empty, persist the
  data and returns the a JSON object representing a message.

## GraphQL

The channel only can be created using GraphQL. The following example shows how
through a mutation in `/graphql` endpoint.

  * Example of request:

    ```shell
        curl  -X POST \
            'http://localhost:8080/graphql' \
            --header 'Accept: */*' \
            --header 'User-Agent: Thunder Client (https://www.thunderclient.com)' \
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
