import { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import api from "../api/api";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const res = await api.get("/expenses");
        setExpenses(res.data);
      } catch (err) {
        console.error("Failed to fetch expenses:", err);
      }
    };

    fetchExpenses();
  }, []);

  // Group by category
  const categoryMap = {};
  expenses.forEach((exp) => {
    categoryMap[exp.category] = (categoryMap[exp.category] || 0) + exp.amount;
  });

  // Group by month
  const monthMap = {};
  expenses.forEach((exp) => {
    const month = new Date(exp.date).toLocaleString("default", { month: "short" });
    monthMap[month] = (monthMap[month] || 0) + exp.amount;
  });

  const pieData = {
    labels: Object.keys(categoryMap),
    datasets: [
      {
        data: Object.values(categoryMap),
        backgroundColor: ["#f87171", "#60a5fa", "#34d399", "#fbbf24", "#c084fc"],
      },
    ],
  };

  const barData = {
    labels: Object.keys(monthMap),
    datasets: [
      {
        label: "Monthly Expenses",
        data: Object.values(monthMap),
        backgroundColor: "#60a5fa",
      },
    ],
  };

  return (
    <div className="min-h-screen p-6 text-white">
      <h2 className="text-3xl font-bold mb-6 text-center">Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white/10 p-4 rounded-lg shadow-lg backdrop-blur">
          <h3 className="text-xl font-semibold mb-4">Expenses by Category</h3>
          <Pie data={pieData} />
        </div>

        <div className="bg-white/10 p-4 rounded-lg shadow-lg backdrop-blur">
          <h3 className="text-xl font-semibold mb-4">Monthly Expenses</h3>
          <Bar data={barData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
