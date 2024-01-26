<template>
  <div
    v-for="(subsidies, year) in subsidiesPerYear"
    :key="year"
  >
    <div class="px-4 sm:px-6 lg:px-8">
      <div class="sm:flex sm:items-center">
        <div class="sm:flex-auto">
          <h1 class="text-base font-semibold leading-6 text-gray-900">
            {{ year }}
          </h1>
          <p class="mt-2 text-sm text-gray-700">
            La liste des subventions pour l'année {{ year }}.
          </p>
        </div>
        <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none" />
      </div>
      <div class="mt-8 flow-root">
        <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table class="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                  >
                    Logo
                  </th>
                  <th
                    scope="col"
                    class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0 text-right"
                  >
                    Montant
                  </th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Compétence <br> 
                    <span class="text-gray-600">Ministre</span>
                  </th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Nom de l'administration et base légale
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
                <tr
                  v-for="subsidy in subsidies"
                  :key="subsidy"
                >
                  <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0 text-right">
                    <ImgLogoCompetence :administration-name="subsidy.AdministrationName" />
                  </td>
                  <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0 text-right">
                    {{ $filters.formatToEuros(subsidy.AmountInEuros) }}
                    <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                      <div
                        class="bg-blue-900 h-2.5 rounded-full"
                        :style="'width:' + percentageOfMax(subsidy, subsidies) + '%'"
                      />
                    </div>
                  </td>
                  <td class="px-3 py-4 text-sm text-gray-500">
                    <ul>
                      <li class="text-md font-semibold">
                        {{ subsidy.Compétence }}
                      </li>
                      <li class="text-sm font-normal">
                        {{ subsidy.MinistreName }}
                      </li>
                    </ul>
                  </td>
                  <td class="px-3 py-4 text-sm text-gray-500">
                    <ul>
                      <li class="text-md font-semibold">
                        {{ subsidy.AdministrationName }}
                      </li>
                      <li class="text-sm font-normal">
                        {{ subsidy.LegalBasis }}
                      </li>
                    </ul>
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
import ImgLogoCompetence from '@/components/partials/ImgLogoCompetence.vue';

export default {
  components: {
    ImgLogoCompetence
  },
  props: {
    subsidiesPerYear: {
      type: Object,
      required: true
    },
   
  },
  methods: {
    percentageOfMax: function (subsidy, subsidies) {
      const getMaxAmount = Math.max(...subsidies.map(subsidy => subsidy.AmountInEuros));
      return (subsidy.AmountInEuros / getMaxAmount) * 100;
    }
  }
 
};
</script>
