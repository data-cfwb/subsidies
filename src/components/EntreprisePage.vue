<template>
  <div v-if="data_loaded">
    <h1 class="h1-main-title">
      {{ joinOnKey(company.Denominations, 'Denomination') }}
    </h1>
    <div class="companyNumber">
      <RouterLink
        :to="/entreprises/ + company.EnterpriseNumber"
      >
        {{ company.EnterpriseNumberBE }}
      </RouterLink>
    </div>            
        
    <h2>
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

    <h2>
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
          
    <div>
      <div class="px-4 sm:px-0">
        <h3 class="text-base font-semibold leading-7 text-gray-900 uppercase">
          Activités
        </h3>
        <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
          Liste des codes NACE de l'organisation
        </p>
      </div>
      <div class="mt-6 border-t border-gray-100">
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
   
                {{ joinOnKey(activity.labels, 'Description') }}
              </div>
            </dd>
          </div>
        </dl>
      </div>
    </div>

    <h2>
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

    {{ company.TypeEntrepriseLabel }}

    <h2>
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
              {{ subsidy.total }} €
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
    <div
      v-for="(subsidies, year) in company.SubsidiesMapByYear"
      :key="year"
    >
      <div class="px-4 sm:px-6 lg:px-8">
        <div class="sm:flex sm:items-center">
          <div class="sm:flex-auto">
            <h1 class="text-base font-semibold leading-6 text-gray-900">
              {{ year }}
            </h1>
            <p class="mt-2 text-sm text-gray-700">
              La liste des subventions pour l'année {{ year }}.
            </p>
          </div>
          <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none" />
        </div>
        <div class="mt-8 flow-root">
          <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <!-- <dl class="divide-y divide-gray-100">
      <div
        v-for="company in results.enterprises"
        :key="company"
        class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0"
      >
        <dt class="text-sm font-medium leading-6 text-gray-900">
          <RouterLink
            :to="/entreprises/ + company.EnterpriseNumber"
          >
            {{ company.denomination }} {{ company.EnterpriseNumber }}
          </RouterLink>
        </dt>
        <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
          {{ company.juridical_form_cac_fr }} <br>
          {{ company.addresses }} <br>
          {{ company.type_entreprise_fr }}
        </dd>
      </div>
    </dl> -->
              <table class="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0 text-right"
                    >
                      Montant
                    </th>
                    <th
                      scope="col"
                      class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Compétence (Ministre)
                    </th>
                    <th
                      scope="col"
                      class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Nom de l'administration et base légale
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">
                  <tr
                    v-for="subsidy in subsidies"
                    :key="subsidy"
                  >
                    <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0 text-right">
                      {{ subsidy.AmountInEuros }} €
                    </td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <span class="text-sm">{{ subsidy.Compétence }} 
                        <br>
                        {{ subsidy.MinistreName }}
                      </span>
                    </td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <br>
                      {{ subsidy.AdministrationName }}<br>
                      {{ subsidy.LegalBasis }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--          
    <h2>
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
    </div> -->
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
  <div v-else>
    <LoadingFwb />
  </div>
</template>

<script>
import axios from 'axios';

import BarChart from './charts/BarChart.vue';
import LoadingFwb from './partials/LoadingFwb.vue';

export default {
  components: {
    BarChart,
    LoadingFwb
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
