---
layout: default
title: List Message
parent: Features
nav_order: 5
---

## List Message

* A client the hash of the channel to the service.
* The service returns a JSON object representing a list of messages
  of the channel.

## GraphQL

The channel only can be created using GraphQL. The following example shows how
through a mutation in `/graphql` endpoint.

  * Example of request:

    ```shell
       curl  -X POST \
       'http://localhost:8080/graphql' \
       --header 'Accept: */*' \
       --header 'Content-Type: application/json' \
       --data-raw '{"query":"query getMessages {\n  getMessages(channelHash: \"fd82cefb-3d3c-4e41-a560-24e42e35770b\") {\n    text\n    hash\n    channel{\n      name\n      hash\n    }\n  }\n}","variables":"{}"}'
    ```

  * Example of mutation:

    ```json
        query getMessages {
            getMessages(channelHash: "fd82cefb-3d3c-4e41-a560-24e42e35770b") {
                text
                hash
                channel{
                    name
                    hash
                }
            }
        }
    ```

* Example of answer:

    ```json
        {
            "data": {
                "getMessages": [
                    {
                        "text": "Hello World",
                        "hash": "893e95af-72aa-441d-8a08-cf0cd5312dd4",
                        "channel": {
                            "name": "My channel",
                            "hash": "fd82cefb-3d3c-4e41-a560-24e42e35770b"
                        }
                    }
                ]
            }
        }
    ```
