##  Application Architecture & Flow

###  User Flow

1. **Registration & Login**:

   * New users can register at `/register`
   * Login at `/login` returns a JWT token stored in localStorage

2. **Protected Routes**:

   * Authenticated users can access `/`, `/add`, `/edit/:id`, `/dashboard`
   * Token is attached to every request via Axios interceptor

3. **Expense CRUD**:

   * Expenses belong to individual users (via user ID in MongoDB)
   * Auth routes protected using middleware `requireAuth`

4. **Dashboard & Visualization**:

   * Users see total expenses
   * Pie chart for category distribution
   * Bar chart for monthly expenses

###  Backend Summary

* `server.js` is the entry point
* `config/db.js` handles MongoDB connection
* `routes/` contains route handlers split into `auth.js` and `expenses.js`
* `middleware/authMiddleware.js` protects routes using JWT
* `models/` includes Mongoose schemas for users and expenses

###  Frontend Summary

* Uses React functional components
* Context API for auth state
* Tailwind for design
* Axios handles API requests
* Modular folder structure (components, pages, context, etc.)

---

##  Features Summary

| Feature               | Status |
| --------------------- | ------ |
| Register/Login        | ✅      |
| Auth-Protected Routes | ✅      |
| Expense CRUD          | ✅      |
| Data Visualization    | ✅      |
| Responsive UI         | ✅      |


