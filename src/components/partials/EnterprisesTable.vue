<template>
  <div class="mt-8 flow-root">
    <button
      type="button"
      class="rounded bg-indigo-50 px-2 py-1 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
      @click="downloadCsv(enterprises)"
    >
      💾 Télécharger
    </button>
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
                  class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 text-right"
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
                  {{ subsidy.denominations }}
                  <br>
                  <RouterLink
                    :to="/enterprises/ + subsidy.EnterpriseNumber"
                  >
                    {{ subsidy.EnterpriseNumber }}
                  </RouterLink>
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-right">
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
</template>
<script>
export default {
  props:
    {
      enterprises: {
        type: Object,
        required: true
      },
    },
  methods: {
    convertToCSV(objArray) {
      const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
      let str = '';

      for (let i = 0; i < array.length; i += 1) {
        let line = '';
        for (const index in array[i]) {
          if (line !== '') line += ',';

          line += '"' + array[i][index] + '"';
        }

        str += `${line}\r\n`;
      }

      return str;
    },
    downloadCsv(data) {
      const csv = this.convertToCSV(data);
      const exportedFilename = 'export.csv';
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      if (navigator.msSaveBlob) { // IE 10+
        navigator.msSaveBlob(blob, exportedFilename);
      } else {
        const link = document.createElement('a');
        if (link.download !== undefined) { // feature detection
          // Browsers that support HTML5 download attribute
          const url = URL.createObjectURL(blob);
          link.setAttribute('href', url);
          link.setAttribute('download', exportedFilename);
          link.style.visibility = 'hidden';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      }
    },
  },

};
</script>