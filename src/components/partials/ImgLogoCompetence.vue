<template>
  <img
    :src="url"  
    :alt="competence"
    class="h-8"
  >
</template>

<script>
export default {
  props:
    {
      competence: {
        type: String,
        required: true
      },
    },
  data () {
    return {
      prefix_url: 'https://raw.githubusercontent.com/data-cfwb/charte-graphique/main/pastilles_PNG_et_SVG_24px/pastille_'
    };
  },
  computed: {
    url: function () {
      if (this.competence === 'Education') {
        return this.prefix_url + 'ENS' + '24.svg';
      } else if (this.competence === 'Culture') {
        return this.prefix_url + 'CULT' + '24.svg';
      } else if (this.competence === 'Jeunesse') {
        return this.prefix_url + 'AJ' + '24.svg';
      } else if (this.competence === 'Sport') {
        return this.prefix_url + 'Adeps' + '24.svg';
      } else if (this.competence === 'Recherche') {
        return this.prefix_url + 'RS' + '24.svg';
      } else 
        return 'https://raw.githubusercontent.com/data-cfwb/charte-graphique/main/pastilles_SVG/logo_FWB_coul.svg';
    }
  }
};

</script>