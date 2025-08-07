# Blog API Documentation

## Authentication Endpoints

### POST /auth/register

Registers a new user.

**Request Body:**

*   `email` (string, required): The user's email address.
*   `password` (string, required): The user's password (must be at least 8 characters long).
*   `role` (string, optional): The user's role. Can be either "admin" or "user". Defaults to "user".

**Example Request:**

```json
{
  "email": "user@example.com",
  "password": "password123",
  "role": "user"
}
```

### POST /auth/login

Logs in a user.

**Request Body:**

*   `email` (string, required): The user's email address.
*   `password` (string, required): The user's password.

**Example Request:**

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**

*   Sets `accessToken` and `refreshToken` as cookies.

### POST /auth/refresh-token

Refreshes an access token.

**Request:**

*   Requires a valid `refreshToken` to be sent as a cookie.

**Response:**

*   Sets a new `accessToken` as a cookie.

### POST /auth/logout

Logs out a user.

**Request:**

*   Requires a valid `accessToken` to be sent as a cookie.

## User Endpoints

### GET /users/current

Gets the currently logged-in user's information.

**Authentication:**

*   Requires a valid `accessToken` to be sent as a cookie.
*   Accessible by `admin` and `user` roles.

### PUT /users/current

Updates the currently logged-in user's information.

**Authentication:**

*   Requires a valid `accessToken` to be sent as a cookie.
*   Accessible by `admin` and `user` roles.

**Request Body:**

*   `username` (string, optional): The user's new username.
*   `email` (string, optional): The user's new email address.
*   `password` (string, optional): The user's new password (must be at least 8 characters long).
*   `first_name` (string, optional): The user's first name.
*   `last_name` (string, optional): The user's last name.
*   `website` (string, optional): The user's website URL.
*   `facebook` (string, optional): The user's Facebook profile URL.
*   `instagram` (string, optional): The user's Instagram profile URL.
*   `linkedin` (string, optional): The user's LinkedIn profile URL.
*   `x` (string, optional): The user's X (formerly Twitter) profile URL.
*   `youtube` (string, optional): The user's YouTube channel URL.

### DELETE /users/current

Deletes the currently logged-in user's account.

**Authentication:**

*   Requires a valid `accessToken` to be sent as a cookie.
*   Accessible by `admin` and `user` roles.

### GET /users

Gets a list of all users.

**Authentication:**

*   Requires a valid `accessToken` to be sent as a cookie.
*   Accessible by `admin` role only.

**Query Parameters:**

*   `limit` (integer, optional): The maximum number of users to return (1-50).
*   `offset` (integer, optional): The number of users to skip.

### GET /users/:userId

Gets a specific user by their ID.

**Authentication:**

*   Requires a valid `accessToken` to be sent as a cookie.
*   Accessible by `admin` role only.

**URL Parameters:**

*   `userId` (string, required): The ID of the user to retrieve.

### DELETE /users/:userId

Deletes a specific user by their ID.

**Authentication:**

*   Requires a valid `accessToken` to be sent as a cookie.
*   Accessible by `admin` role only.

**URL Parameters:**

*   `userId` (string, required): The ID of the user to delete.

## Blog Endpoints

### POST /blogs

Creates a new blog post.

**Authentication:**

*   Requires a valid `accessToken` to be sent as a cookie.
*   Accessible by `admin` role only.

**Request:**

*   `Content-Type`: `multipart/form-data`

**Form Data:**

*   `title` (string, required): The title of the blog post.
*   `content` (string, required): The content of the blog post.
*   `status` (string, optional): The status of the blog post. Can be "draft" or "published". Defaults to "draft".
*   `banner_image` (file, required): The banner image for the blog post.

### GET /blogs

Gets a list of all blog posts.

**Authentication:**

*   Requires a valid `accessToken` to be sent as a cookie.
*   Accessible by `admin` and `user` roles.

**Query Parameters:**

*   `limit` (integer, optional): The maximum number of blog posts to return (1-50).
*   `offset` (integer, optional): The number of blog posts to skip.

### GET /blogs/user/:userId

Gets a list of all blog posts by a specific user.

**Authentication:**

*   Requires a valid `accessToken` to be sent as a cookie.
*   Accessible by `admin` and `user` roles.

**URL Parameters:**

*   `userId` (string, required): The ID of the user.

**Query Parameters:**

*   `limit` (integer, optional): The maximum number of blog posts to return (1-50).
*   `offset` (integer, optional): The number of blog posts to skip.

### GET /blogs/:slug

Gets a single blog post by its slug.

**Authentication:**

*   Requires a valid `accessToken` to be sent as a cookie.
*   Accessible by `admin` and `user` roles.

**URL Parameters:**

*   `slug` (string, required): The slug of the blog post.
