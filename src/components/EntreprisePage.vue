<template>
  <div class="">
    <h1>{{ msg }}</h1>
    <div v-if="data_loaded">
      <div class="md:flex">
        {{ be_number }}

        <div class="mt-4 md:mt-0 md:ml-6">
          <div class="uppercase tracking-wide text-sm text-indigo-600 font-bold">{{ company.EnterpriseNumberBE }}</div>
             

            <BarChart :data="company.SubsidiesPerYearForChart" />

         
          <ul>
            <li v-for="subsidy in company.Subsidies" :key="subsidy">
              <p>{{ subsidy.Annee }}: {{ subsidy.Ministre }} {{ subsidy.Competence }}</p>
            </li>
          </ul>
        
        </div>
    </div>
  </div> 
  <div v-else>
    <p>Loading...</p>
  </div>
</div> 

</template>

<script>
import axios from 'axios'
import BarChart from './charts/BarChart.vue'

export default {
  props: {
    msg: String,
    be_number: String
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
  created() {
    this.$watch(
      () => this.$route.params,
      () => {
        this.data_loaded = false
        this.getSubsidies()
        // reload Chart
      }
    )
  },
  methods: {
    getSubsidies: function () {
      axios.get('https://be-companies.tintamarre.be/api/enterprises/' + this.be_number)
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
