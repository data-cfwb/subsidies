<template>
  <div class="">
    <h1>{{ msg }}</h1>
    <div v-if="data_loaded">
      <div class="md:flex">

        <div class="mt-4 md:mt-0 md:ml-6">
          <div class="uppercase tracking-wide text-sm text-indigo-600 font-bold">{{ company.EnterpriseNumber }}</div>
          <a href="#" class="block mt-1 text-lg leading-tight font-semibold text-gray-900 hover:underline">{{ company.type_entreprise_fr }}</a>
      
          <h2>{{ company.denomination }}</h2>
            <h2>{{ company.addresses }}</h2>
            <h2>{{ company.status }}</h2>
            
            <p class="mt-2 text-gray-600">  
    
              {{ company.links }}
          </p>
        </div>
    </div>
  </div> 
</div> 

</template>

<script>
import axios from 'axios'

export default {
  name: 'HelloWorld',
  props: {
    msg: String
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
      axios.get('https://be-companies.tintamarre.be/api/enterprises/random')
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
