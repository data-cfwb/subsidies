<template>
  <Bar
    :data="data"
    :options="resolvedOptions"
  />
</template>

<script>
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

export default {
  name: 'BarChart',
  components: { Bar },
  props: {
    // { labels: [...], datasets: [{ label, data, backgroundColor }, ...] }
    data: {
      type: Object,
      required: true
    },
    // Full Chart.js options object. When omitted, falls back to a stacked
    // (or grouped, see `stacked`) responsive default.
    options: {
      type: Object,
      default: null
    },
    stacked: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    resolvedOptions() {
      if (this.options) return this.options;
      return {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: { stacked: this.stacked },
          y: { beginAtZero: true, stacked: this.stacked }
        }
      };
    }
  }
};
</script>
