# Expense Tracker API

## Prerequisites

To run this application, ensure you have the following environment variables set up in a `.env` file:

- `MONGO_URI`: Your MongoDB connection string.
- `JWT_KEY`: A secret key for signing JWT tokens.

Example `.env` file:

```env
MONGO_URI=your_mongodb_connection_string
JWT_KEY=your_secret_key
```

## Overview

This API allows users to manage their expenses. 
Users can create, read, update, and delete expenses, as well as filter expenses based on various criteria such as date ranges and categories as well while ensuring user privacy via JWT authentication

## Endpoints

### Create an Expense

**URL:** `/expenses`

**Method:** `POST`

**Description:** Create a new expense.

**Request Body:**
```json
{
  "description": "Description of the expense",
  "amount": 100.00,
  "category": "Groceries",
  "date": "2024-05-31"
}
```

**Responses:**
- `201 Created`: Expense created successfully.
- `400 Bad Request`: Missing required fields.
- `500 Internal Server Error`: Something went wrong when adding the expense.

---

### Get All Expenses

**URL:** `/expenses/all`

**Method:** `GET`

**Description:** Retrieve all expenses for the authenticated user.

**Responses:**
- `200 OK`: List of all expenses.
- `404 Not Found`: No expenses found.
- `500 Internal Server Error`: Something went wrong when getting all expenses.

---

### Get Last Week's Expenses

**URL:** `/expenses/lastweek`

**Method:** `GET`

**Description:** Retrieve all expenses from the last week.

**Responses:**
- `200 OK`: List of last week's expenses.
- `500 Internal Server Error`: Something went wrong when getting last week's expenses.

---

### Get Expenses by Date Range

**URL:** `/expenses/getbydate`

**Method:** `GET`

**Description:** Retrieve expenses within a specific date range.

**Query Parameters:**
- `startDate`: Start date of the range (YYYY-MM-DD).
- `endDate`: End date of the range (YYYY-MM-DD).

**Responses:**
- `200 OK`: List of expenses within the specified date range.
- `400 Bad Request`: Missing start or end date.
- `500 Internal Server Error`: Something went wrong when getting expenses by date.

---

### Get Expenses by Category

**URL:** `/expenses/category/:category`

**Method:** `GET`

**Description:** Retrieve expenses of a specific category.

**Path Parameters:**
- `category`: The category to filter by (e.g., Groceries, Leisure, Electronics).

**Responses:**
- `200 OK`: List of expenses in the specified category.
- `400 Bad Request`: Missing category.
- `500 Internal Server Error`: Something went wrong when getting expenses by category.

---

### Update an Expense

**URL:** `/expenses/update/:id`

**Method:** `PATCH`

**Description:** Update an existing expense.

**Path Parameters:**
- `id`: The ID of the expense to update.

**Request Body:**
- Fields to update (e.g., `description`, `amount`, `category`, `date`).

**Responses:**
- `200 OK`: Expense updated successfully.
- `404 Not Found`: Expense not found.
- `500 Internal Server Error`: Something went wrong when updating the expense.

---

### Delete an Expense

**URL:** `/expense/deleteExpense/:id`

**Method:** `DELETE`

**Description:** Delete an existing expense.

**Path Parameters:**
- `id`: The ID of the expense to delete.

**Responses:**
- `200 OK`: Expense deleted successfully.
- `404 Not Found`: Expense not found.
- `500 Internal Server Error`: Something went wrong when deleting the expense.

---



## Models

### Expense

The `Expense` model should have the following fields:

- `userId` (required): Reference to the User.
- `description` (required): A brief description of the expense.
- `amount` (required): The amount spent.
- `category` (required): The category of the expense.
- `date` (required): The date of the expense.
- `description` (optional): Additional details about the expense.

---
Sure! Here is the documentation for the user routes and the environment variables setup:

---



## User Routes

### Create a User

**URL:** `/users`

**Method:** `POST`

**Description:** Create a new user.

**Request Body:**
- `username`: The username of the new user (required)
- `password`: The password of the new user (required)

**Responses:**
- `201 Created`: User created successfully.
- `409 Conflict`: User already exists.
- `500 Internal Server Error`: Something went wrong when creating the user.

### Login User

**URL:** `/users/login`

**Method:** `POST`

**Description:** Authenticate a user and provide a JWT token.

**Request Body:**
- `username`: The username of the user (required)
- `password`: The password of the user (required)

**Responses:**
- `200 OK`: Logged in successfully.
- `404 Not Found`: User doesn't exist. Please sign up to use this service.
- `409 Conflict`: Invalid password.
- `500 Internal Server Error`: Something went wrong when logging in.

### Logout User

**URL:** `/users/logout`

**Method:** `POST`

**Description:** Log out the authenticated user by clearing the JWT token cookie.

**Responses:**
- `200 OK`: Logged out successfully.

---

By following this documentation, you should be able to effectively integrate and utilize the user management endpoints in your Express application. Make sure to configure your `.env` file with the necessary MongoDB connection string and JWT secret key.