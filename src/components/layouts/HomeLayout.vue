<template>
  <div>
    <h1>Subventions</h1>
    <p>{{ $route.params.be_number }}</p>

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
