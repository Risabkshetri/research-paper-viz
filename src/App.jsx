import { useState, useEffect } from 'react'
import { Pie, Bar, Line } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement } from 'chart.js'
import researchpaper from './assets/data.json'
import './App.css'

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement)

const documentTypes = ['Conference Paper', 'Article', 'Review', 'Editorial', 'Letter', 'Book Chapter', 'Erratum', 'Note', 'Book']

function App() {
  const [documentTypeCounts, setDocumentTypeCounts] = useState({})
  const [chartType, setChartType] = useState('pie')

  useEffect(() => {
    const counts = documentTypes.reduce((acc, type) => {
      acc[type] = researchpaper.filter(paper => paper['Document Type'] === type).length
      return acc
    }, {})
    setDocumentTypeCounts(counts)
  }, [])

  const chartData = {
    labels: documentTypes,
    datasets: [
      {
        data: documentTypes.map(type => documentTypeCounts[type]),
        backgroundColor: [
          '#6495ED', '#DC143C', '#32CD32', '#FFA07A', '#8B008B',
          '#4B0082', '#FFC0CB', '#7FFD00', '#FF69B4'
        ],
        borderColor: '#FFFFFF',
        borderWidth: 1,
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: 'Document Types Distribution',
      },
    },
  }

  const renderChart = () => {
    switch (chartType) {
      case 'pie':
        return <Pie data={chartData} options={options} />
      case 'bar':
        return <Bar data={chartData} options={options} />
      case 'line':
        return <Line data={chartData} options={options} />
      default:
        return <Pie data={chartData} options={options} />
    }
  }

  return (
    <>
      <nav>
        <button onClick={() => setChartType('pie')}>Pie Chart</button>
        <button onClick={() => setChartType('bar')}>Bar Chart</button>
        <button onClick={() => setChartType('line')}>Line Chart</button>
      </nav>
      <h1>Research Paper Document Types</h1>
      <div style={{ width: '600px', height: '600px', margin: 'auto' }}>
        {renderChart()}
      </div>
    </>
  )
}

export default App
