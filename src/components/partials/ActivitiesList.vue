<template>
  <h3 class="text-base font-semibold text-gray-900 uppercase">
    Activités
  </h3>
  <p class="mt-1 max-w-2xl text-sm text-gray-500">
    Liste des codes NACE de l'organisation
  </p>
  <div class="mt-8 flow-root">
    <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
        <table class="min-w-full">
          <thead class="bg-white">
            <tr>
              <th
                scope="col"
                class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3"
              >
                Code
              </th>
              <th
                scope="col"
                class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Version
              </th>
              <th
                scope="col"
                class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Description
              </th>
            </tr>
          </thead>
          <tbody class="bg-white">
            <template
              v-for="activityKey in activitiesPerType"
              :key="activityKey"
            >
              <tr class="border-t border-gray-200">
                <th
                  colspan="5"
                  scope="colgroup"
                  class="bg-gray-50 py-2 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3"
                >
                  {{ activityKey.activity }}
                </th>
              </tr>
              <tr
                v-for="activity in activityKey.labels"
                :key="activity"
              >
                <td class="whitespace-nowrap py-1 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3 text-right">
                  <RouterLink :to="'/naces/' + activity.NaceVersion + '/' + activity.NaceCode">
                    {{ activity.NaceCode }} 
                  </RouterLink> 
                </td>
                <td class="whitespace-nowrap px-3 py-1 text-sm text-gray-500">
                  Nace{{ activity.NaceVersion }}
                </td>
                <td class="px-3 py-1 text-sm text-gray-500">
                  {{ $filters.getTranslation(activity.labels, 'FR') }}
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
  
<script>
export default {
  props: {
    activitiesPerType: {
      type: Object,
      required: true
    },
     
  },
   
};
</script>
  