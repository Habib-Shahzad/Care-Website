const environment = "RELEASE";

const api =
    environment === "dev"
        ? "http://localhost:3000/api"
        : "https://asherewecare.pk/api";

export default api;
