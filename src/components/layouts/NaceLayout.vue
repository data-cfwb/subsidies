<template>
  <div v-if="data_loaded">
    <HeaderPartial
      :title="'Statistiques pour le secteur ' + insights.code.Description"
    />
    <main>
      <div class="mx-auto max-w-7xl px-6 lg:px-8 mt-10">
        <div>
          <div class="px-4 sm:px-0">
            <h3 class="text-base font-semibold leading-7 text-gray-900">
              {{ insights.code.Description }}
            </h3>
            <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
              Détails sur le secteur "{{ insights.code.Description }}" en Belgique référencé par la Banque Carrefour des Entreprises (BCE) sous le code NACE {{ insights.code.Code }} ({{ insights.code.Category }}).
            </p>
          </div>
          <div class="mt-6 border-t border-gray-100">
            <dl class="divide-y divide-gray-100">
              <div class="px-2 py-2 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-0">
                <dt class="text-sm font-medium leading-12 text-gray-900">
                  Nombre d'entreprises dans le secteur en tant que code principal ou secondaire
                </dt>
                <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 text-right">
                  {{ insights.enterprises_total }}
                </dd>
              </div>
              <div class="px-4 py-6 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-0">
                <dt class="text-sm font-medium leading-6 text-gray-900">
                  Nombre d'entreprises dans le secteur subventionnées par la Fédération Wallonie-Bruxelles
                </dt>
                <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 text-right">
                  {{ insights.enterprises_subsidized }} ({{ Math.round(insights.enterprises_subsidized / insights.enterprises_total * 100) }}%)
                </dd>
              </div>
              <div class="px-4 py-6 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-0">
                <dt class="text-sm font-medium leading-6 text-gray-900">
                  Montant total des subventions sur le secteur {{ insights.code.Description }} (en €)
                </dt>
                <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 text-right">
                  {{ $filters.formatToEuros(insights.subsidies_total) }}
                </dd>
              </div>
            </dl>
          </div>
        </div>

    
        <div class="mt-6 border-t border-gray-100">
          <dl class="divide-y divide-gray-100">
            <div
              v-for="subsidy in insights.all_enterprises"
              :key="subsidy"
              class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0"
            >
              <dt class="text-sm font-medium leading-6 text-gray-900">
                {{ subsidy.denomination }} <br>
                <RouterLink
                  :to="/entreprises/ + subsidy.EnterpriseNumber"
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