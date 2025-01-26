# API Documentation

## GraphQL API Endpoints

### 1. Get User
- **Request**: 
  ```graphql
  query {
      user(id: "1") {
          id
          username
          email
      }
  }
  ```
- **Response**:
  ```json
  {
      "data": {
          "user": {
              "id": "1",
              "username": "testuser",
              "email": "test@example.com"
          }
      }
  }
  ```

### 2. Create User
- **Request**:
  ```graphql
  mutation {
      createUser(username: "testuser", email: "test@example.com", password: "password123") {
          id
          username
          email
      }
  }
  ```
- **Response**:
  ```json
  {
      "data": {
          "createUser": {
              "id": "1",
              "username": "testuser",
              "email": "test@example.com"
          }
      }
  }
  ```

### 3. Login User
- **Request**:
  ```graphql
  mutation {
      login(username: "testuser", password: "password123")
  }
  ```
- **Response**:
  ```json
  {
      "data": {
          "login": "your_jwt_token_here"
      }
  }
  ```

### 4. Get All Users
- **Request**:
  ```graphql
  query {
      getAllUsers {
          id
          username
          email
      }
  }
  ```
- **Response**:
  ```json
  {
      "data": {
          "getAllUsers": [
              {
                  "id": "1",
                  "username": "testuser",
                  "email": "test@example.com"
              }
          ]
      }
  }
  ```

Ensure to test the endpoints using the Postman collection provided.
