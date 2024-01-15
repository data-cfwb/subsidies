<template>
  <div class="container mx-auto">
    <div class="flex flex-row flex-wrap py-4">
        <aside class="w-full sm:w-1/3 md:w-1/4 px-2">
            <div class="sticky top-0 p-4 w-full">
                <!-- navigation -->
                <ul class="flex flex-col overflow-hidden">

                    <li><router-link to="/entreprises/0477.904.548">Home</router-link></li>
                    <li><router-link to="/entreprises/0419.172.434">Home</router-link></li>
                    <li><router-link to="/entreprises/0862.932.685">Home</router-link></li>

                    <li><router-link to="/statistiques">Stats</router-link></li>
                    <li><router-link to="/a-propos">À propos</router-link></li>

                </ul>
            </div>
        </aside>
        <main role="main" class="w-full sm:w-2/3 md:w-3/4 pt-1 px-2">
            <!-- content area -->
            <router-view></router-view>
        </main>
    </div>
</div>
<footer class="mt-auto">
    Réalisé avec ❤️ sous <a href="https://github.com/data-cfwb/subsidies/blob/main/LICENSE">licence libre</a> | <a href="https://github.com/data-cfwb/subsidies">Code source</a>
</footer>
</template>
