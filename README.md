# 75waychatserver

75waychatserver is a chat application server built with **Node.js** and **TypeScript**. It provides real-time messaging functionality and utilizes **MySQL** as the database to store user data and chat messages.

## Features

- **Real-Time Messaging:** Uses WebSockets (Socket.IO) to provide real-time communication between users.
- **User Authentication:** User registration and login functionality with JWT-based authentication.
- **Message History:** Stores chat history in MySQL, so users can view their previous conversations.
- **User Management:** Allows users to register, log in, and update their profile information.
- **Multi-User Support:** Supports one-on-one and group chat functionality.

## Technologies Used

- **Node.js** - Server-side runtime environment
- **TypeScript** - Superset of JavaScript for type safety and better development experience
- **MySQL** - Relational database for storing user data and chat messages
- **Socket.IO** - Real-time bi-directional event-based communication
- **JWT (JSON Web Token)** - Token-based authentication
- **bcryptjs** - Password hashing for secure user authentication

## Prerequisites

Before you start, ensure you have the following installed:

- **Node.js** (v20 or higher)
- **MySQL** (v5.7 or higher)
- **npm** (v7 or higher)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/75waychatserver.git
2. Run following command:
  ```bash
  npm install
