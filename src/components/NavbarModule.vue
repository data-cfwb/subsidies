<template>
  <Disclosure
    v-slot="{ open }"
    as="nav"
    class="bg-white shadow"
  >
    <div class="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
      <div class="flex h-16 justify-between">
        <div class="flex px-2 lg:px-0">
          <div class="flex flex-shrink-0 items-center">
            <RouterLink
              to="/"
            >
              <img
                class="h-8 w-auto"
                src="https://raw.githubusercontent.com/data-cfwb/subsidies/main/public/assets/logo_fwb_without_text.svg"
                alt="Fédération Wallonie-Bruxelles"
              >
            </RouterLink>
          </div>
          <div class="hidden lg:ml-6 lg:flex lg:space-x-8">
            <!-- Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" -->
         
            <router-link
              to="/enterprises/random"
              :active-class="'inline-flex items-center border-b-2 border-indigo-500 px-1 pt-1 text-sm font-medium text-gray-900'"
              :exact-active-class="'inline-flex items-center border-b-2 border-indigo-500 px-1 pt-1 text-sm font-medium text-gray-900'"
              class="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900"
              @click="refreshIfcurrentPage"
            >
              Organisation aléatoire
            </router-link>
            <router-link
              to="/statistiques"
              :active-class="'inline-flex items-center border-b-2 border-indigo-500 px-1 pt-1 text-sm font-medium text-gray-900'"
              :exact-active-class="'inline-flex items-center border-b-2 border-indigo-500 px-1 pt-1 text-sm font-medium text-gray-900'"
              class="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900"
            >
              Statistiques
            </router-link>
            <router-link
              to="/a-propos"
              :active-class="'inline-flex items-center border-b-2 border-indigo-500 px-1 pt-1 text-sm font-medium text-gray-900'"
              :exact-active-class="'inline-flex items-center border-b-2 border-indigo-500 px-1 pt-1 text-sm font-medium text-gray-900'"
              class="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900"
            >
              À propos
            </router-link>
          </div>
        </div>
        <div class="flex flex-1 items-center justify-center px-2 lg:ml-6 lg:justify-end">
          <div
            v-if="$route.path !== '/search'"
            class="w-full max-w-lg lg:max-w-xs"
          >
            <label
              for="search"
              class="sr-only"
            >Rechercher</label>
            <div class="relative">
              <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <MagnifyingGlassIcon
                  class="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </div>
              <input
                id="search"
                v-model="search"
                name="search"
                class="block w-full rounded-md border-0 bg-white py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Rechercher"
                type="search"
                @keyup.enter="redirectToSearch"
              >
            </div>
            <!-- <div v-if="!isSearchLongEnough">
              <p class="mt-2 text-sm text-gray-500">
                Veuillez entrer au moins 4 caractères.
              </p>
            </div> -->
          </div>
        </div>
        <div class="flex items-center lg:hidden">
          <!-- Mobile menu button -->
          <DisclosureButton class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
            <span class="absolute -inset-0.5" />
            <span class="sr-only">Ouvrir le menu principal</span>
            <Bars3Icon
              v-if="!open"
              class="block h-6 w-6"
              aria-hidden="true"
            />
            <XMarkIcon
              v-else
              class="block h-6 w-6"
              aria-hidden="true"
            />
          </DisclosureButton>
        </div>
        <div class="hidden lg:ml-4 lg:flex lg:items-center">
        <!-- Profile dropdown -->
        </div>
      </div>
    </div>
  
    <DisclosurePanel class="lg:hidden">
      <div class="space-y-1 pb-3 pt-2">
        <!-- Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800" -->
        <DisclosureButton
          as="a"
          href="/"
          class="block border-l-4 border-indigo-500 bg-indigo-50 py-2 pl-3 pr-4 text-base font-medium text-indigo-700"
        >
          Accueil
        </DisclosureButton>
        <DisclosureButton
          as="a"
          href="/statistiques"
          class="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800"
        >
          Statistiques
        </DisclosureButton>
        <DisclosureButton
          as="a"
          href="/a-propos"
          class="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800"
        >
          À propos
        </DisclosureButton>
      </div>
      <div class="border-t border-gray-200 pb-3 pt-4">
        <div class="flex items-center px-4">
          <div class="flex-shrink-0" />
          <div class="ml-3" />
        </div>
        <div class="mt-3 space-y-1" />
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>
  
<script>
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue';
import { MagnifyingGlassIcon } from '@heroicons/vue/20/solid';
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline';

import { RouterLink } from 'vue-router';

export default {
  components: {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    MagnifyingGlassIcon,
    Bars3Icon,
    XMarkIcon,
    RouterLink
  },
  data () {
    return {
      search: '',
    };
  },
  computed: {
    search_url: function () {
      return '/search?name=' + this.search;
    },
    isSearchLongEnough:
      function () {
        return this.search.length > 3;
      } 
  },
  methods: {
    refreshIfcurrentPage: function () {
      if (this.$route.path === '/enterprises/random') {
        this.$router.go();
      }
    },
    redirectToSearch: function () {
      this.$router.push(
        { 
          path: this.search_url,
          query: { name: this.search }
        }
      );
    }
  }
};
</script>