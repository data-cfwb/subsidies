<template>
  <EntreprisePage
    :be-number="beNumber"
  />
</template>
  
<script>
import EntreprisePage from '../EntreprisePage.vue';
  
export default {
  components: {
    EntreprisePage
  },
  props: {
    beNumber: {
      type: String,
      required: true
    }
  }
};
</script>
