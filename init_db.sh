#!/bin/sh

docker-compose run rooms-service knex migrate:latest --env development --knexfile app/knexfile.js
docker-compose run rooms-service knex seed:run --env development --knexfile app/knexfile.js
docker-compose run users-service knex migrate:latest --env development --knexfile app/knexfile.js
docker-compose run users-service knex seed:run --env development --knexfile app/knexfile.js
docker-compose run bookings-service knex migrate:latest --env development --knexfile app/knexfile.js
docker-compose run bookings-service knex seed:run --env development --knexfile app/knexfile.js
