# Todo List API

This project is a simple Todo List API built with Express and SQLite. It follows the MVC (Model-View-Controller) architecture pattern.

## Table of Contents

- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/todo-list-api.git
   ```

2. Navigate to the project directory:

   ```bash
   cd todo-list-api
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

### Running the Application

1. Start the server:

   ```bash
   npm run start
   ```

2. The server will be running at http://127.0.0.1:3000

## API Endpoints

### Create a Todo

- **URL:** `/api/todos`
- **Method:** `POST`
- **Body:**
  ```json
  {
    "title": "string",
    "content": "string"
  }
  ```

### Get All Todos

- **URL:** `/api/todos`
- **Method:** `GET`

### Get Todo by ID

- **URL:** `/api/todos/{id}`
- **Method:** `POST`

### Update Todo

- **URL:** `/api/todos`
- **Method:** `PUT`
- **Body:**
  ```json
  {
    "title": "string",
    "content": "string",
    "status": "string"
  }
  ```

### Delete Todo

- **URL:** `/api/todos/{id}`
- **Method:** `DELETE`

## Project Structure

```
.
├── controllers
│   └── todosController.js
├── models
│   └── todosModel.js
├── routes
│   └── todosRoutes.js
├── app.js
├── package.json
└── README.md
```

- **index.js:** The main application file where the Express app is configured and started.
- **controllers/:** Contains the controller logic for handling requests and responses.
- **models/:** Contains the database interaction logic.
- **routes/:** Contains the route definitions.
