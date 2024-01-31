<template>
  <div>
    <NavbarModule />

    <!-- Be sure to use this with a layout container that is full-width on mobile -->
    <div class="overflow-hidden bg-blue-50 shadow sm:rounded-lg">
      <div class="px-4 py-5 sm:p-6">
        <!-- Your content -->
        <router-view />
      </div>
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
