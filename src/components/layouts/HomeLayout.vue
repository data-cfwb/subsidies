<template>
  <div>
    <EntreprisePage
      :be-number="$route.params.be_number"
    />
  </div>
</template>

<script>
import EntreprisePage from '../EntreprisePage.vue';

export default {
  components: {
    EntreprisePage
  }
};
</script>

<style>

</style>
