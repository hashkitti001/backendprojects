# Expense Tracker API

## Overview

This API allows users to manage their expenses. Users can create, read, update, and delete expenses, as well as filter expenses based on various criteria such as date ranges and categories.

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