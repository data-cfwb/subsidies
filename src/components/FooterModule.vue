<template>
  <footer class="bg-white">
    <div class="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
      <div class="mt-8 md:order-1 md:mt-0">
        <p class="text-left text-xs leading-5 text-gray-500">
          Réalisé sous licence libre. <a href="https://github.com/data-cfwb/subsidies">Code</a><br>
          <ul class="text-left text-xs leading-5 text-gray-500">          
            <li><a href="http://www.federation-wallonie-bruxelles.be/index.php?id=apropos">À propos de la FW-B</a></li>
            <li><a href="http://www.federation-wallonie-bruxelles.be/index.php?id=contact">Contacter la FW-B</a></li>
          </ul>
        </p>
      </div>
      <div class="flex justify-center space-x-6 md:order-2">
        <img
          v-for="logo in ['Adeps', 'AJ', 'CULT', 'ENS', 'MJ', 'RS_'].sort(function() {return 0.5 - Math.random()})"
          :key="logo"
          :alt="'Logo ' + logo"
          class="h-8 text-center w-auto"
          :src="'https://raw.githubusercontent.com/data-cfwb/charte-graphique/main/pastilles_PNG_et_SVG_24px/pastille_' + logo + '24.svg'"
        >
      </div>
      <div class="flex justify-center space-x-6 md:order-3">
        <p class="text-right text-xs leading-5 text-gray-500">
          2023 - {{ new Date().getFullYear() }}
          <ul class="text-right text-xs leading-5 text-gray-500">          
            <li><a href="/declaration-sur-l-accessibilite">Déclaration d'accessibilité</a></li>
            <li><a href="http://www.federation-wallonie-bruxelles.be/index.php?id=portail_legal">Mentions légales et vie privée</a></li>
          </ul>
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