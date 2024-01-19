<template>
  <div>
    <h1>Rechercher une organisation</h1>
    <div class="max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
      <!-- Search Input -->
      <div class="relative">
        <input
          v-model="search"
          type="text"
          placeholder="Rechercher une organisation"
          class="w-full border-2 border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
        >
        <button class="absolute right-0 top-0 mt-2 mr-3">
          <!-- Search Icon (You can replace this with your preferred search icon) -->
          <svg
            class="h-5 w-5 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6M9 15a6 6 0 1 1 0-12 6 6 0 0 1 0 12z"
            />
          </svg>
        </button>

        <button
          class="btn btn-blue"
          @click="search = ''"
        >
          Clear
        </button>
          
        <div
          v-if="search.length < 3"
          class="text-red-500 text-xs italic"
        >
          <p>
            Veuillez entrer au moins 3 caractères.
          </p>
        </div>
      </div>
    </div>


 

    <div v-if="results" />
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
        axios.get('https://be-companies.tintamarre.be/api/enterprises/lookup?name=' + newSearch)
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