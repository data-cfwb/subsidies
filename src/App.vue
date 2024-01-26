<template>
  <div>
    <NavbarModule />

    <div class="py-10">
      <!-- Your content -->
      <router-view />
    </div>
  
    <FooterModule />
  </div>
</template>

<script>
import FooterModule from './components/FooterModule.vue';
import NavbarModule from './components/NavbarModule.vue';

export default {
  name: 'App',
  components: {
    FooterModule,
    NavbarModule
  }
};

</script>
