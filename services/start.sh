#!/bin/bash
# chmod +x start.sh

# Starting main services
docker-compose up -d --build

# Waiting for Mongo to be ready
echo "Waiting for MongoDB to be ready..."
sleep 5 

# Running populate script if the database is not populated
if [ ! -f ".populated" ]; then
  echo "Populating database..."
  docker compose run --rm \
    -e MONGO_URL=mongodb://admin:password@mongo:27017/shop?authSource=admin \
    product-cart-service \
    node ./src/populate/populate.js

  touch .populated
  echo "Database populated."
else
  echo "Database already populated. Skipping..."
fi
