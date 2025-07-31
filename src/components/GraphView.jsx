// src/components/GraphView.jsx
import React from "react";
import PropTypes from "prop-types";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const GraphView = ({ data, chartTitle = "Data Visualization" }) => {
  if (!data || data.length === 0) 
    return <p className="text-gray-500">No data to display.</p>;

  const chartData = {
    labels: data.map((item) => item.label),
    datasets: [
      {
        label: "Value",
        data: data.map((item) => item.value),
        backgroundColor: "#3b82f6",
        borderRadius: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: chartTitle},
    },
  };

  return <Bar data={chartData} options={options} />;
};

// PropTypes for better type safety
GraphView.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    })
  ).isRequired,
  chartTitle: PropTypes.string,
};

export default GraphView;
