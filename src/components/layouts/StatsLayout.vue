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
        <h2 class="text-lg font-semibold text-dark-blue">
          {{ titles.competenceAmount }}
        </h2>
        <p class="text-sm text-gray-500 mb-4">
          Somme des subventions par année et compétence, en euros courants.
          Les {{ TOP_COMPETENCES }} plus grosses compétences en couleur, les autres regroupées en gris.
        </p>
        <div
          class="relative"
          style="height: 620px"
        >
          <BarChart
            :data="competenceAmountChart"
            :options="euroStackedOptions"
          />
        </div>
        <p class="text-xs text-gray-500 mt-4">
          ⚠️ Les montants ne tiennent pas compte de l'inflation ni de l'indexation.
          Certaines compétences changent de nom d'une année à l'autre : « Enseignement supérieur » (2019)
          devient « Enseignement supérieur et recherche » (2020-), « Enfance » (2019, 2024) alterne avec
          « Enfance et politique de drogue » (2020-2025). Une série qui s'arrête n'est donc pas forcément une baisse.
        </p>
      </section>

      <!-- Chart 2: count by year and competence -->
      <section
        id="competence-count"
        class="bg-white rounded-lg shadow-sm p-6 scroll-mt-6"
      >
        <h2 class="text-lg font-semibold text-dark-blue">
          {{ titles.competenceCount }}
        </h2>
        <p class="text-sm text-gray-500 mb-4">
          Nombre de liquidations de subvention par année et compétence.
          Les {{ TOP_COMPETENCES }} compétences les plus fréquentes en couleur, les autres regroupées en gris.
        </p>
        <div
          class="relative"
          style="height: 620px"
        >
          <BarChart
            :data="competenceCountChart"
            :options="countStackedOptions"
          />
        </div>
        <p class="text-xs text-gray-500 mt-4">
          ⚠️ Une liquidation est un paiement : une même subvention peut être liquidée en plusieurs fois.
          Une hausse du nombre de liquidations ne signifie donc pas forcément plus de bénéficiaires.
        </p>
      </section>

      <!-- Chart 3: sum by year and minister -->
      <section
        id="ministre-amount"
        class="bg-white rounded-lg shadow-sm p-6 scroll-mt-6"
      >
        <h2 class="text-lg font-semibold text-dark-blue">
          {{ titles.ministreAmount }}
        </h2>
        <p class="text-sm text-gray-500 mb-4">
          Somme des subventions par année et ministre, en euros courants.
        </p>
        <div
          class="relative"
          style="height: 560px"
        >
          <BarChart
            :data="ministreAmountChart"
            :options="euroStackedOptions"
          />
        </div>
        <p class="text-xs text-gray-500 mt-4">
          ⚠️ Les portefeuilles changent avec les gouvernements (2019, 2024) : une année de transition mêle
          deux équipes ministérielles.
        </p>
      </section>

      <!-- Chart 4: table by beneficiary type and year (in millions €, excludes "Inconnu") -->
      <section
        id="beneficiary-table"
        class="bg-white rounded-lg shadow-sm p-6 scroll-mt-6"
      >
        <h2 class="text-lg font-semibold text-dark-blue">
          {{ titles.beneficiaryTable }}
        </h2>
        <p class="text-sm text-gray-500 mb-4">
          Somme des subventions par type de bénéficiaire et par année, en millions d'euros courants
          (« Inconnu » exclu), triée par total.
        </p>
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
                <th class="px-3 py-2 text-right font-semibold text-gray-900 whitespace-nowrap">
                  % du total
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
                  class="px-3 py-2 text-right tabular-nums text-gray-600 whitespace-nowrap"
                >
                  {{ toMio(cell) }}
                </td>
                <td class="px-3 py-2 text-right tabular-nums font-semibold text-gray-900 whitespace-nowrap">
                  {{ toMio(row.total) }}
                </td>
                <td class="px-3 py-2 text-right tabular-nums text-gray-600 whitespace-nowrap">
                  {{ toPct(row.total / beneficiaryTable.grandTotal) }}
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
                  class="px-3 py-2 text-right tabular-nums font-semibold text-gray-900 whitespace-nowrap"
                >
                  {{ toMio(total) }}
                </td>
                <td class="px-3 py-2 text-right tabular-nums font-bold text-dark-blue whitespace-nowrap">
                  {{ toMio(beneficiaryTable.grandTotal) }}
                </td>
                <td class="px-3 py-2 text-right tabular-nums font-semibold text-gray-900 whitespace-nowrap">
                  100 %
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
        <h2 class="text-lg font-semibold text-dark-blue">
          {{ titles.beneficiaryFacets }}
        </h2>
        <p class="text-sm text-gray-500 mb-4">
          Somme des subventions par année, un graphique par type de bénéficiaire, en millions d'euros courants.
          <strong class="font-semibold text-gray-700">Attention : chaque graphique a sa propre échelle verticale</strong>
          (comparez les tendances, pas les hauteurs). « Inconnu » et « Entité étrangère » exclus.
        </p>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
          <div
            v-for="facet in beneficiaryFacets"
            :key="facet.key"
          >
            <h3 class="text-sm font-semibold text-gray-700 text-center">
              {{ facet.title }}
            </h3>
            <p class="text-xs text-gray-500 mb-2 text-center">
              {{ facet.subtitle }}
            </p>
            <div
              class="relative"
              style="height: 260px"
            >
              <BarChart
                :data="facet.data"
                :options="facet.options"
              />
            </div>
            <p
              v-for="note in facet.notes"
              :key="note"
              class="text-xs text-gray-500 mt-2"
            >
              ⚠️ {{ note }}
            </p>
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
const MD = new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 2 });
const PCT = new Intl.NumberFormat('fr-FR', { style: 'percent', maximumFractionDigits: 0 });
const PCT_SIGNED = new Intl.NumberFormat('fr-FR', {
  style: 'percent', maximumFractionDigits: 0, signDisplay: 'exceptZero'
});

// Number of competences shown in color; the rest is merged into a grey "Autres" series.
const TOP_COMPETENCES = 8;
const OTHER_LABEL = 'Autres';
const OTHER_COLOR = '#D1D5DB';
// Single color for the beneficiary facets; anomalous years get the accent color.
const FACET_COLOR = '#2F3765';
const FACET_ANOMALY_COLOR = '#F2A900';
// A year-on-year ratio below 1/x or above x is flagged as "to check in the source".
const ANOMALY_RATIO = 5;
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
      TOP_COMPETENCES,
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
    // One color per competence shown in either chart, assigned by amount rank so that a
    // competence keeps the same color in the amount and count charts.
    competenceColors() {
      const shown = new Set([
        ...this.rankSeries(this.byCompetence, 'competence', 'amount_sum').slice(0, TOP_COMPETENCES),
        ...this.rankSeries(this.byCompetence, 'competence', 'count').slice(0, TOP_COMPETENCES)
      ]);
      const colors = {};
      this.rankSeries(this.byCompetence, 'competence', 'amount_sum')
        .filter(name => shown.has(name))
        .forEach((name, i) => { colors[name] = getColorFromPalette(i); });
      return colors;
    },
    competenceAmountChart() {
      return this.pivotTop(this.byCompetence, 'year', 'competence', 'amount_sum',
        TOP_COMPETENCES, name => this.competenceColors[name]);
    },
    competenceCountChart() {
      return this.pivotTop(this.byCompetence, 'year', 'competence', 'count',
        TOP_COMPETENCES, name => this.competenceColors[name]);
    },
    // Chart titles state the main finding, computed from the data so they stay true.
    titles() {
      const amountByYear = this.sumBy(this.byCompetence, 'year', 'amount_sum');
      const countByYear = this.sumBy(this.byCompetence, 'year', 'count');
      const years = Object.keys(amountByYear).map(Number).sort((a, b) => a - b);
      const [first, last] = [years[0], years[years.length - 1]];

      // Competence explaining most of the change in count between the first and last year.
      const countDelta = countByYear[last] - countByYear[first];
      const firstCounts = this.sumBy(this.byCompetence.filter(r => r.year === first), 'competence', 'count');
      const lastCounts = this.sumBy(this.byCompetence.filter(r => r.year === last), 'competence', 'count');
      const driver = Object.keys(lastCounts)
        .map(c => ({ c, delta: lastCounts[c] - (firstCounts[c] ?? 0) }))
        .sort((a, b) => b.delta - a.delta)[0];
      const countDriver = countDelta > 0 && driver
        ? ` : ${driver.c} explique ${PCT.format(driver.delta / countDelta)} de la hausse`
        : '';

      const ministreLast = this.sumBy(this.byMinistre.filter(r => r.year === last), 'ministre', 'amount_sum');
      const ministreTotal = Object.values(ministreLast).reduce((a, b) => a + b, 0);
      const topMinistre = Object.entries(ministreLast).sort((a, b) => b[1] - a[1])[0];

      const table = this.beneficiaryTable;
      const topType = table.rows[0];
      const otherMax = Math.max(0, ...table.rows.slice(1)
        .flatMap(r => r.cells));

      return {
        competenceAmount: `La somme des subventions passe de ${this.toMd(amountByYear[first])} en ${first} `
          + `à ${this.toMd(amountByYear[last])} en ${last} `
          + `(${PCT_SIGNED.format(amountByYear[last] / amountByYear[first] - 1)}, en euros courants)`,
        competenceCount: `${NUM.format(countByYear[last])} liquidations en ${last}, `
          + `contre ${NUM.format(countByYear[first])} en ${first}${countDriver}`,
        ministreAmount: topMinistre
          ? `En ${last}, ${PCT.format(topMinistre[1] / ministreTotal)} des montants relèvent `
            + `des compétences de ${topMinistre[0]}`
          : 'Somme des subventions par année et ministre',
        beneficiaryTable: topType
          ? `${topType.label} : ${PCT.format(topType.total / table.grandTotal)} des subventions `
            + `de ${first} à ${last}`
          : 'Somme des subventions par type de bénéficiaire',
        beneficiaryFacets: topType
          ? `Hors « ${topType.label.toLowerCase()} », aucun type ne dépasse ${this.toMio(otherMax)} par an`
          : 'Somme des subventions par type de bénéficiaire'
      };
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
      }).sort((a, b) => b.total - a.total);
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
      return types.map(t => {
        const values = years.map(y => lookup[`${t}__${y}`] ?? 0);
        const [first, last] = [values[0], values[values.length - 1]];
        // Flag sudden jumps or drops: more likely a coding change than a real trend.
        const anomalies = years.slice(1).map((y, i) => {
          const [prev, cur] = [values[i], values[i + 1]];
          const ratio = prev > 0 && cur > 0 ? cur / prev : null;
          return ratio && (ratio > ANOMALY_RATIO || ratio < 1 / ANOMALY_RATIO)
            ? { index: i + 1, year: y, prevYear: years[i], change: ratio - 1 }
            : null;
        }).filter(Boolean);
        const flagged = new Set(anomalies.map(a => a.index));
        return {
          key: t,
          title: this.cleanLabel(t),
          subtitle: first > 0
            ? `${years[0]} → ${years[years.length - 1]} : ${PCT_SIGNED.format(last / first - 1)}`
            : '',
          notes: anomalies.map(a => `${a.year} : ${PCT_SIGNED.format(a.change)} par rapport à `
            + `${a.prevYear}, à vérifier dans la source (changement de codage ?).`),
          data: {
            labels: years.map(String),
            datasets: [{
              label: this.cleanLabel(t),
              data: values,
              backgroundColor: values.map((v, i) => (flagged.has(i) ? FACET_ANOMALY_COLOR : FACET_COLOR))
            }]
          },
          options
        };
      });
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
    // Like pivot, but keeps the n largest series (by total of valueKey), largest at the bottom
    // of the stack, and merges the others into one grey "Autres" series on top.
    pivotTop(rows, indexKey, seriesKey, valueKey, n, colorFn) {
      const top = this.rankSeries(rows, seriesKey, valueKey).slice(0, n);
      const isTop = new Set(top);
      const labels = [...new Set(rows.map(r => r[indexKey]))].sort(this.compare);
      const lookup = {};
      const other = {};
      rows.forEach(r => {
        const key = r[indexKey];
        if (isTop.has(r[seriesKey])) {
          lookup[`${key}__${r[seriesKey]}`] = r[valueKey];
        } else {
          other[key] = (other[key] ?? 0) + (r[valueKey] ?? 0);
        }
      });
      const datasets = top.map(s => ({
        label: this.cleanLabel(s),
        data: labels.map(l => lookup[`${l}__${s}`] ?? 0),
        backgroundColor: colorFn(s)
      }));
      if (Object.keys(other).length) {
        datasets.push({
          label: OTHER_LABEL,
          data: labels.map(l => other[l] ?? 0),
          backgroundColor: OTHER_COLOR
        });
      }
      return { labels: labels.map(l => this.cleanLabel(l)), datasets };
    },
    // Series names sorted by their total of valueKey, largest first.
    rankSeries(rows, seriesKey, valueKey) {
      const totals = this.sumBy(rows, seriesKey, valueKey);
      return Object.keys(totals).sort((a, b) => totals[b] - totals[a]);
    },
    sumBy(rows, key, valueKey) {
      const totals = {};
      rows.forEach(r => {
        totals[r[key]] = (totals[r[key]] ?? 0) + (r[valueKey] ?? 0);
      });
      return totals;
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
    // Format a euro amount as millions, e.g. 20349200000 -> "20 349,2 M€"; 0 -> "–".
    toMio(value) {
      if (!value) return '–';
      if (value < 0.05e6) return '< 0,1 M€';
      return `${MIO.format(value / 1e6)} M€`;
    },
    // Format a euro amount as billions, e.g. 2960000000 -> "2,96 Md€".
    toMd(value) {
      return `${MD.format(value / 1e9)} Md€`;
    },
    toPct(ratio) {
      if (ratio > 0 && ratio < 0.005) return '< 1 %';
      return PCT.format(ratio);
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
