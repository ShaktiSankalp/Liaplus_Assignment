import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
// import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import AddExpense from "./pages/AddExpense";
import ExpenseList from "./pages/ExpenseList";
import EditExpense from "./pages/EditExpense";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoutes";






function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <Navbar />
        <Routes>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />


      {/* protected routes */}
        <Route 
          path="/" 
          element={<ProtectedRoute>
          <ExpenseList />
          </ProtectedRoute>
          }
        />
          
        <Route
          path="/add"
          element={
            <ProtectedRoute>
              <AddExpense />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <ProtectedRoute>
              <EditExpense />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
          

        </Routes>
      </div>
    </Router>
  );
}

export default App;
