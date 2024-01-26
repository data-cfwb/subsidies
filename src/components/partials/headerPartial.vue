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
        <div class="mt-2 flex items-center text-sm text-gray-500">
          {{ attrib1 }}
        </div>
        <div class="mt-2 flex items-center text-sm text-gray-500">
          {{ attrib2 }}
        </div>
        <div class="mt-2 flex items-center text-sm text-gray-500">
          {{ attrib3 }}
        </div>
        <div class="mt-2 flex items-center text-sm text-gray-500">
          {{ attrib4 }}
        </div>
      </div>
      <slot />
    </div>
  </header>
</template>

<script>
export default {
  props: {
    title: {
      type: Object,
      required: true
    },
    subtitle: {
      type: String,
      required: false,
      default: ''
    },
    attrib1: {
      type: String,
      required: false,
      default: ''
    },
    attrib2: {
      type: String,
      required: false,
      default: ''
    },
    attrib3: {
      type: String,
      required: false,
      default: ''
    },
    attrib4: {
      type: String,
      required: false,
      default: ''
    },

  },
 
};
</script>