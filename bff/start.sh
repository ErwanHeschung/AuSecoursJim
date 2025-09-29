#!/bin/bash

source ../backend/framework.sh

echo "starting bff"
docker-compose --env-file ./.env.docker \
               --file docker-compose-bff.yml up -d