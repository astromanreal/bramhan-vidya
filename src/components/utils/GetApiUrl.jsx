const isProduction = false;
// Set to true for production, false for local

const apiConfig = {
  production: "https://bramhan-vidya-api.vercel.app",
  local: "http://localhost:4000",
};

const apiUrl = isProduction ? apiConfig.production : apiConfig.local;

export default apiUrl;
