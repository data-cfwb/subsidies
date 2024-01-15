<template>
    <Bar
      id="my-chart-id"
      :options="chartOptions"
      :data="chartData"
      aria-describedby="my-data-table"
    />

    <code>
      {{ data }}
    </code>
  </template>
  
  <script>
  import { Bar } from 'vue-chartjs'
  import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
  
  ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
  
  export default {
    name: 'BarChart',
    components: { Bar },
    props: {
      data: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        chartData: {
          labels: this.data.labels,
          datasets: [ { 
            label: 'Subventions par année',
            backgroundColor: '#9DBC98',
            data: this.data.values 
          } ]
        },
        chartOptions: {
          responsive: true
        }
      }
    }
  }
  </script>
  