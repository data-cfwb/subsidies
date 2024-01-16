<template>
  <div class="">
    {{ beNumber }}
    <div v-if="data_loaded">
      <div class="md:flex">
        <div class="mt-4 md:mt-0 md:ml-6">
          <div class="uppercase tracking-wide text-sm text-indigo-600 font-bold">
            {{ company.EnterpriseNumberBE }}
          </div>            

          {{ company.Denominations }}

          <hr>

          {{ company.Addresses }}
          <hr>
          {{ company.Contacts }}
          <hr>
          {{ company.Establishments }}
          <hr>
          {{ company.Activities }}
          <hr>
          {{ company.StatusLabel }}
          <hr>
          {{ company.JuridicalSituationLabel }}
          <hr>
          {{ company.TypeEntrepriseLabel }}
          <hr>
          {{ company.JuridicalFormCACLabel }}

          {{ company.ExternalLinks }}

          <BarChart :data="company.SubsidiesPerYearForChart" />
          <ul>
            <li
              v-for="subsidy in company.Subsidies"
              :key="subsidy"
            >
              {{ subsidy.Year }}: {{ subsidy.MinistreName }} {{ subsidy.Compétence }} {{ subsidy.AmountInEuros }}
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
import axios from 'axios';
import BarChart from './charts/BarChart.vue';

export default {
  components: {
    BarChart
  },
  props: {
    beNumber: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      company: {},
      data_loaded: false
    };
  },
  mounted () {
    this.getSubsidies();
  },
  created() {
    this.$watch(
      () => this.$route.params,
      () => {
        this.data_loaded = false;
        this.getSubsidies();
        // reload Chart
      }
    );
  },
  methods: {
    getSubsidies: function () {
      axios.get('https://be-companies.tintamarre.be/api/enterprises/' + this.beNumber)
        .then(response => {
          this.company = response.data.data;
          this.data_loaded = true;
          console.log(this.company);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
};
</script>
