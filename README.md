# DashDo

A simple full-stack application that combines **analytics dashboards** with a **task manager**.  
Built with **Next.js**, **TailwindCSS**, and a lightweight in-memory API.

---

## 🚀 Running Locally

### Prerequisites

- Node.js (v18 or higher)
- pnpm or npm/yarn

Steps

1. Clone the repository:

    ```bash
    git clone https://github.com/john-roufaeil/dashdo.git
    ```

    ```bash
    cd dashdo
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Run the development server:

    ```bash
    npm run dev
    ```

4. Open in your browser:

    ```http://localhost:3000```

🌐 Deployed Version

You can try the live app here:
[dashdo.vercel.app](dashdo.vercel.app)  

Note: the todo app uses in-memory file to store the tasks. Modifying the todo tasks will crash on the live app.

## 🛠 Tech Stack

Frontend: Next.js, React, TailwindCSS, Recharts

Backend API: Next.js API routes (Node.js + in-memory JSON)

Deployment: Vercel

## 📌 API Endpoints

### I. Get All Todos

Request: ```GET /api/tasks```

Response Example:

```json
[
  {
    "id": 23482739450291,
    "title": "Buy groceries",
    "description": "Milk, Bread, Eggs",
    "completed": false
  }
  {
    "id": 1755939453718,
    "title": "Write README",
    "description": "Write steps of running",
    "completed": true
  }
]
```

### II. Get Single Todo

Request: ```GET /api/tasks/:id```

Request Example: ```GET /api/tasks/1755939453718```

Response Example:

```json
{
    "todo": {
        "id": 1755939453718,
        "title": "Write README",
        "description": "Write steps of running",
        "completed": false
    }
}
```

Invalid Request Example: ```GET /api/tasks/-1```

Invalid Response Example:

```json
{
    "error": "Todo not found"
}
```

### III. Create Todo

Request: ```POST /api/tasks```

Request Body Example:

```json
{
    "title": "Do dishes",
    "description": "Clean all remaining dishes"
}
```

Response Example:

```json
{
    "todo": {
        "id": 1755941399531,
        "title": "Do dishes",
        "description": "Clean all remaining dishes",
        "completed": false
    }
}
```

Invalid Request Body Example:

```json
{
    "description": "Clean all remaining dishes"
}
```

Invalid Response Example:

```json
{
    "error": "Title is required"
}
```

### IV. Update Todo

Request: ```PUT /api/tasks/:id```

Request Example: ```PUT /api/tasks/1755931240150```

Request Body Example:

```json
{
  "title": "Finish homework",
  "description": "Math, Physics, and Chemistry"
}
```

Response Body Example:

```json
{
    "todo": {
        "id": 1755931240150,
        "title": "Finish homework",
        "description": "Math, Physics, and Chemistry",
        "completed": false
    }
}
````

Request Example: ```PUT /api/tasks/1755931240150```

Request Body Example:

```json
{
  "completed": true
}
```

Response Body Example:

```json
{
    "todo": {
        "id": 1755931240150,
        "title": "Finish homework",
        "description": "Math, Physics, and Chemistry",
        "completed": true
    }
}
````

### V. Delete Todo

Request: ```DELETE /api/tasks/:id```

Request Example: ```DELETE /api/tasks/1755942104225```

Response Example:

```json
{
    "success": true
}
```
