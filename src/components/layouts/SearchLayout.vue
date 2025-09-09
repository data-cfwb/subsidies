<template>
  <div
    v-if="data_loaded"
  >
    <HeaderPartial
      :title="'Résultats de la recherche pour « ' + results.input.name + ' »'"
    />
    <main>
      <div class="mx-auto max-w-7xl px-6 lg:px-8 mt-2">
        <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
          Il y a {{ results.results }} résultats.
        </p>
      </div>
      <div class="mt-6 border-t border-gray-100 px-6 lg:px-8">
        <EnterprisesTable :enterprises="results.enterprises" />
      </div>
    </main>
  </div>
  <div v-else>
    <LoadingFwb />
  </div>
</template>

<script>
import axios from 'axios';
import EnterprisesTable from '../partials/EnterprisesTable.vue';

export default {
  components: {
    EnterprisesTable
  },
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
        axios.get('https://api.etnic.be:7443/external/dataoffice/subventions/api/lookup?name=' + this.searchName)
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