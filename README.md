# Microservices Practices

## Author
Zalizan Zolkipali @ February 2020

## Architecture

| Name             | Service | Container        | Tech                 |
|------------------|---------|------------------|----------------------|
| Rooms API        | rooms   | rooms-service    | Node, Express        |
| Users API        | users   | users-service    | Node, Express        |
| Booking API      | bookings| bookings-service | Node, Express        |
| Rooms DB         | rooms   | rooms-db         | Postgres, Knex       |
| Users DB         | users   | users-db         | Postgres, Knex       |
| Bookings DB      | bookings| bookings-db      | Postgres, Knex       |
| API Gateway      | gateway | gateway-service  | Express Gateway      |
| Queue Message    | n/a     | rabbitmq-service | RabbitMQ             |
| Email            | email   | email-service    | Nodemailer           |
| Functional Test  | Test    | n/a              | Chai, Mocha          |

### Setup

1. Download [Docker](https://docs.docker.com/docker-for-mac/install/) (if necessary)

2. Make sure you are using a Docker version >= 17:

    ```sh
    $ docker -v
    Docker version 17.03.0-ce, build 60ccb22
    ```

### Build and Run the App
```sh
$ sh start.sh
```

#### Sanity Check

Test out the following services...

##### (1) Rooms - http://localhost:8080/api
| Endpoint              | HTTP Method | CRUD Method | Result         |
|-----------------------|-------------|-------------|----------------|
| /rooms/ping           | GET         | READ        | `pong`         |
| /rooms/               | GET         | READ        | get all rooms  |
| /rooms/id/:rooms_id   | GET         | READ        | get room by id |
| /rooms/book/:rooms_id | POST        | CREATE      | add reservation|

##### (2) Users - http://localhost:8080/api
| Endpoint                  | HTTP Method | CRUD Method | Result                   |
|---------------------------|-------------|-------------|--------------------------|
| /users/ping               | GET         | READ        | `pong`                   |
| /users/                   | GET         | READ        | get all users            |
| /users/id/:users_id       | GET         | READ        | get user by id           |
| /users/decrement/:user_id | GET         | READ        | decrease user bonus point|
| /users/increment/:user_id | GET         | READ        | increase user bonus point|

##### (3) Bookings - http://localhost:8080/api
| Endpoint              | HTTP Method | CRUD Method | Result            |
|-----------------------|-------------|-------------|-------------------|
| /bookings/ping        | GET         | READ        | `pong`            |
| /bookings/            | GET         | READ        | get all bookings  |

##### (4) Functional Tests
```sh
$ sh test.sh
```

#### Commands

To stop the containers:

```sh
$ docker-compose stop
```

To bring down the containers:

```sh
$ docker-compose down
```