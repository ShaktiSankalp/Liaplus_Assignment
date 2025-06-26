#  Expense Tracker - Full Stack Application

This project is a full-stack **Expense Tracker** application that allows users to register, log in, manage their expenses, and view their spending patterns through dynamic data visualizations.

---

##  Tech Stack

###  Frontend

* **React.js** (with Tailwind CSS for styling)
* React Router for navigation
* Axios for API calls

###  Backend

* **Node.js** with **Express.js**
* JWT for authentication
* MongoDB (via Mongoose)

---

##  Project Structure

```
project-root/
├── backend/
│   ├── server.js
│   ├── config/
│   │   └── db.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── expenses.js
│   ├── models/
│   │   ├── User.js
│   │   └── Expense.js
├── frontend/expense-tracker-frontend
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Home.jsx (Dashboard)
│   │   │   └── AddOrEditExpense.jsx
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── ExpenseList.jsx
│   │   │   └── Charts.jsx
│   │   ├── context/AuthContext.js
│   │   └── api/api.js
```

---

##  Setup Instructions

### 1. **Clone the repository**

```bash
https://github.com/ShaktiSankalp/Liaplus_Assignment
cd expense-tracker
```

### 2. **Install dependencies**

#### Backend

```bash
cd backend
npm install
```

#### Frontend

```bash
cd ../frontend/expense-tracker-frontend
npm install
```

### 3. **Environment Variables**

Create a `.env` file inside the `backend/` folder:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/expenses
JWT_SECRET=your_jwt_secret_key
```

### 4. **Start the app**

#### Start MongoDB locally

Use MongoDB Compass or run:

```bash
mongod
```

#### Start Backend

```bash
cd backend
npm run dev
```

#### Start Frontend

```bash
cd frontend
cd expense-tracker-frontend
npm start
```

### 5. **Test on Postman**

Make requests to:

* `POST /auth/register`
* `POST /auth/login`
* `GET/POST/PUT/DELETE /expenses` (Require JWT token)

Or use the frontend at `http://localhost:3000`

---

