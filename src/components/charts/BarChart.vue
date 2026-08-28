<template>
  <!-- Relative, full-size wrapper: required by Chart.js responsive sizing.
       Callers that need a specific height wrap this in a fixed-height container
       and pass options with maintainAspectRatio:false. -->
  <div style="position: relative; width: 100%; height: 100%">
    <Bar
      :data="data"
      :options="resolvedOptions"
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
      // Default: keep maintainAspectRatio true so the chart sizes itself from its
      // width even when the parent has no fixed height (avoids the resize loop that
      // "Canvas exceeds max size" errors come from).
      return {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
          x: { stacked: this.stacked },
          y: { beginAtZero: true, stacked: this.stacked }
        }
      };
    }
  }
};
</script>
