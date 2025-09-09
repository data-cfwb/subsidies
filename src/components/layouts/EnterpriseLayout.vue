<template>
  <div
    v-if="data_loaded"
    class="col-span-12 py-5 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8"
  >
    <HeaderPartial
      :title="$filters.joinOnKey(company.Denominations, 'Denomination')"
      :subtitle="$filters.joinOnKey(company.Denominations, 'Type')"
      :tags="[$filters.getTranslation(company.StatusLabel, 'FR'), $filters.getTranslation(company.JuridicalSituationLabel, 'FR'), $filters.getTranslation(company.JuridicalFormCACLabel, 'FR'), company.Languages]"
    >
      <div class="py-2">
        <span class="font-bold">Numéro BCE: </span>
        <RouterLink
          :to="/enterprises/ + company.EnterpriseNumber"
          class="font-medium text-indigo-600 hover:text-indigo-500"
        >
          {{ company.EnterpriseNumberBE }}
        </RouterLink>
      </div>
    </HeaderPartial>
    <main>
      <!-- 2 column wrapper -->
      <div class="mx-auto w-full max-w-7xl grow lg:flex xl:px-2">
        <!-- main wrapper -->
        <div class="flex-1 xl:flex">
          <div class="px-4 py-6 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6">
            <!-- Main area -->
       
            <ActivitiesList
              v-if="company.Activities.length"
              :activities-per-type="ActivitiesMap"
            />

           

            <BarChart
              :data="transformDataForChart"
            />
          </div>
        </div>

        <div class="shrink-0 border-t border-gray-200 px-4 py-6 sm:px-6 lg:w-96 lg:border-l lg:border-t-0 lg:pr-8 xl:pr-6">
          <!-- Right column area -->

          <h2
            v-if="company.Contacts.length"
            class="text-base font-semibold leading-7 text-gray-900 uppercase py-3"
          >
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

          <h3 class="text-base font-semibold leading-7 text-gray-900 uppercase py-3">
            Adresse(s)
          </h3>
          <ul>
            <li
              v-for="address in company.Addresses"
              :key="address"
            >
              {{ address.StreetFR }} {{ address.HouseNumber }} {{ address.Box }}
              <br>
              {{ address.Zipcode }} {{ address.MunicipalityFR }}
            </li>

            <a
              type="button"
              class="rounded bg-gray-50 px-2 py-1 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
              :href="'https://www.openstreetmap.org/search?query=' + company.Addresses[0].StreetFR + ' ' + company.Addresses[0].HouseNumber + ' ' + company.Addresses[0].Zipcode + ' ' + company.Addresses[0].MunicipalityFR"
              target="_blank"
            >
              Voir sur une carte
            </a>
          </ul>
        </div>
      </div>
 
    
      <!-- {{ company.Languages }} -->
      <div class="mx-auto max-w-7xl px-6 lg:px-8 mt-2">
        <div class="w-1/2" />
     
        <h2 class="text-base font-semibold leading-7 text-gray-900 uppercase py-3">
          Les subventions par année octroyées par la Fédération Wallonie-Bruxelles
        </h2>
        <SubsidiesTablePerYear
          v-if="company.SubsidiesPerYear.length"
          :subsidies-per-year="company.SubsidiesPerYear"
        />
        <h2 class="text-base font-semibold leading-7 text-gray-900 uppercase py-3">
          Détails des subventions par année
        </h2>
        <SubsidiesTable :subsidies-per-year="company.SubsidiesMapByYear" />

      
        <h2 class="text-base font-semibold leading-8 text-gray-900 uppercase">
          Sources de données
        </h2>
        <ul class="list-disc list-inside">
          <li
            v-for="key, link in company.DataSourcesLinks"
            :key="link"
            class="px-2 text-sm font-medium hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2 focus:ring-offset-gray-50"
          >
            <a
              :href="key.href"
              target="_blank"
            >{{ key.service_name }}</a>
          </li>
        </ul>
        <h2 class="text-base font-semibold leading-8 text-gray-900 uppercase">
          Liens externes
        </h2>
        <ul class="list-disc list-inside">
          <li
            v-for="key, link in company.ExternalLinks"
            :key="link"
            class="px-2 text-sm font-medium hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2 focus:ring-offset-gray-50"
          >
            <a
              :href="key.href"
              target="_blank"
            >{{ key.service_name }}</a>
          </li>
        </ul>
      </div>
    </main>
  </div>
  <div v-else>
    <LoadingFwb />
  </div>
</template>
  

<script>
import axios from 'axios';

import BarChart from '../charts/BarChart.vue';
import SubsidiesTable from '../partials/SubsidiesTable.vue';
import ActivitiesList from '../partials/ActivitiesList.vue';
import SubsidiesTablePerYear from '../partials/SubsidiesTablePerYear.vue';

import { getColorFromCompetence } from '@/composables/getColorFromCompetence.js'; 

export default {
  components: {
    BarChart,
    SubsidiesTable,
    ActivitiesList,
    SubsidiesTablePerYear
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
    ActivitiesMap: function () {
      // group activities by activity
      let activities = {};
      this.company.Activities.forEach(activity => {
        if (!activities[activity.activity]) {
          activities[activity.activity] = {
            activity: activity.activity,
            labels: []
          };
        }
        activities[activity.activity].labels.push(activity);
      });
      return activities;
    },
    transformDataForChart: function () {
      const datasets = {};
      const labels = Array.from(new Set(this.company.SubsidiesPerYear.map(item => item.Year))).sort();

      for (const yearLabel of labels) {
        for (const competenceData of this.company.SubsidiesMapByYear[yearLabel] || []) {
          const competence = competenceData.Compétence;

          if (!datasets[competence]) {
            datasets[competence] = {
              label: competence,
              data: Array(labels.length).fill(0),
              // random from [red, green, blue, yellow]
              backgroundColor: getColorFromCompetence(competence),
            };
          }

          const index = labels.indexOf(yearLabel);
          datasets[competence].data[index] += competenceData.AmountInEuros;
        }
      }

      return {
        labels: labels,
        datasets: Object.values(datasets),
      };
    }


  },
  mounted () {
    this.getDataFromAPI();
  },
  created() {
    this.$watch(
      () => this.$route.params,
      () => {
        this.data_loaded = false;
        this.getDataFromAPI();
        // reload Chart
      }
    );
  },
  methods: {
    getDataFromAPI: function () {
      axios.get('https://api.etnic.be:7443/external/dataoffice/subventions/api/enterprises/' + this.beNumber)
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
