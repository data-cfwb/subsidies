<template>
  <div class="col-span-12 py-5 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
    <HeaderPartial
      title="À propos"
    />

    <main class="">
      <div class="mx-auto max-w-7xl px-6 lg:px-8 mt-10">
        <p class="text-base font-semibold leading-7 text-gray-500 uppercase">
          Données ouvertes & applicatifs libres
        </p>
        <div class="mt-10 grid max-w-xl grid-cols-1 gap-8 text-base leading-7 text-gray-700 lg:max-w-none lg:grid-cols-2">
          <div>
            <p class="mt-4" />
            <p class="mt-4">
              L'application vise à mettre en évidence les subventions accordées par la Fédération Wallonie-Bruxelles aux organisations actives dans le sport, l'enseignement, la culture, la jeunesse, les médias, l'éducation permanente et la recherche scientifique.
            </p>
          </div>
          <div>
            <p class="mt-4">
              Les données sources sont disponibles sur le portail <a
                href="https://www.odwb.be/"
                target="_blank"
              >odwb.be</a> et sur la <a
                href="https://economie.fgov.be/fr/themes/entreprises/banque-carrefour-des"
                target="_blank"
              >banque carrefour des entreprises</a>.
            </p>
            <p>
              Chaque jeu de donnée est soumis à une licence spécifique. Veuillez-vous référer à la page de chaque jeu de données pour plus d'informations.
            </p>
            <p class="mt-4">
              Les données sont mises à disposition via  <a
                href="https://github.com/data-cfwb/BE_companies_api"
              >une API publique</a>.
            </p>
          </div>
        </div>
        <p class="text-base font-semibold leading-7 text-gray-500 uppercase mt-16">
          Clause de non-responsabilité
        </p>
        <div class="mt-10 grid max-w-xl grid-cols-1 gap-8 text-base leading-7 text-gray-700 lg:max-w-none lg:grid-cols-2">
          <div>
            <!-- <p class="mt-4">
            https://economie.fgov.be/sites/default/files/Files/Entreprises/BCE/Licence-BCE-Open-Data-Conditions-d-utilisation.pdf
          </p> -->
            <p class="mt-4">
              Les données présentes à travers cette interface sont fournies à titre indicatif et ne peuvent être considérées comme exhaustives.
            </p>
            <p class="mt-4">
              Elles ne peuvent en aucun cas être utilisées à des fins commerciales. Les données sont mises à jour annuellement. 
            </p>
          </div>
          <div>
            <p class="mt-4">
              Les données sont fournies telles quelles, sans aucune garantie de leur exactitude, de leur exhaustivité ou de leur actualité.
            </p>
            <p class="mt-4">
              La Fédération Wallonie-Bruxelles ne peut être tenue responsable de l'utilisation qui pourrait être faite de ces données. En cas de doute, il est recommandé de consulter les données sources sur la plateforme <a
                href="https://www.odwb.be/"
                target="_blank"
              >odwb.be</a>.
            </p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>