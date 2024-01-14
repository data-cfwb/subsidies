<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div v-if="data_loaded">
      <h2>{{ company.EnterpriseNumber }}</h2>
      <h2>{{ company.denomination }}</h2>
      <h2>{{ company.addresses }}</h2>
      <h2>{{ company.type_entreprise_fr }}</h2>

      <h2>{{ company.status }}</h2>
      <div>
        {{ company.links }}
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
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
