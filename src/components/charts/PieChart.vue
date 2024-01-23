<template>
  <Pie
    id="my-chart-id"
    :options="chartOptions"
    :data="chartData"
  />
</template>
    
<script>
import { Pie } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale } from 'chart.js';
    
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);
    
export default {
  name: 'PieChart',
  components: { Pie },
  //   props: {
  //     data: {
  //       type: Object,
  //       required: true
  //     }
  //   },    
  data() {
    return {
      chartData: {
        labels: ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs'],
        datasets: [
          {
            backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
            data: [40, 20, 80, 10]
          }
        ]
      },
      chartOptions: {
        responsive: true 
      }
    };
  }
};
</script>
    