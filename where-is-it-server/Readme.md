# Backend for WhereIsIt

---

## Purpose

The backend for **WhereIsIt** powers the functionality of the lost and found platform. It handles user authentication, post management, item recovery tracking, and all server-side operations. It is built using Node.js, Express.js, and MongoDB.

---

## Key Features

1. **Authentication**:

   - JWT-based authentication for secure API access.
   - Cookie-based token storage for seamless client-server communication.

2. **Lost and Found Post Management**:

   - Add, update, delete, and retrieve posts.
   - Search and filter posts by title, location, type (Lost/Found), and category.
   <!-- - Pagination support for large datasets. -->

3. **Recovery Tracking**:

   - Track items marked as recovered.
   - Store recovery details such as recovery location, date, and user information.

4. **Secure Private Routes**:

   - Middleware to verify JWT tokens and protect sensitive routes.

5. **CORS Support**:
   - Configured to handle cross-origin requests securely for both local development and production environments.

---

## Technologies Used

1. **Node.js** - JavaScript runtime environment.
2. **Express.js** - Framework for building APIs.
3. **MongoDB** - NoSQL database for data storage.
4. **JWT (jsonwebtoken)** - For authentication.
5. **cookie-parser** - For handling cookies.
6. **dotenv** - For managing environment variables.
7. **Cors** - For handling cross-origin requests.

---

## API Endpoints

### **Authentication**:

- **POST** `/jwt`

  - Generate a JWT token for the user.

- **POST** `/logout`
  - Clear the authentication token from cookies.

### **Post Management**:

- **POST** `/addPost`

  - Add a new lost or found post.

- **GET** `/allPosts`

  - Retrieve all posts with optional search, filter, and pagination parameters.

- **GET** `/postDetails/:id`

  - Retrieve details of a specific post (requires token).

- **GET** `/posts/:email`

  - Retrieve posts by a specific user (requires token).

- **PUT** `/updatePost/:id`

  - Update a specific post (requires token).

- **DELETE** `/post/:id`
  - Delete a specific post (requires token).

### **Recovered Items**:

- **POST** `/addRecovered`

  - Mark an item as recovered and save the recovery details.

- **GET** `/allRecovered/:email`
  - Retrieve all recovered items for a specific user (requires token).

---

## Environment Variables

Create a `.env` file in the root directory and add the following variables:

```env
PORT=5000
DB_USER=your_mongodb_username
DB_PASS=your_mongodb_password
ACCESS_TOKEN_SECRET=your_jwt_secret

```
