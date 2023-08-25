const environment = "dev";

const api =
    environment === "dev"
        ? "http://localhost:3000/api"
        : "${API}/api";

export default api;
