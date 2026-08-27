/* global process */
// Central API base URL.
//
// Override at build time with VUE_APP_API_BASE (e.g. a local FastAPI instance
// at http://localhost:8000/api). Defaults to the production gateway.
export const API_BASE =
  process.env.VUE_APP_API_BASE ||
  'https://api.etnic.be:7443/external/dataoffice/subventions/api';
