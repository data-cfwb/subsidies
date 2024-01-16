<template>
  <div class="">
    <div v-if="data_loaded">
      <div class="md:flex">
        <div class="mt-4 md:mt-0 md:ml-6">
          <h1 class="block mt-1 text-lg leading-tight font-medium text-black hover:underline">
            {{ listDenominations }}
          </h1>
          <div class="uppercase tracking-wide text-sm text-indigo-600 font-bold">
            {{ company.EnterpriseNumberBE }}
          </div>            
        
          <hr>
          <h2 class="block mt-1 text-lg leading-tight font-medium text-black hover:underline">
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

          <h2 class="block mt-1 text-lg leading-tight font-medium text-black hover:underline">
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
          <h2 class="block mt-1 text-lg leading-tight font-medium text-black hover:underline">
            Establishments
          </h2>
          <div>
            <ul>
              <li
                v-for="est in company.Establishments"
                :key="est"
              >
                {{ est.EnterpriseNumber }}: {{ est.StartDate }}
              </li>
            </ul>
          </div>

          <hr>
          <h2 class="block mt-1 text-lg leading-tight font-medium text-black hover:underline">
            Activities
          </h2>
          <div>
            <ul>
              <li
                v-for="nace in company.Activities"
                :key="nace"
              >
                {{ nace.activity }} {{ nace.NaceCode }}: {{ nace.labels }}
              </li>
            </ul>
          </div>
          <hr>
          {{ company.StatusLabel }}
          <hr>
          {{ company.JuridicalSituationLabel }}
          <hr>
          {{ company.TypeEntrepriseLabel }}
          <hr>
          {{ company.JuridicalFormCACLabel }}


          <BarChart :data="company.SubsidiesPerYearForChart" />
          <ul>
            <li
              v-for="subsidy in company.Subsidies"
              :key="subsidy"
            >
              {{ subsidy.Year }}: {{ subsidy.MinistreName }} {{ subsidy.Compétence }} {{ subsidy.AmountInEuros }} €
            </li>
          </ul>

          <h2>
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
