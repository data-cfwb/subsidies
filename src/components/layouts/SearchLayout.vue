<template>
  <div>
    <h1>Rechercher une organisation</h1>
    <div>
      <input
        v-model="search"
        type="text"
        placeholder="Rechercher une organisation"
        class=""
      >
      <button
        class="btn-blue"
        @click="search = ''"
      >
        Clear
      </button>
      <button class="btn-primary">
        Rechercher
      </button>
        
      <div v-if="search.length < 3">
        <p>
          Veuillez entrer au moins 3 caractères.
        </p>
      </div>

      <div v-if="results" />
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data () {
    return {
      search: '',
      results: []
    };
  },
  watch: {
    search: function (newSearch) {
      if (newSearch.length > 2) {
        axios.get('https://api.odwb.be/organisations/search/' + newSearch)
          .then(response => {
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