---
layout: default
title: Create Message
parent: Use Cases
nav_order: 1
---

## Create Message

### Normal flow

* A client sends a text.
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
            -d 'text=hello'
    ```

  * Example of response: Message in JSON.

    ```json
        {
            "id": 1,
            "text": "hello",
            "hash": "c7fee98c-8fbe-4824-af4c-899b5c7d6961"
        }
    ```

### Exceptions

In the use case layer, exceptions related with arguments will be
IllegalArgumentException. However, in the RESTful Web Service layer will be
transformed to Bad Request (HTTP 400).
