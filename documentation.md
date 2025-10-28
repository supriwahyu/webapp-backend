Here’s a clean and developer-friendly **API Documentation** based on your NestJS route logs:

---

# 🧩 **API Documentation**

## 📦 **Base URL**

```
http://localhost:3000/api
```

---

## 💬 **ChatController** (`/api/chat`)

### 1. **Create Chat**

**Endpoint:**

```
POST /api/chat
```

**Description:**
Create a new chat session between users.

**Request Body:**

```json
{
  "participants": ["<userId1>", "<userId2>"]
}
```

**Response:**

```json
{
  "success": true,
  "chat": {
    "_id": "string",
    "participants": ["string"],
    "messages": []
  }
}
```

---

### 2. **Get Chat Messages**

**Endpoint:**

```
GET /api/chat/:chatId
```

**Description:**
Retrieve all messages for a specific chat.

**Path Parameter:**

| Name   | Type   | Required | Description        |
| ------ | ------ | -------- | ------------------ |
| chatId | string | ✅        | The ID of the chat |

**Response Example:**

```json
{
  "_id": "string",
  "participants": ["string"],
  "messages": [
    {
      "_id": "string",
      "sender": "string",
      "content": "string",
      "createdAt": "2025-10-28T00:00:00.000Z"
    }
  ]
}
```

---

### 3. **Send Message**

**Endpoint:**

```
POST /api/:chatId/sendMessage
```

**Description:**
Send a new message to a specific chat.

**Path Parameter:**

| Name   | Type   | Required | Description        |
| ------ | ------ | -------- | ------------------ |
| chatId | string | ✅        | The ID of the chat |

**Request Body:**

```json
{
  "sender": "string",
  "content": "string"
}
```

**Response Example:**

```json
{
  "success": true,
  "message": {
    "_id": "string",
    "sender": "string",
    "content": "string",
    "createdAt": "2025-10-28T00:00:00.000Z"
  }
}
```

---

## 🔐 **AuthController** (`/auth`)

### 1. **Login**

**Endpoint:**

```
POST /auth/login
```

**Description:**
Authenticate user and return a JWT token.

**Request Body:**

```json
{
  "email": "string",
  "password": "string"
}
```

**Response Example:**

```json
{
  "access_token": "jwt_token_string"
}
```

---

### 2. **Register**

**Endpoint:**

```
POST /auth/register
```

**Description:**
Register a new user.

**Request Body:**

```json
{
  "name": "string",
  "email": "string",
  "password": "string"
}
```

**Response Example:**

```json
{
  "success": true,
  "user": {
    "_id": "string",
    "name": "string",
    "email": "string"
  }
}
```

---

### 3. **Get Profile**

**Endpoint:**

```
GET /auth/profile
```

**Description:**
Retrieve the currently authenticated user’s profile.

**Headers:**

```
Authorization: Bearer <token>
```

**Response Example:**

```json
{
  "_id": "string",
  "name": "string",
  "email": "string"
}
```

---

## 👤 **UsersController** (`/api/user`)

### 1. **Create Profile**

**Endpoint:**

```
POST /api/createProfile
```

**Description:**
Create a user profile.

**Request Body:**

```json
{
  "userId": "string",
  "bio": "string",
  "avatar": "string"
}
```

**Response Example:**

```json
{
  "success": true,
  "profile": {
    "_id": "string",
    "userId": "string",
    "bio": "string",
    "avatar": "string"
  }
}
```

---

### 2. **Get Profile**

**Endpoint:**

```
GET /api/getProfile
```

**Description:**
Retrieve all user profiles or a specific one by query.

**Query Parameters (optional):**

| Name   | Type   | Description               |
| ------ | ------ | ------------------------- |
| userId | string | Filter profile by user ID |

**Response Example:**

```json
{
  "profiles": [
    {
      "_id": "string",
      "userId": "string",
      "bio": "string",
      "avatar": "string"
    }
  ]
}
```

---

### 3. **Update Profile**

**Endpoint:**

```
PUT /api/updateProfile
```

**Description:**
Update an existing user profile.

**Request Body:**

```json
{
  "userId": "string",
  "bio": "updated string",
  "avatar": "updated string"
}
```

**Response Example:**

```json
{
  "success": true,
  "message": "Profile updated successfully."
}
```

---

Would you like me to turn this into a **Swagger/OpenAPI 3.0 YAML** or **Postman Collection (JSON)** file for easier testing and sharing?
