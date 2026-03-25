import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js'
import { Doughnut, Pie } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

function DashboardCharts({ data }) {

  const doughnutData = {
    labels: ['Active Computers', 'Inactive Computers'],
    datasets: [
      {
        data: [
          data.activeComputers,
          data.totalComputers - data.activeComputers,
        ],
        backgroundColor: ['#22c55e', '#e5e7eb'],
      },
    ],
  }

  const pieData = {
    labels: ['Active Users', 'Available Computers'],
    datasets: [
      {
        data: [
          data.activeUserCount,
          data.totalComputers - data.activeUserCount,
        ],
        backgroundColor: ['#3b82f6', '#f97316'],
      },
    ],
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">

      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-2">Computer Usage</h2>
        <Doughnut data={doughnutData} />
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-2">User vs System</h2>
        <Pie data={pieData} />
      </div>

    </div>
  )
}

export default DashboardCharts