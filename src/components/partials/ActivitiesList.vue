<template>
  <h3 class="text-base font-semibold leading-7 text-gray-900 uppercase">
    Activités
  </h3>
  <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
    Liste des codes NACE de l'organisation
  </p>
  <dl class="divide-y divide-gray-100">
    <div
      v-for="activityKey in activitiesPerType"
      :key="activityKey"
      class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0"
    >
      <dt class="text-sm font-medium leading-6 text-gray-900">
        {{ activityKey.activity }}
      </dt>
      <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
        <h4 class="text-sm font-medium leading-6 text-gray-900">
          Description
        </h4>
        <div
          v-for="activity in activityKey.labels"
          :key="activity"
        >
          <RouterLink :to="'/naces/' + activity.NaceVersion + '/' + activity.NaceCode">
            {{ activity.NaceCode }} 
          </RouterLink> Nace{{ activity.NaceVersion }}
          <br>
   
          {{ $filters.joinOnKey(activity.labels, 'Description') }}
        </div>
      </dd>
    </div>
  </dl>
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
  