#!/bin/bash
echo "Stopping and removing containers, networks"

docker compose down --remove-orphans

echo "Docker environment cleaned up."