<template>
  <div>
    <h1>Subventions</h1>
    {{ $route.params.be_number }}

    <EntreprisePage
      msg="Prout!"
      :be_number="$route.params.be_number"
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
