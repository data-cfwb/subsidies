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
      administrationName: {
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

      if (this.administrationName.includes(' AGC ')) {
        return this.prefix_url + 'CULT' + '24.svg';
      } else if (this.administrationName.includes(' AGAJ ')) {
        return this.prefix_url + 'AJ' + '24.svg';
      } else if (this.administrationName.includes(' AGS ')) {
        return this.prefix_url + 'Adeps' + '24.svg';
      } else if (this.administrationName.includes(' AGE ')) {
        return this.prefix_url + 'ENS' + '24.svg';
      } else if (this.administrationName.includes(' AGMJ ')) {
        return this.prefix_url + 'MJ' + '24.svg';
      } else if (this.administrationName.includes(' RS ')) {
        return this.prefix_url + 'RS' + '24.svg';
      } else 
        return 'https://raw.githubusercontent.com/data-cfwb/charte-graphique/main/pastilles_SVG/logo_FWB_coul.svg';
    }
  }
};

</script>