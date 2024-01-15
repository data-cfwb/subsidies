<template>
  <div class="">
    <h1>{{ msg }}</h1>
    <div v-if="data_loaded">
      <div class="md:flex">

        <div class="mt-4 md:mt-0 md:ml-6">
          <div class="uppercase tracking-wide text-sm text-indigo-600 font-bold">{{ company.EnterpriseNumberBE }}</div>
          <a href="#" class="block mt-1 text-lg leading-tight font-semibold text-gray-900 hover:underline">{{ company.type_entreprise_fr }}</a>
      
          <h2>{{ company.Contacts }}</h2>
          <h2>{{ company.Addresses }}</h2>
          <h2>{{ company.status }}</h2>
            
          <p class="mt-2 text-gray-600">  
              {{ company.links }}       
          </p>

          <ul>
            <li v-for="key, ext_link in company.ExternalLinks" :key="ext_link">
               {{ key.service_name }}: <a :href="key.href">{{ key.href }}</a>
            </li>
          </ul>

          <ul>
            <li v-for="subsidy in company.SubsidiesPerYear" :key="subsidy">
               {{ subsidy }}
            </li>

            <BarChart :data="company.SubsidiesPerYearForChart" aria-label="Sales figures for the years 2022 to 2024. Sales in 2022: 987, Sales in 2023: 1209, Sales in 2024: 825." />

          </ul>


          <code>
            {{ company }}
          </code>
        </div>
    </div>
  </div> 
</div> 

</template>

<script>
import axios from 'axios'
import BarChart from './charts/BarChart.vue'

export default {
  props: {
    msg: String
  },
  components: {
    BarChart
  },
  data () {
    return {
      company: {},
      data_loaded: false
    }
  },
  mounted () {
    this.getSubsidies()
  },
  methods: {
    getSubsidies: function () {
      axios.get('https://be-companies.tintamarre.be/api/enterprises/0419.172.434')
      .then(response => {
        this.company = response.data.data
        this.data_loaded = true
      })
      .catch(e => {
        console.log(e)
      })
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
