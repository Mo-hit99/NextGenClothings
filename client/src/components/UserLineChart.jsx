import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import ShimmerSkeleton from './ShimmerSkeleton';

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

const UserLineChart = ({ userData }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (userData && userData.length > 0) {
      // Transform userData to match chart.js data format
      const labels = userData.map((data) => data.month); // Extract months
      const countData = userData.map((data) => data.userCount); // Extract counts

      // Example: We can have both bar (countData) and line (could be an average or another metric)
      const averageData = countData.map((count) => count / 2); // Just an example for line data

      setChartData({
        labels,
        datasets: [
          {
            label: 'User Count (Bar)',
            data: countData,
            fill: false,
            borderColor: 'rgba(75,192,192,1)',
            backgroundColor: 'rgba(75,192,192,0.2)', // Bar color
            borderWidth: 1,
            type: 'bar', // Specifies this dataset as a bar chart
          },
          {
            label: 'Average (Line)',
            data: averageData,
            fill: false,
            borderColor: 'rgba(153,102,255,1)',
            backgroundColor: 'rgba(153,102,255,0.2)', // Line color
            tension: 0.1,
            type: 'line', // Specifies this dataset as a line chart
          },
        ],
      });
    }
  }, [userData]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'User Data Over Time',
      },
    },
  };

  if (chartData === null) return (<ShimmerSkeleton/>); // Wait until chartData is set

  return <Line data={chartData} options={options} />;
};

export default UserLineChart;
