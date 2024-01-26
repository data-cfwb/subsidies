<template>
  <header>
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <h1 class="text-3xl font-bold leading-tight tracking-tight text-gray-900">
        {{ title }}
      </h1>
      <p class="mt-0 text-base text-gray-500">
        {{ subtitle }}
      </p>

      <div class="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
        <span
          v-for="tag in tags"
          :key="tag"
          class="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10"
        >
          {{ tag }}
        </span>
      </div>
      <slot />
    </div>
  </header>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      required: false,
      default: ''
    },
    tags: {
      type: Array,
      required: false,
      default: () => []
    }
  },
 
};
</script>
