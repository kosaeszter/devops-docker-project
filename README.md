## HUNCUT GEMS WEBSHOP

## Overview
This webshop offers Hungarian-inspired accessories for tourists. Built with React for the frontend and Express.js for the backend, it provides a smooth shopping experience with dynamic product browsing, user management, and order handling. 

## Features
- **User Registration**: Users can register and place an order. 
- **Order Management**: Full CRUD (Create, Read, Update, Delete) functionality for order process.
- **Search Functionality**: Search products by keywords to quickly find relevant content.

## Tech Stack
- **Backend**: Express.js 
- **Frontend**: React.js with Vite
- **Database**: MongoDB

## Installation
### Prerequisites
- **Node.js (with npm)** >= v18
- **MongoDB** >= 6.0 


### Setup Steps
1. Clone the repository:
    ```bash
    git clone https://github.com/schuschii/huncut-gems
    ```
#### Server setup
2. Install dependencies:
    ```bash
    cd ./server
    npm install
    ```
3. Set up database connection:
    Copy the .env.sample and fill up the environment variable for your personal mongodb connection url.
    ```bash
    cp server/.env.sample server/.env
    ```
4. Populate the database:
    ```bash
    cd ./server
    npm run populate
    ```
5. Start the backend server:
    ```bash
    cd ./server
    npm run dev
    ```

#### Client setup
6. Install dependencies:
    ```bash
    cd ./client
    npm install
    ```
7. Running the code:
   ```bash
   cd ./client
   npm run dev
   ```

## License
This project is open source under the ISC license.

## Contact
For any inquiries or support, reach out:
- **GitHub**: [contact](https://github.com/schuschii/huncut-gems)
