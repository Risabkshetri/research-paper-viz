import { useState, useEffect } from 'react'
import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import researchpaper from './assets/data.json'
import './App.css'

ChartJS.register(ArcElement, Tooltip, Legend)

const documentTypes = ['Conference Paper', 'Article', 'Review', 'Editorial', 'Letter', 'Book Chapter', 'Erratum', 'Note', 'Book']

function App() {
  const [documentTypeCounts, setDocumentTypeCounts] = useState({})

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
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
          '#FF9F40', '#FF6384', '#C9CBCF', '#7CFC00'
        ],
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

  return (
    <>
      <h1>Research Paper Document Types</h1>
      <div style={{ width: '600px', height: '600px', margin: 'auto' }}>
        <Pie data={chartData} options={options} />
      </div>
    </>
  )
}

export default App
