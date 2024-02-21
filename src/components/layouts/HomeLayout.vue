<template>
  <div v-if="data_loaded">
    <HeaderPartial
      :title="'Accueil'"
    />
    <main>
      <div class="mx-auto max-w-7xl px-6 lg:px-8 mt-10">
        <dl
        
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
                {{ $filters.numberFormatRound(item.stat) }} <span class="ml-2 text-sm font-medium text-gray-500">{{ item.unit }}</span>
              </div>
            </dd>
          </div>
        </dl>
      </div>
    </main>
  </div>
  <div v-else>
    <LoadingFwb />
  </div>
</template>


<script>
import axios from 'axios';

export default {
  components: {

  },
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
      // api-subventions.datawb.be
      axios.get('https://api-subventions.datawb.be/api/stats')
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
