# To-Do App
This app allows uers to create, view, update and delete their To-Do Tasks.

## Installation
1. Clone the repository to your local machine:

```
https://github.com/pichsophaneatdy/To-Do-App.git
```
2. Navigate to the project directory

```
cd To-Do-App
```

3. Install the required dependencies:

```
npm install
```

## Configuration

1. Create a .env file in the root directory of the project
2. Set the environment variables in the `.env` file

```
MONGODB_URI=your-mongodb-connection-string
```

Replace `your-mongodb-connection-string` with your MongoDB connection string.

## Running the App

To start the app, run the following command:

```
npm start
```

The Apollo Server will start running at http://localhost:4000/.

## Built With
<ul>
  <li>Apollo Server</li>
  <li>GraphQL</li>
  <li>MongoDB</li>
  <li>TypeScript</li>
</ul>

## Database Schema

The To-Do App uses MongoDB as its database, and the data is organized using the following schema:

### Task

- `id` (ID, required): A unique identifier for each task.
- `task` (String, required): The title or name of the task.
- `description` (String, default: "No detail"): A description of the task. If not provided, the task will have no description.
- `isCompleted` (Boolean, default: false): Indicates whether the task is completed (true) or not (false). If not specified, the default value is set to false.

Each task in the database follows this schema, and the Apollo Server's GraphQL API allows users to interact with the tasks using queries and mutations.

### Example Task Data

Here's an example of how a task is represented in the database:

```json
{
  "id": "603f650e1c9d440000deed2a",
  "task": "Buy groceries",
  "description": "Get milk, eggs, and bread",
  "isCompleted": false
}


   
