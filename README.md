# SmartCartShop

Welcome to the SmartCartShop!
Welcome to SmartCartShop! This project focuses on building the backend for an e-commerce website, a critical component for businesses in the electronics industry. By leveraging the power of Express.js and Sequelize, we aim to provide a robust and efficient backend that empowers businesses and consumers to engage in online buying and selling of electronic products.

## Table of Contents

- [Introduction](#Introduction)
- [Technologies Used](#TechnologiesUsed)
- [Getting Started](#getting-started)
- [Configuration](#Configuration)
- [Database Setup](#DatabaseSetup)
- [License](#license) -[Running the Application](#RunningtheApplication)

## Introduction

SmartCartShop aims to provide developers with a fundamental understanding of e-commerce site architecture. We challenge you to build the backend for an e-commerce site using Express.js and Sequelize to interact with a MySQL database.

## Technologies Used

- SmartCartShop leverages the following technologies to build a powerful and scalable backend system:

- Node.js: Provides a high-performance runtime environment for server-side applications, making it ideal for building a responsive and efficient backend.

- Express.js: A popular and lightweight web application framework for Node.js, simplifying the development of robust APIs and routes.

- MySQL Database: A reliable and scalable relational database management system to store and manage e-commerce data efficiently.

- Sequelize ORM: An Object-Relational Mapping (ORM) library for Node.js that simplifies database interactions.

- RESTful API: Follows RESTful API principles, providing a standardized and predictable way to interact with the system, making integration with frontend applications and third-party services easier.

## Getting Started

1. Clone the Repository
   git@github.com:Ninamahdawe/SmartCartShop.git
   cd cd smartcartshop.

2. Install Dependencies
   npm install

## Configuration

To connect to the database and configure environment-specific settings, create a .env file in the project root directory and add the necessary variables.

## Database Setup

SmartCartShop uses MySQL as its database. Ensure you have MySQL installed and running.

Create a MySQL database for SmartCartShop.

Update the .env file with your database credentials.

Initialize the database and create tables by running Sequelize migrations:

- npx sequelize-cli db:seed:all

Start the SmartCartShop backend server:

- npm start

## License

SmartCartShop is licensed under the MIT License. You are free to use, modify, and distribute this project as per the terms of the license.
