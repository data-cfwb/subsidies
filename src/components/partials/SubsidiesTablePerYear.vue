<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h2 class="text-base font-semibold leading-8 text-gray-900 uppercase">
          Subventions octroyées par la Fédération Wallonie-Bruxelles
        </h2>
      </div>
    </div>
    <div class="mt-8 flow-root">
      <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <table class="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                <th
                  scope="col"
                  class="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Année
                </th>
            
                <th
                  scope="col"
                  class="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900 text-right"
                >
                  Montant
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 bg-white">
              <tr
                v-for="year in subsidiesPerYear"
                :key="year"
              >
                <td class="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900">
                  {{ year.Year }}
                </td>
           
            
                <td class="whitespace-nowrap px-2 py-2 text-sm text-gray-500 text-right">
                  {{ $filters.formatToEuros(year.total) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
export default {
  props: {
    subsidiesPerYear: {
      type: Array,
      required: true
    }
  }
};
</script>