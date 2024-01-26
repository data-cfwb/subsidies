<template>
  <div class="mt-6 border-t border-gray-100">
    <h2 class="text-base font-semibold leading-6 text-gray-900 uppercase">
      Liste des organisations subventionnées
    </h2>

    <div class="mt-8 flow-root">
      <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
            <table class="min-w-full divide-y divide-gray-300">
              <thead class="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                  >
                    Dénomination
                  </th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Montant total des subventions
                  </th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Activités
                  </th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Adresse
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
                <tr
                  v-for="subsidy in enterprises"
                  :key="subsidy"
                >
                  <td class="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                    {{ subsidy.denomination }}
                    <br>
                    <RouterLink
                      :to="/enterprises/ + subsidy.EnterpriseNumber"
                    >
                      {{ subsidy.EnterpriseNumber }}
                    </RouterLink>
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {{ $filters.formatToEuros(subsidy.subsidies_sum) }}
                  </td>
                  <td class="px-3 py-4 text-sm text-gray-500">
                    <ul>
                      <li v-if="subsidy.NACE2008_main">
                        Nace2008 (MAIN): {{ subsidy.NACE2008_main }}
                      </li>
                      <li v-if="subsidy.NACE2008_seco">
                        Nace2008 (SECO): {{ subsidy.NACE2008_seco }}
                      </li>
                      <li v-if="subsidy.NACE2003_main">
                        Nace2003 (MAIN): {{ subsidy.NACE2003_main }}
                      </li>
                      <li v-if="subsidy.NACE2003_seco">
                        Nace2003 (SECO): {{ subsidy.NACE2003_seco }}
                      </li>
                    </ul>
                  </td>                  
                  <td class="px-3 py-4 text-sm text-gray-500">
                    <a
                      :href="'https://www.openstreetmap.org/search?query=' + subsidy.addresses"
                      target="_blank"
                    >
                      {{ subsidy.addresses }}
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props:
    {
      enterprises: {
        type: Object,
        required: true
      },
    
    }
};
</script>