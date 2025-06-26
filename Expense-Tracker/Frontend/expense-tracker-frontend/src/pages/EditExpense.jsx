import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/api";

const EditExpense = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    amount: "",
    category: "",
    description: "",
    date: "",
  });
  const [error, setError] = useState("");

  // Fetch expense data on mount
  useEffect(() => {
    const fetchExpense = async () => {
      try {
        const res = await api.get("/expenses");
        const expense = res.data.find((exp) => exp._id === id);
        if (expense) {
          setFormData({
            amount: expense.amount,
            category: expense.category,
            description: expense.description || "",
            date: expense.date.split("T")[0],
          });
        } else {
          setError("Expense not found");
        }
      } catch (err) {
        setError("Failed to load expense");
      }
    };

    fetchExpense();
  }, [id]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await api.put(`/expenses/${id}`, formData);
      navigate("/");
    } catch (err) {
      setError("Failed to update expense");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white/10 backdrop-blur p-8 rounded-lg shadow-lg w-full max-w-md text-white"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Edit Expense</h2>
        {error && <p className="text-red-400 mb-4">{error}</p>}

        <input
          type="number"
          name="amount"
          placeholder="Amount"
          className="w-full p-2 mb-4 bg-white/20 rounded"
          value={formData.amount}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          className="w-full p-2 mb-4 bg-white/20 rounded"
          value={formData.category}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="description"
          placeholder="Description"
          className="w-full p-2 mb-4 bg-white/20 rounded"
          value={formData.description}
          onChange={handleChange}
        />

        <input
          type="date"
          name="date"
          className="w-full p-2 mb-6 bg-white/20 rounded"
          value={formData.date}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="w-full bg-yellow-500 hover:bg-yellow-600 p-2 rounded font-semibold"
        >
          Update Expense
        </button>
      </form>
    </div>
  );
};

export default EditExpense;
