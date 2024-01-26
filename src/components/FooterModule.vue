<template>
  <footer class="bg-white">
    <div class="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
      <div class="mt-8 md:order-1 md:mt-0">
        <p class="text-left text-xs leading-5 text-gray-500">
          Réalisé sous licence libre. <br>
          <a href="https://github.com/data-cfwb/subsidies">Code source</a>
        </p>
      </div>

      <div class="flex justify-center space-x-6 md:order-2">
        <img
          v-for="logo in ['CULT', 'Adeps', 'AJ', 'ENS', 'MJ', 'RS'].sort(function() {return 0.5 - Math.random()})"
          :key="logo"
          alt=""
          class="h-8"
          :src="'https://raw.githubusercontent.com/data-cfwb/charte-graphique/main/pastilles_PNG_et_SVG_24px/pastille_' + logo + '24.svg'"
        >
      </div>
      <div class="flex justify-center space-x-6 md:order-3">
        <p class="text-center text-xs leading-5 text-gray-500">
          2023 - {{ new Date().getFullYear() }}
        </p>
        <img
          src="https://raw.githubusercontent.com/data-cfwb/charte-graphique/main/pastilles_SVG/logo_FWB_coul.svg"
          alt="Fédération Wallonie-Bruxelles"
        >
      </div>
    </div>
  </footer>
</template>

<script setup>


</script>