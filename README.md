# Facebook Clone Backend

## Overview

This repository contains the backend code for a Facebook clone. The authentication module has been completed, and work is in progress for additional features.

## Table of Contents

- [Authentication](#authentication)
- [Features in Progress](#features-in-progress)
- [Setup](#setup)

## Authentication

The authentication module has been successfully implemented. Users can register, log in, and their sessions are securely managed. The system uses [Token-based authentication](https://jwt.io/introduction/) for secure user sessions.

### Endpoints:

- **POST /auth/signup**

  - Register a new user.
  - Request body: `{ "name": "example", "password": "securepassword",email:email }`

- **POST /auth/signin**

  - Log in an existing user.
  - Request body: `{ "email": "email", "password": "securepassword" }`

- **Post /auth/forgotpass**

  - Request a new pass.

- **GET /auth/forgotpass/verify**

  - Get new pass

  **GET /auth/confirm**

  - Confirm Email
  - **POST /auth/signup**
  - Register a new user.
  - Request body: `{ "name": "example", "password": "securepassword",email:email }`

## Posts

### Endpoints:

- **POST /post**

  - Create New Post

- **GET /post**

  - Get all post of a User.

- **GET /post/id**

  - Get a single post

  **DELETE /post/id**

  - Delete a post

  **PUT /post/id**

  - Update the post

## Comments

### Endpoints:

- **POST /comment/:id**

  - Create New Comment

- **GET /comment**

  - Get all comment of a User.

- **GET /comment/id**

  - Get a single post comments

  **DELETE /comment/id**

  - Delete a comment

  **PATCH /post/id**

  - Update the comment

## Likes

### Endpoints:

- **POST /:id/like**

  - Like the post

  **DELETE /:id/removelike**

  - Remove the like

## Friends

### Endpoints:

- **POST /friends/:Receiverid**

  - Send a friend request

- **POST /friends/receive/:id**

  - Accept Friend Request.

- **GET /friends**

  - Get all requests

  **DELETE /friends/id**

  - Delete a request

## Features in Progress

- **News Feed:**
  - Displaying News Feed .

## Setup

To set up the project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone git@github.com:Ryrahul/Facebook-Clone-Backend.git
   ```

##Install dependencies:

```bash
cd facebook-clone-backend
npm install
npm start
```
