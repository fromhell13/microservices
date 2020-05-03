export NODE_ENV=test

docker-compose run users-service knex migrate:latest --env test --knexfile app/knexfile.js
docker-compose run users-service knex seed:run --env test --knexfile app/knexfile.js
docker-compose run rooms-service knex migrate:latest --env test --knexfile app/knexfile.js
docker-compose run rooms-service knex seed:run --env test --knexfile app/knexfile.js

fails=''

inspect() {
  if [ $1 -ne 0 ] ; then
    fails="${fails} $2"
  fi
}


docker-compose run users-service npm test 
inspect $? users-service 

docker-compose run rooms-service npm test
inspect $? rooms-service

if [ -n "${fails}" ];
  then
    echo "Tests failed: ${fails}"
    exit 1
  else
    echo "Tests passed!"
    exit 0
fi