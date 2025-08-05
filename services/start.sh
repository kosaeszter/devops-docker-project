#!/bin/bash
# chmod +x start.sh

# Starting main services + scaling manually
docker compose up -d --build --scale product-cart-service=2 --scale customer-service=2


echo "Waiting for MongoDB to be ready..."
sleep 5 

# Running populate script if the database is not populated
POPULATED=$(docker exec mongo-product mongosh -u admin -p password --authenticationDatabase admin --quiet --eval 'db = db.getSiblingDB("shop"); db.products.countDocuments()' | tr -d '\r')

if [ "$POPULATED" -eq 0 ]; then
  echo "Populating database..."
  docker compose run --rm \
    -e MONGO_URL=mongodb://admin:password@mongo-product:27017/shop?authSource=admin \
    product-cart-service \
    node ./src/populate/populate.js

  echo "Database populated."
else
  echo "Database already populated. Skipping..."
fi
