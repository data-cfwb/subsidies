<template>
  <div>
    <div class="container mx-auto">
      <div class="flex flex-row flex-wrap py-4">
        <aside class="w-full sm:w-1/3 md:w-1/4 px-2">
          <div class="sticky top-0 p-4 w-full">
            <!-- navigation -->
            <ul class="flex flex-col overflow-hidden">
              <li>
                <router-link to="/entreprises/0206.524.876">
                  Ville d'Arlon
                </router-link>
              </li>
              <li>
                <router-link to="/entreprises/0419.172.434">
                  Les Grignoux
                </router-link>
              </li>
              <li>
                <router-link to="/entreprises/0783.357.746">
                  Petrunia
                </router-link>
              </li>
              <li>
                <router-link to="/entreprises/0442.373.250">
                  Centre culturel de Verviers
                </router-link>
              </li>

              <li>
                <router-link to="/statistiques">
                  Statistiques
                </router-link>
              </li>
              <li>
                <router-link to="/a-propos">
                  À propos
                </router-link>
              </li>
              <li>
                <router-link to="/search">
                  Rechercher
                </router-link>
              </li>
            </ul>
          </div>
        </aside>
        <main
          role="main"
          class="w-full sm:w-2/3 md:w-3/4 pt-1 px-2"
        >
          <!-- content area -->
          <router-view />
        </main>
      </div>
    </div>
    <FooterModule />
  </div>
</template>

<script>
import FooterModule from './components/FooterModule.vue';
export default {
  name: 'App',
  components: {
    FooterModule
  }
};

</script>
