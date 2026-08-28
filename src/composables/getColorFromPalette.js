// Qualitative palette for series that have no dedicated brand color
// (ministres, and competences not covered by getColorFromCompetence).
// Built around the FWB charte-graphique hues, then extended with enough
// additional distinct steps to keep ~20 stacked series readable.
// Source of the base hues: https://github.com/data-cfwb/charte-graphique/
const PALETTE = [
  '#42A09E', '#3A97C9', '#85C38E', '#E37276', '#BE80B6', '#ED9E41',
  '#49508B', '#F2A900', '#CB333B', '#001A70', '#4A5563', '#7BC5A0',
  '#2F3765', '#9B6B9E', '#D46A6A', '#5B8FB0', '#C9A227', '#6FB07F',
  '#B5651D', '#8E7CC3', '#3D9970', '#FF851B', '#39CCCC', '#B10DC9',
];

export function getColorFromPalette(index) {
  return PALETTE[index % PALETTE.length];
}

export default getColorFromPalette;
