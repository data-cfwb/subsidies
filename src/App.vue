<template>
  <div>
    <NavbarModule />

    <div class="py-10">
      <header>
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 class="text-3xl font-bold leading-tight tracking-tight text-gray-900">
            {{ $route.meta.title }}
          </h1>
        </div>
      </header>
      <main>
        <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <!-- Your content -->
          <router-view />
        </div>
      </main>
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
