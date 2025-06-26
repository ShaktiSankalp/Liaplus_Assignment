import { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

const AddExpense = () => {
  const [expense, setExpense] = useState({
    amount: "",
    category: "",
    description: "",
    date: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setExpense({ ...expense, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await api.post("/expenses", expense);
      navigate("/"); // redirect to home or list after add
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white/10 p-8 rounded-lg shadow-xl backdrop-blur w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Add Expense</h2>
        {error && <p className="text-red-400 mb-4">{error}</p>}

        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={expense.amount}
          onChange={handleChange}
          required
          className="w-full p-2 mb-4 bg-white/20 rounded"
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={expense.category}
          onChange={handleChange}
          required
          className="w-full p-2 mb-4 bg-white/20 rounded"
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={expense.description}
          onChange={handleChange}
          className="w-full p-2 mb-4 bg-white/20 rounded"
        />
        <input
          type="date"
          name="date"
          value={expense.date}
          onChange={handleChange}
          required
          className="w-full p-2 mb-4 bg-white/20 rounded"
        />

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 p-2 rounded font-semibold"
        >
          Save Expense
        </button>
      </form>
    </div>
  );
};

export default AddExpense;
