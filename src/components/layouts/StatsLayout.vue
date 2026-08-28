<template>
  <HeaderPartial
    title="Statistiques"
    subtitle="Les subventions de la Fédération Wallonie-Bruxelles en chiffres"
  />
  <main>
    <!-- Fixed table-of-contents on very wide screens (avoids scrolling back up). -->
    <nav
      v-if="data_loaded"
      class="hidden 2xl:flex flex-col gap-1 fixed right-6 top-28 z-20 text-sm"
    >
      <a
        v-for="link in menu"
        :key="link.href"
        :href="link.href"
        class="rounded px-3 py-1 text-gray-600 hover:bg-blue-50 hover:text-dark-blue"
      >
        {{ link.label }}
      </a>
    </nav>

    <div
      v-if="data_loaded"
      class="mx-auto max-w-7xl px-6 lg:px-8 mt-10 space-y-8"
    >
      <!-- In-page menu (all screen sizes) -->
      <nav class="bg-white rounded-lg shadow-sm p-4">
        <p class="text-xs uppercase tracking-wide text-gray-400 mb-2">
          Sur cette page
        </p>
        <ul class="flex flex-wrap gap-x-4 gap-y-1 text-sm">
          <li
            v-for="link in menu"
            :key="link.href"
          >
            <a
              :href="link.href"
              class="text-light-blue hover:text-dark-blue underline"
            >
              {{ link.label }}
            </a>
          </li>
        </ul>
      </nav>

      <!-- Chart 1: sum by year and competence -->
      <section
        id="competence-amount"
        class="bg-white rounded-lg shadow-sm p-6 scroll-mt-6"
      >
        <h2 class="text-lg font-semibold text-dark-blue mb-4">
          Somme des subventions (€) par année et compétence
        </h2>
        <div
          class="relative"
          style="height: 620px"
        >
          <BarChart
            :data="competenceAmountChart"
            :options="euroStackedOptions"
          />
        </div>
      </section>

      <!-- Chart 2: count by year and competence -->
      <section
        id="competence-count"
        class="bg-white rounded-lg shadow-sm p-6 scroll-mt-6"
      >
        <h2 class="text-lg font-semibold text-dark-blue mb-4">
          Nombre de liquidations de subvention par année et compétence
        </h2>
        <div
          class="relative"
          style="height: 620px"
        >
          <BarChart
            :data="competenceCountChart"
            :options="countStackedOptions"
          />
        </div>
      </section>

      <!-- Chart 3: sum by year and minister -->
      <section
        id="ministre-amount"
        class="bg-white rounded-lg shadow-sm p-6 scroll-mt-6"
      >
        <h2 class="text-lg font-semibold text-dark-blue mb-4">
          Somme des subventions (€) agrégée par année et ministre
        </h2>
        <div
          class="relative"
          style="height: 560px"
        >
          <BarChart
            :data="ministreAmountChart"
            :options="euroStackedOptions"
          />
        </div>
      </section>

      <!-- Chart 4: table by beneficiary type and year (in millions €, excludes "Inconnu") -->
      <section
        id="beneficiary-table"
        class="bg-white rounded-lg shadow-sm p-6 scroll-mt-6"
      >
        <h2 class="text-lg font-semibold text-dark-blue mb-4">
          Somme des subventions par type de bénéficiaire et par année
          <span class="text-sm font-normal text-gray-400">(en millions €)</span>
        </h2>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200 text-sm">
            <thead>
              <tr>
                <th class="py-2 pr-4 text-left font-semibold text-gray-700">
                  Type de bénéficiaire
                </th>
                <th
                  v-for="year in beneficiaryTable.years"
                  :key="year"
                  class="px-3 py-2 text-right font-semibold text-gray-700"
                >
                  {{ year }}
                </th>
                <th class="px-3 py-2 text-right font-semibold text-gray-900">
                  Total
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr
                v-for="row in beneficiaryTable.rows"
                :key="row.label"
              >
                <td class="py-2 pr-4 text-left text-gray-700">
                  {{ row.label }}
                </td>
                <td
                  v-for="(cell, i) in row.cells"
                  :key="i"
                  class="px-3 py-2 text-right tabular-nums text-gray-600"
                >
                  {{ toMio(cell) }}
                </td>
                <td class="px-3 py-2 text-right tabular-nums font-semibold text-gray-900">
                  {{ toMio(row.total) }}
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr class="border-t-2 border-gray-300">
                <td class="py-2 pr-4 text-left font-semibold text-gray-900">
                  Total général
                </td>
                <td
                  v-for="(total, i) in beneficiaryTable.colTotals"
                  :key="i"
                  class="px-3 py-2 text-right tabular-nums font-semibold text-gray-900"
                >
                  {{ toMio(total) }}
                </td>
                <td class="px-3 py-2 text-right tabular-nums font-bold text-dark-blue">
                  {{ toMio(beneficiaryTable.grandTotal) }}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </section>

      <!-- Chart 5: one small bar chart per beneficiary type, each with its own y scale -->
      <section
        id="beneficiary-facets"
        class="bg-white rounded-lg shadow-sm p-6 scroll-mt-6"
      >
        <h2 class="text-lg font-semibold text-dark-blue mb-1">
          Somme des subventions (€) par type de bénéficiaire (comparaison annuelle)
        </h2>
        <p class="text-sm text-gray-500 mb-4">
          Échelle verticale propre à chaque type (en millions €), « Inconnu » exclu.
        </p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          <div
            v-for="facet in beneficiaryFacets"
            :key="facet.key"
          >
            <h3 class="text-sm font-semibold text-gray-700 mb-2 text-center">
              {{ facet.title }}
            </h3>
            <div
              class="relative"
              style="height: 260px"
            >
              <BarChart
                :data="facet.data"
                :options="facet.options"
              />
            </div>
          </div>
        </div>
      </section>

      <!-- Sources -->
      <section
        id="sources"
        class="bg-white rounded-lg shadow-sm p-6 scroll-mt-6"
      >
        <h2 class="text-lg font-semibold text-dark-blue mb-4">
          Sources des données
        </h2>
        <p class="text-sm text-gray-600 mb-3">
          Les sources de ces données sont accessibles à travers les différents exports
          possibles sur ODWB :
        </p>
        <ul class="list-disc pl-5 space-y-1 text-sm">
          <li
            v-for="year in sourceYears"
            :key="year"
          >
            <a
              :href="`https://www.odwb.be/explore/dataset/fwb-cadastre-des-subventions-${year}/`"
              target="_blank"
              rel="noopener"
              class="text-light-blue hover:text-dark-blue underline"
            >
              Cadastre des subventions {{ year }}
            </a>
          </li>
        </ul>
      </section>
    </div>

    <div v-else>
      <LoadingFwb />
    </div>
  </main>
</template>

<script>
import axios from 'axios';
import { API_BASE } from '@/config.js';
import BarChart from '@/components/charts/BarChart.vue';
import { getColorFromCompetence } from '@/composables/getColorFromCompetence.js';
import { getColorFromPalette } from '@/composables/getColorFromPalette.js';

// Formatters reused inside Chart.js option callbacks.
const EUR = new Intl.NumberFormat('fr-FR', {
  style: 'currency', currency: 'EUR', maximumFractionDigits: 0
});
const EUR_COMPACT = new Intl.NumberFormat('fr-FR', {
  style: 'currency', currency: 'EUR', notation: 'compact', maximumFractionDigits: 1
});
const NUM = new Intl.NumberFormat('fr-FR');
const MIO = new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 1 });

// The default color returned by getColorFromCompetence for unmapped competences.
const COMPETENCE_DEFAULT = '#49508B';
// Beneficiary type excluded from all beneficiary views.
const HIDDEN_BENEFICIARY = 'Inconnu';
// Beneficiary types additionally excluded from the annual-comparison facets only.
const FACET_HIDDEN_BENEFICIARY = ['E - entité étrangère'];

export default {
  name: 'StatsLayout',
  components: { BarChart },
  data() {
    return {
      data_loaded: false,
      byCompetence: [], // { year, competence, amount_sum, count }
      byMinistre: [], // { year, ministre, amount_sum }
      byBeneficiary: [], // { beneficiary_type, year, amount_sum, count }
      menu: [
        { href: '#competence-amount', label: 'Compétence (€)' },
        { href: '#competence-count', label: 'Compétence (nombre)' },
        { href: '#ministre-amount', label: 'Ministre (€)' },
        { href: '#beneficiary-table', label: 'Bénéficiaire (tableau)' },
        { href: '#beneficiary-facets', label: 'Bénéficiaire (annuel)' },
        { href: '#sources', label: 'Sources' }
      ]
    };
  },
  computed: {
    sourceYears() {
      return [...new Set(this.byCompetence.map(r => r.year))].sort((a, b) => a - b);
    },
    competenceAmountChart() {
      return this.pivot(this.byCompetence, 'year', 'competence', 'amount_sum',
        (name, i) => this.competenceColor(name, i));
    },
    competenceCountChart() {
      return this.pivot(this.byCompetence, 'year', 'competence', 'count',
        (name, i) => this.competenceColor(name, i));
    },
    ministreAmountChart() {
      return this.pivot(this.byMinistre, 'year', 'ministre', 'amount_sum',
        (name, i) => getColorFromPalette(i));
    },
    // Rows for the beneficiary views, with "Inconnu" filtered out.
    beneficiaryRows() {
      return this.byBeneficiary.filter(r => r.beneficiary_type !== HIDDEN_BENEFICIARY);
    },
    beneficiaryTable() {
      const rows = this.beneficiaryRows;
      const years = [...new Set(rows.map(r => r.year))].sort((a, b) => a - b);
      const types = [...new Set(rows.map(r => r.beneficiary_type))]
        .sort((a, b) => String(a).localeCompare(String(b), 'fr'));
      const lookup = {};
      rows.forEach(r => {
        lookup[`${r.beneficiary_type}__${r.year}`] = r.amount_sum;
      });
      const tableRows = types.map(t => {
        const cells = years.map(y => lookup[`${t}__${y}`] ?? 0);
        const total = cells.reduce((a, b) => a + b, 0);
        return { label: this.cleanLabel(t), cells, total };
      });
      const colTotals = years.map((y, i) => tableRows.reduce((a, r) => a + r.cells[i], 0));
      const grandTotal = colTotals.reduce((a, b) => a + b, 0);
      return { years, rows: tableRows, colTotals, grandTotal };
    },
    // One small bar chart per beneficiary type; each keeps its own auto-scaled y axis.
    beneficiaryFacets() {
      const rows = this.beneficiaryRows
        .filter(r => !FACET_HIDDEN_BENEFICIARY.includes(r.beneficiary_type));
      const years = [...new Set(rows.map(r => r.year))].sort((a, b) => a - b);
      const types = [...new Set(rows.map(r => r.beneficiary_type))]
        .sort((a, b) => String(a).localeCompare(String(b), 'fr'));
      const lookup = {};
      rows.forEach(r => {
        lookup[`${r.beneficiary_type}__${r.year}`] = r.amount_sum;
      });
      const options = this.facetOptions();
      return types.map(t => ({
        key: t,
        title: this.cleanLabel(t),
        data: {
          labels: years.map(String),
          datasets: [{
            label: this.cleanLabel(t),
            data: years.map(y => lookup[`${t}__${y}`] ?? 0),
            backgroundColor: years.map((y, i) => getColorFromPalette(i))
          }]
        },
        options
      }));
    },
    euroStackedOptions() {
      return this.buildOptions({ stacked: true, currency: true });
    },
    countStackedOptions() {
      return this.buildOptions({ stacked: true, currency: false });
    }
  },
  mounted() {
    this.load();
  },
  methods: {
    load() {
      const url = `${API_BASE}/stats/aggregate`;
      Promise.all([
        axios.get(url, { params: { dimensions: 'year,competence' } }),
        axios.get(url, { params: { dimensions: 'year,ministre', measures: 'amount_sum' } }),
        axios.get(url, { params: { dimensions: 'beneficiary_type,year' } })
      ]).then(([competence, ministre, beneficiary]) => {
        this.byCompetence = competence.data.data;
        this.byMinistre = ministre.data.data;
        this.byBeneficiary = beneficiary.data.data;
        this.data_loaded = true;
      }).catch(error => {
        console.log(error);
      });
    },
    // Pivot flat aggregate rows into a Chart.js { labels, datasets } shape.
    // indexKey -> x-axis categories, seriesKey -> one dataset each, valueKey -> the measure.
    pivot(rows, indexKey, seriesKey, valueKey, colorFn) {
      const rawLabels = [...new Set(rows.map(r => r[indexKey]))].sort(this.compare);
      const series = [...new Set(rows.map(r => r[seriesKey]))].sort(this.compare);
      const lookup = {};
      rows.forEach(r => {
        lookup[`${r[indexKey]}__${r[seriesKey]}`] = r[valueKey];
      });
      const datasets = series.map((s, i) => ({
        label: this.cleanLabel(s),
        data: rawLabels.map(l => lookup[`${l}__${s}`] ?? 0),
        backgroundColor: colorFn(s, i)
      }));
      return { labels: rawLabels.map(l => this.cleanLabel(l)), datasets };
    },
    compare(a, b) {
      if (typeof a === 'number' && typeof b === 'number') return a - b;
      return String(a).localeCompare(String(b), 'fr');
    },
    // Strip the "M - " style single-letter prefix on beneficiary types; leave the rest as-is.
    cleanLabel(value) {
      if (typeof value === 'string') {
        const match = value.match(/^[A-Z] - (.+)$/);
        if (match) return match[1].charAt(0).toUpperCase() + match[1].slice(1);
      }
      return String(value);
    },
    // Keep the FWB brand color when known, otherwise fall back to the qualitative palette.
    competenceColor(name, index) {
      const color = getColorFromCompetence(name);
      return color === COMPETENCE_DEFAULT ? getColorFromPalette(index) : color;
    },
    // Format a euro amount as millions, e.g. 20349200000 -> "20 349,2 M€".
    toMio(value) {
      return `${MIO.format(value / 1e6)} M€`;
    },
    buildOptions({ stacked, currency }) {
      const fmt = currency ? EUR : NUM;
      const axisFmt = currency ? EUR_COMPACT : NUM;
      return {
        responsive: true,
        maintainAspectRatio: false,
        // Show only the hovered segment (index mode listed every series = unreadable).
        interaction: { mode: 'nearest', intersect: true },
        plugins: {
          legend: {
            position: 'bottom',
            labels: { boxWidth: 12, font: { size: 11 } }
          },
          tooltip: {
            callbacks: {
              label: ctx => `${ctx.dataset.label}: ${fmt.format(ctx.parsed.y)}`
            }
          }
        },
        scales: {
          x: { stacked },
          y: {
            stacked,
            beginAtZero: true,
            ticks: { callback: value => axisFmt.format(value) }
          }
        }
      };
    },
    // Options for a single beneficiary-type facet: no legend, y axis in millions €.
    facetOptions() {
      return {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'nearest', intersect: true },
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: ctx => `${MIO.format(ctx.parsed.y / 1e6)} M€`
            }
          }
        },
        scales: {
          x: {},
          y: {
            beginAtZero: true,
            ticks: { callback: value => `${MIO.format(value / 1e6)} M` }
          }
        }
      };
    }
  }
};
</script>
