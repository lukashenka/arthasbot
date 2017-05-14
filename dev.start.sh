#!/usr/bin/env bash

DOCKER_COMPOSE="docker-compose
--project-name chatbot
-f docker-compose.yml"

$DOCKER_COMPOSE build

$DOCKER_COMPOSE up
