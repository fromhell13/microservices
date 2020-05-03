#!/bin/sh
export NODE_ENV=development
docker-compose up --build -d

sh init_db.sh
