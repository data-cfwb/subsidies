<template>
  <div
    v-if="data_loaded"
  >
    <HeaderPartial
      :title="$filters.joinOnKey(company.Denominations, 'Denomination')"
    />

    <main>
      <!-- 3 column wrapper -->
      <div class="mx-auto w-full max-w-7xl grow lg:flex xl:px-2">
        <!-- Left sidebar & main wrapper -->
        <div class="flex-1 xl:flex">
          <div class="border-b border-gray-200 px-4 py-6 sm:px-6 lg:pl-8 xl:w-64 xl:shrink-0 xl:border-b-0 xl:border-r xl:pl-6">
            <!-- Left column area -->
            <RouterLink
              :to="/enterprises/ + company.EnterpriseNumber"
            >
              {{ company.EnterpriseNumberBE }}
            </RouterLink>


            <h2 class="text-base font-semibold leading-8 text-gray-900 uppercase">
              Status
            </h2>
            <div>
              {{ $filters.joinOnKey(company.StatusLabel, 'Description') }}
            </div>
            <div>
              {{ $filters.joinOnKey(company.JuridicalSituationLabel, 'Description') }}
            </div>
            <div>
              {{ $filters.joinOnKey(company.JuridicalFormCACLabel, 'Description') }}
            </div>

            {{ company.TypeEntrepriseLabel }}
            {{ company.Languages }}
          </div>

          <div class="px-4 py-6 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6">
            <!-- Main area -->

            <h3 class="text-base font-semibold leading-7 text-gray-900 uppercase">
              Activités
            </h3>
            <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
              Liste des codes NACE de l'organisation
            </p>

            <dl class="divide-y divide-gray-100">
              <div
                v-for="activityKey in ActivitiesMap"
                :key="activityKey"
                class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0"
              >
                <dt class="text-sm font-medium leading-6 text-gray-900">
                  {{ activityKey.activity }}
                </dt>
                <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <h4 class="text-sm font-medium leading-6 text-gray-900">
                    Description
                  </h4>
                  <div
                    v-for="activity in activityKey.labels"
                    :key="activity"
                  >
                    <RouterLink :to="'/naces/' + activity.NaceVersion + '/' + activity.NaceCode">
                      {{ activity.NaceCode }} (version {{ activity.NaceVersion }})
                    </RouterLink> <br>
   
                    {{ $filters.joinOnKey(activity.labels, 'Description') }}
                  </div>
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <div class="shrink-0 border-t border-gray-200 px-4 py-6 sm:px-6 lg:w-96 lg:border-l lg:border-t-0 lg:pr-8 xl:pr-6">
          <!-- Right column area -->


          <h2 class="text-base font-semibold leading-7 text-gray-900 uppercase">
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

          <h3 class="text-base font-semibold leading-7 text-gray-900 uppercase">
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
          </ul>
        </div>
      </div>
 
      <!-- {{ company.Languages }} -->
      <div class="mx-auto max-w-7xl px-6 lg:px-8 mt-2">
        <h2 class="text-base font-semibold leading-8 text-gray-900 uppercase">
          Subsidies
        </h2>
        <div>
          <table class="table-auto">
            <thead>
              <tr>
                <th class="text-left">
                  Année
                </th>
                <th class="text-right">
                  Montant
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="subsidy in company.SubsidiesPerYear"
                :key="subsidy"
              >
                <td>{{ subsidy.Year }}</td>
                <td class="text-right">
                  {{ $filters.formatToEuros(subsidy.total) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="w-1/2">
          <BarChart
            :data="company.SubsidiesPerYearForChart"
          />
        </div>

        <SubidiesTable :subsidies-per-year="company.SubsidiesMapByYear" />

  
        <h2 class="text-base font-semibold leading-8 text-gray-900 uppercase">
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
        <h2 class="text-base font-semibold leading-8 text-gray-900 uppercase">
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
    </main>
  </div>
  <div v-else>
    <LoadingFwb />
  </div>
</template>
  

<script>
import axios from 'axios';

import BarChart from '../charts/BarChart.vue';
import SubidiesTable from '../partials/SubdidiesTable.vue';

export default {
  components: {
    BarChart,
    SubidiesTable
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
