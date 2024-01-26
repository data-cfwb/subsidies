<template>
  <div v-if="data_loaded">
    <HeaderPartial
      :title="insights.code.Description"
      subtitle="Statistiques pour le secteur"
    />
    <main>
      <div class="mx-auto max-w-7xl px-6 lg:px-8 mt-10">
        <div>
          <div class="px-4 sm:px-0">
            <p class="mt-1 max-w-2xl text-md leading-6 text-gray-700">
              Détails sur le secteur "{{ insights.code.Description }}" en Belgique référencé par la Banque Carrefour des Enterprises (BCE) sous le code NACE {{ insights.code.Code }} ({{ insights.code.Category }}).
            </p>
          </div>

          <div class="mx-auto max-w-7xl px-6 lg:px-8 mt-10">
            <dl
        
              class="mt-5 grid grid-cols-1 divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow md:grid-cols-3 md:divide-x md:divide-y-0"
            >
              <div

                class="px-4 py-5 sm:p-6"
              >
                <dt class="text-base font-normal text-gray-900">
                  Organisations dans le secteur en tant que code principal ou secondaire
                </dt>
                <dd class="mt-1 flex items-baseline justify-between md:block lg:flex">
                  <div class="flex items-baseline text-2xl font-semibold text-dark-blue">
                    {{ insights.enterprises_total }} <span class="ml-2 text-sm font-medium text-gray-500">organisations</span>
                  </div>
                </dd>
              </div>

              <div

                class="px-4 py-5 sm:p-6"
              >
                <dt class="text-base font-normal text-gray-900">
                  Organisations du secteur subventionnées par la FWB
                </dt>
                <dd class="mt-1 flex items-baseline justify-between md:block lg:flex">
                  <div class="flex items-baseline text-2xl font-semibold text-dark-blue">
                    {{ insights.enterprises_subsidized }}  <span class="ml-2 text-sm font-medium text-gray-500">({{ Math.round(insights.enterprises_subsidized / insights.enterprises_total * 100) }}%)</span>
                  </div>
                </dd>
              </div>

              <div

                class="px-4 py-5 sm:p-6"
              >
                <dt class="text-base font-normal text-gray-900">
                  Montant total des subventions sur le secteur (en €)
                </dt>
                <dd class="mt-1 flex items-baseline justify-between md:block lg:flex">
                  <div class="flex items-baseline text-2xl font-semibold text-dark-blue">
                    {{ $filters.formatToEuros(insights.subsidies_total) }}
                    <span class="ml-2 text-sm font-medium text-gray-500" />
                  </div>
                </dd>
              </div>
            </dl>
          </div>
        </div>
        <EnterprisesTable :enterprises="insights.all_enterprises" />
    
      
        <!-- <PieChart /> -->
      </div>
    </main>
  </div>
  <div v-else>
    <LoadingFwb />
  </div>
</template>
  
<script>
import axios from 'axios';
import EnterprisesTable from '../partials/EnterprisesTable.vue';
// import PieChart from '../charts/PieChart.vue';

export default {
  components: {
    EnterprisesTable
    // PieChart
  },
  props: {
    category: {
      type: String,
      required: true
    },
    code: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      insights: {},
      data_loaded: false
    };
  },
  mounted () {   
    this.getNaceData();
  },
  methods: {
    getNaceData () {
      axios.get(`https://be-companies.tintamarre.be/api/codes/${this.category}/${this.code}/FR/insights`)
        .then(response => {
          this.insights = response.data;
          this.data_loaded = true;
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
};

</script>