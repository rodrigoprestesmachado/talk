---
layout: default
title: Create Message
parent: Use Cases
nav_order: 3
---

## Create Message

### Normal flow

* A client sends a text, user hash and the channel hash to the service.
* The service receives and validates the data. The text must be not empty.
* The service creates the new message in the repository.
* The service returns the message object in JSON format.

### HTTP(S) endpoints

* /talk/message/create
* HTTP method: POST
* Consumes: application/x-www-form-urlencoded
* Produces: application/json
* Examples:

  * Example of request:

    ```shell
       curl -X 'POST' \
        'http://localhost:8080/talk/message/create' \
        -H 'accept: application/json' \
        -H 'Content-Type: application/x-www-form-urlencoded' \
        -d 'text=hello%20world&userHash=aaa&channelHash=bbb'
    ```

  * Example of response: Message in JSON (application/json;charset=UTF-8 ).

    ```json
       {
            "text": "hello world",
            "hash": "bf82d7ed-b224-49db-a080-fe82a268e875",
            "user": {
                "hash": "aaa"
            },
            "channel": {
                "name": "fdcde008-053a-4b4c-902b-c9a4646a476f",
                "hash": "bbb"
            }
        }
    ```

### Exceptions

In the use case layer, exceptions related with arguments will be
IllegalArgumentException. However, in the RESTful Web Service layer will be
transformed to Bad Request (HTTP 400).
