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

    
        <div class="mt-6 border-t border-gray-100">
          <h2 class="text-base font-semibold leading-6 text-gray-900 uppercase">
            Liste des organisations subventionnées
          </h2>
          <dl class="divide-y divide-gray-100">
            <div
              v-for="subsidy in insights.all_enterprises"
              :key="subsidy"
              class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0"
            >
              <dt class="text-sm font-medium leading-6 text-gray-900">
                {{ subsidy.denomination }} <br>
                <RouterLink
                  :to="/enterprises/ + subsidy.EnterpriseNumber"
                >
                  {{ subsidy.EnterpriseNumber }}
                </RouterLink>
              </dt>
              <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 align-right">
                {{ $filters.formatToEuros(subsidy.subsidies_sum) }}
              </dd>
            </div>
          </dl>
        </div>

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
// import PieChart from '../charts/PieChart.vue';

export default {
  components: {

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