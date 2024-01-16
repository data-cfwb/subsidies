<template>
  <div class="">
    <div v-if="data_loaded">
      <div class="md:flex">
        <div class="mt-4 md:mt-0 md:ml-6">
          <h1 class="h1-main-title">
            {{ joinOnKey(company.Denominations, 'Denomination') }}
          </h1>
          <div class="companyNumber">
            {{ company.EnterpriseNumberBE }}
          </div>            
        
          <hr>
          <h2 class="h2-subtitle">
            Adresse(s)
          </h2>
          <div>
            <ul>
              <li
                v-for="address in company.Addresses"
                :key="address"
              >
                {{ address.StreetFR }} {{ address.HouseNumber }} {{ address.Box }}
                <br>
                {{ address.Zipcode }} {{ address.MunicipalityFR }}
              </li>
            </ul>
          </div>

          <h2 class="h2-subtitle">
            Contacts
          </h2>
          <div>
            <ul>
              <li
                v-for="contact in company.Contacts"
                :key="contact"
              >
                {{ contact.ContactType }}: 
                <span v-if="contact.ContactType == 'EMAIL'">
                  <a
                    :href="'mailto:' + contact.Value"
                  >{{ contact.Value }}</a>
                </span>
                <span v-if="contact.ContactType == 'WEB'"><a
                  :href="'https://' + contact.Value"
                >{{ contact.Value }}</a>
                </span>
                <span v-if="contact.ContactType == 'TEL'"><a
                  :href="'tel:' + contact.Value"
                >{{ contact.Value }}</a>
                </span>
              </li>
            </ul>
          </div>
          

          <hr>
          <h2 class="h2-subtitle">
            Activities
          </h2>
          <div>
            <ul>
              <li
                v-for="nace in company.Activities"
                :key="nace"
              >
                {{ nace.activity }} {{ nace.NaceCode }}:
                {{ joinOnKey(nace.labels, 'Description') }}
              </li>
            </ul>
          </div>
          <h2 class="h2-subtitle">
            Status
          </h2>
          <div>
            {{ joinOnKey(company.StatusLabel, 'Description') }}
          </div>
          <div>
            {{ joinOnKey(company.JuridicalSituationLabel, 'Description') }}
          </div>
          <div>
            {{ joinOnKey(company.JuridicalFormCACLabel, 'Description') }}
          </div>

          <hr>
          {{ company.TypeEntrepriseLabel }}

          <h2 class="h2-subtitle">
            Subsidies
          </h2>
          <div>
            <table class="table-auto">
              <thead>
                <tr>
                  <th>Année</th>
                  <th>Montant</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="subsidy in company.SubsidiesPerYear"
                  :key="subsidy"
                >
                  <td>{{ subsidy.year }}</td>
                  <td>{{ Math.round(subsidy.total) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        

          <BarChart :data="company.SubsidiesPerYearForChart" />
          <ul>
            <li
              v-for="subsidy in company.Subsidies"
              :key="subsidy"
            >
              {{ subsidy.Year }}: {{ subsidy.MinistreName }} {{ subsidy.Compétence }} {{ subsidy.AmountInEuros }} €
            </li>
          </ul>
          <h2 class="h2-subtitle">
            Establishments
          </h2>
          <div>
            <ul>
              <li
                v-for="estab in company.Establishments"
                :key="estab"
              >
                {{ estab.EnterpriseNumber }}: {{ estab.StartDate }}
              </li>
            </ul>
          </div>
          <h2 class="h2-subtitle">
            Liens externes
          </h2>
          <ul class="list-disc">
            <li
              v-for="key, link in company.ExternalLinks"
              :key="link"
            >
              <a
                :href="key.href"
                target="_blank"
              >{{ key.service_name }}</a>
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
  computed: {
    // join with a comma as separator
    listDenominations: function () {
      return this.company.Denominations.map(denomination => denomination.Denomination).join(' / ');
    }
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
    joinOnKey: function (array, key) {
      return array.map(item => item[key]).join(' / ');
    },
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
