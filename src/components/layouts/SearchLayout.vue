<template>
  <div
    v-if="data_loaded"
    class="px-4 sm:px-0"
  >
    <h3 class="text-base font-semibold leading-7 text-gray-900">
      Résultats de la recherche pour "{{ results.input.name }}"
    </h3>
    <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
      Il y a {{ results.results }} résultats.
    </p>
  </div>
  <div class="mt-6 border-t border-gray-100">
    <dl class="divide-y divide-gray-100">
      <div
        v-for="company in results.enterprises"
        :key="company"
        class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0"
      >
        <dt class="text-sm font-medium leading-6 text-gray-900">
          {{ company.denomination }}<br>
          <RouterLink
            :to="/entreprises/ + company.EnterpriseNumber"
          >
            {{ company.EnterpriseNumber }}
          </RouterLink>
        </dt>
        <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
          {{ company.type_entreprise_fr }}
          {{ company.juridical_form_cac_fr }} <br>

          <span class="text-gray-500">{{ company.addresses }}</span><br>
        </dd>
      </div>
    </dl>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    searchName: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      results: [],
      data_loaded: false
    };
  },
  mounted () {
    // search = name parameter in the URL
    this.getSearchResults();
  },
  methods: {
    getSearchResults: function () {
      if (this.searchName) {
        axios.get('https://be-companies.tintamarre.be/api/lookup?name=' + this.searchName)
          .then(response => {
            this.data_loaded = true;
            this.results = response.data;
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
  }
};
</script>