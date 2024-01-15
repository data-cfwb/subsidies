<template>
  <div class="container mx-auto">
    <div class="flex flex-row flex-wrap py-4">
        <aside class="w-full sm:w-1/3 md:w-1/4 px-2">
            <div class="sticky top-0 p-4 w-full">
                <!-- navigation -->
                <ul class="flex flex-col overflow-hidden">
                    <li><router-link to="/">Home</router-link></li>
                    <li><router-link to="/about">About</router-link></li>
                </ul>
            </div>
        </aside>
        <main role="main" class="w-full sm:w-2/3 md:w-3/4 pt-1 px-2">
            <!-- content area -->
            <HelloWorld msg="Welcome to Subsidies"/>
            <router-view></router-view>
        </main>
    </div>
</div>
<footer class="mt-auto">
    Réalisé avec ❤️ sous licence libre | <a href="https://github.com/data-cfwb/subsidies">Code source</a>
</footer>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>

<style>

</style>
