// API Configuration
// Default production URL - can be overridden by VUE_APP_API_BASE_URL environment variable
// eslint-disable-next-line no-undef
const API_BASE_URL = process.env.VUE_APP_API_BASE_URL || 'https://subventions-api.dcldev02.intranet.etnic.be';

export { API_BASE_URL };
