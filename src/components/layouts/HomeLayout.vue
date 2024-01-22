<template>
  <div>
    <h3 class="text-base font-semibold leading-6 text-gray-900 px-4">
      Vue d'ensemble
    </h3>
    <dl
      v-if="data_loaded"
      class="mt-5 grid grid-cols-1 divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow md:grid-cols-3 md:divide-x md:divide-y-0"
    >
      <div
        v-for="item in stats"
        :key="item.name"
        class="px-4 py-5 sm:p-6"
      >
        <dt class="text-base font-normal text-gray-900">
          {{ item.name }}
        </dt>
        <dd class="mt-1 flex items-baseline justify-between md:block lg:flex">
          <div class="flex items-baseline text-2xl font-semibold text-dark-blue">
            {{ item.stat }} <span class="ml-2 text-sm font-medium text-gray-500">{{ item.unit }}</span>
          </div>
        </dd>
      </div>
    </dl>
  </div>
</template>


<script>
import axios from 'axios';

// const 

export default {
  data () {
    return {
      results: {},
      data_loaded: false,
      stats: []
    };
  },
  mounted () {
    this.getHomePageInfo();
  },
  methods: {
    getHomePageInfo: function () {
      axios.get('https://be-companies.tintamarre.be/api/stats')
        .then(response => {
          this.data_loaded = true;
          this.stats = response.data.data;
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style>

</style>
