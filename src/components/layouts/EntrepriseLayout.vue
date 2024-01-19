<template>
  <EntreprisePage
    :be-number="$route.params.be_number"
  />
</template>
  
<script>
import EntreprisePage from '../EntreprisePage.vue';
  
export default {
  components: {
    EntreprisePage
  }
};
</script>
