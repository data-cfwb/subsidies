<template>
  <div v-if="data_loaded">
    <h1>insights</h1>

    {{ insights.code.Description }}

    Nombre d'entreprises: {{ insights.enterprises_total }} <br>
    Nombre d'entreprises subventionnées: {{ insights.enterprises_subsidized }}<br>
    Montants subventionnés sur le secteur {{ insights.code.Description }}: {{ insights.subsidies_total }}<br>
    {{ insights.top_20 }}
  </div>
</template>
  
<script>
import axios from 'axios';

export default {
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
      axios.get(`https://be-companies.tintamarre.be/api/codes/Nace${this.category}/${this.code}/FR/insights`)
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