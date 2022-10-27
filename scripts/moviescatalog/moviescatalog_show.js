import { fillCatalog } from "./moviescatalog.js";
import { showPagination } from "./pagination.js";

export function showCatalogPage() {
    var page = localStorage.getItem("currentMoviesListPage");
    console.log(page);
    page = page ? page : 1
    fillCatalog(page);
    showPagination(page);
}