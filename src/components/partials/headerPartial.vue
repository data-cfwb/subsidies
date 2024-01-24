<template>
  <header>
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <h1 class="text-3xl font-bold leading-tight tracking-tight text-gray-900">
        {{ title }}
      </h1>
      <p class="mt-0 text-base text-gray-500">
        {{ subtitle }}
      </p>
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
    }
  },
 
};
</script>