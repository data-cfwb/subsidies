<template>
  <div
    v-if="data_loaded"
    class="col-span-12 py-5 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8"
  >
    <HeaderPartial
      :title="$filters.joinOnKey(company.denominations, 'denomination')"
      :subtitle="$filters.joinOnKey(company.denominations, 'type')"
      :tags="[$filters.getTranslation(company.status_label, 'FR'), $filters.getTranslation(company.juridical_situation_label, 'FR'), $filters.getTranslation(company.juridical_form_cac_label, 'FR'), company.languages]"
    >
      <div class="py-2">
        <span class="font-bold">Numéro BCE: </span>
        <RouterLink
          :to="/enterprises/ + company.enterprise_number"
          class="font-medium text-indigo-600 hover:text-indigo-500"
        >
          {{ company.enterprise_number_be }}
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
              v-if="company.activities.length"
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
            v-if="company.contacts.length"
            class="text-base font-semibold leading-7 text-gray-900 uppercase py-3"
          >
            Contacts
          </h2>
          <div>
            <ul>
              <li
                v-for="contact in company.contacts"
                :key="contact"
              >
                {{ contact.contact_type }}:
                <span v-if="contact.contact_type == 'EMAIL'">
                  <a
                    :href="'mailto:' + contact.value"
                  >{{ contact.value }}</a>
                </span>
                <span v-if="contact.contact_type == 'WEB'"><a
                  :href="'https://' + contact.value"
                >{{ contact.value }}</a>
                </span>
                <span v-if="contact.contact_type == 'TEL'"><a
                  :href="'tel:' + contact.value"
                >{{ contact.value }}</a>
                </span>
              </li>
            </ul>
          </div>

          <h3 class="text-base font-semibold leading-7 text-gray-900 uppercase py-3">
            Adresse(s)
          </h3>
          <ul>
            <li
              v-for="address in company.addresses"
              :key="address"
            >
              {{ address.street_fr }} {{ address.house_number }} {{ address.box }}
              <br>
              {{ address.zipcode }} {{ address.municipality_fr }}
            </li>

            <a
              type="button"
              class="rounded bg-gray-50 px-2 py-1 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
              :href="'https://www.openstreetmap.org/search?query=' + company.addresses[0].street_fr + ' ' + company.addresses[0].house_number + ' ' + company.addresses[0].zipcode + ' ' + company.addresses[0].municipality_fr"
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
          v-if="company.subsidies_per_year.length"
          :subsidies-per-year="company.subsidies_per_year"
        />
        <h2 class="text-base font-semibold leading-7 text-gray-900 uppercase py-3">
          Détails des subventions par année
        </h2>
        <SubsidiesTable :subsidies-per-year="company.subsidies_map_by_year" />

      
        <h2 class="text-base font-semibold leading-8 text-gray-900 uppercase">
          Sources de données
        </h2>
        <ul class="list-disc list-inside">
          <li
            v-for="key, link in company.data_sources_links"
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
            v-for="key, link in company.external_links"
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

import { API_BASE } from '@/config.js';
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
      this.company.activities.forEach(activity => {
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
      const labels = Array.from(new Set(this.company.subsidies_per_year.map(item => item.year))).sort();

      for (const yearLabel of labels) {
        for (const competenceData of this.company.subsidies_map_by_year[yearLabel] || []) {
          const competence = competenceData.competence;

          if (!datasets[competence]) {
            datasets[competence] = {
              label: competence,
              data: Array(labels.length).fill(0),
              // random from [red, green, blue, yellow]
              backgroundColor: getColorFromCompetence(competence),
            };
          }

          const index = labels.indexOf(yearLabel);
          datasets[competence].data[index] += competenceData.amount_in_euros;
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
      axios.get(`${API_BASE}/enterprises/${this.beNumber}`)
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
