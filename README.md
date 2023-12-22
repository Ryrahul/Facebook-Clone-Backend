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

## Features in Progress

The following features are currently in progress:

- **Friend Requests:**

  - Sending and receiving friend requests.

- **Likes and Comments:**
  - Adding likes and comments to posts.

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
