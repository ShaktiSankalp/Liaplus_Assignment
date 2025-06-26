import { useEffect, useState } from "react";
import api from "../api/api";
import { Link } from "react-router-dom";

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchExpenses = async () => {
    try {
      const res = await api.get("/expenses");
      setExpenses(res.data);
    } catch (err) {
      setError("Failed to load expenses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/expenses/${id}`);
      setExpenses((prev) => prev.filter((exp) => exp._id !== id));
    } catch (err) {
      alert("Delete failed");
    }
  };

  return (
    <div className="min-h-screen px-4 py-8 text-white">
      <h2 className="text-3xl font-bold mb-6 text-center">Your Expenses</h2>

      {loading ? (
        <p className="text-center text-gray-400">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-400">{error}</p>
      ) : expenses.length === 0 ? (
        <p className="text-center text-gray-500">No expenses found.</p>
      ) : (
        <div className="space-y-4 max-w-3xl mx-auto">
          {expenses.map((expense) => (
            <div
              key={expense._id}
              className="bg-white/10 backdrop-blur rounded-lg p-4 shadow flex justify-between items-center"
            >
              <div>
                <p className="text-lg font-semibold">₹{expense.amount}</p>
                <p className="text-sm text-gray-300">{expense.category}</p>
                <p className="text-xs text-gray-400">{new Date(expense.date).toDateString()}</p>
                <p className="text-sm mt-1">{expense.description}</p>
              </div>
              <div className="flex gap-2">
                <Link
                  to={`/edit/${expense._id}`}
                  className="bg-yellow-500 hover:bg-yellow-600 px-3 py-1 rounded text-sm"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(expense._id)}
                  className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 text-center">
        <Link
          to="/add"
          className="bg-blue-600 hover:bg-blue-700 transition px-6 py-2 rounded text-white font-semibold"
        >
          + Add New Expense
        </Link>
      </div>
    </div>
  );
};

export default ExpenseList;
