<template>
  <div id="chart-wrapper">
    <Bar
      id="my-chart-id"
      :options="chartOptions"
      :data="chartData"
    />
  </div>
</template>
  
<script>
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
  
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);
  
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
        datasets: this.data.datasets
      },
      chartOptions: {
        responsive: true,
        scales: {
          x: {
            beginAtZero: true,
            stacked: true
          },
          y: {
            beginAtZero: true,
            stacked: true
          }
        }
      }
    };
  }
};
</script>
  
<style scoped>
  #chart-wrapper {
    display: inline-block;
    position: relative;
    width: 100%;
  }
</style>