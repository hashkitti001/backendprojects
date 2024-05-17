**To-Do List API**

**Functional Requirements:**

1. **List Tasks Endpoint**:
   - Endpoint: `/tasks`
   - Method: GET
   - Description: Returns a list of tasks.
   - Parameters:
     - Optional:
       - `status`: Filter tasks by status (e.g., "completed", "pending").
   - Response: JSON array of tasks.

2. **Get Single Task Endpoint**:
   - Endpoint: `/tasks/{taskId}`
   - Method: GET
   - Description: Returns a single task specified by its ID.
   - Parameters:
     - `taskId`: ID of the task.
   - Response: JSON object representing the task.

3. **Create Task Endpoint**:
   - Endpoint: `/tasks`
   - Method: POST
   - Description: Creates a new task.
   - Request Body: JSON object representing the new task.
   - Response: JSON object representing the created task.

4. **Update Task Status Endpoint**:
   - Endpoint: `/task/{taskId}`
   - Method: PATCH
   - Description: Updates the status of a single task specified by its ID.
   - Parameters:
     - `id`: ID of the task.
   - Request Body: JSON object representing the updated status.
   - Response: JSON object representing the updated task.

5. **Delete Task Endpoint**:
   - Endpoint: `/task/{taskId}`
   - Method: DELETE
   - Description: Deletes a single task specified by its ID.
   - Parameters:
     - `id`: ID of the task.
   - Response: Success message indicating deletion.

6. **Authentication Endpoints**:
   - **Register User Endpoint**:
     - Endpoint: `/users/register`
     - Method: POST
     - Description: Register a new user account.
     - Request Body: JSON object containing username and password.
     - Response: Success message indicating successful registration.

   - **Login Endpoint**:
     - Endpoint: `/users/login`
     - Method: POST
     - Description: Authenticate user and obtain an access token.
     - Request Body: JSON object containing username and password.
     - Response: JSON object containing access token.
  - **Logout Endpoint**
     - **Login Endpoint**:
     - Endpoint: `/users/logout`
     - Method: POST
     - Description: Logout user 
     - Request Body: Cookie containing access token
     - Response: JSON object containing status of logout

**Tech Stack:**

- **Backend Framework**: Express (Node.js)
- **Database**: MySQL via Sequelize ORM


**Additional Notes:**

- Implemented basic authentication middleware to protect sensitive operations like creating, updating, and deleting tasks.
- Validate incoming data to ensure data integrity and security.
- Thoroughly document API endpoints, including request and response formats, error handling, and authentication requirements.
- Test API endpoints rigorously using tools like Postman or automated testing frameworks.
- Consider deploying the API to a cloud platform like Heroku, AWS, or Azure for accessibility and scalability.