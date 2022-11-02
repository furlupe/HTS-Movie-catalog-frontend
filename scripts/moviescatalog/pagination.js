import { get } from "./../requests.js"
import { fillCatalog } from "./moviescatalog.js";
import { URL_GET_PAGE } from "../requests_consts.js";

export function showPagination(page){
    get(URL_GET_PAGE(page))
    .then(res => {
        $(".pagination").empty();

        let $template = $(".page-template");
        let pcount = res.pageInfo.pageCount;
        for (var i = 0; i <= pcount + 1; i++) {
            let $page = $template.clone();
            let value = i;

            if (i == 0) {
                $page = $(".page-prev").clone();
                value = (page > 1) ? page - 1 : 1
            }            
            else if (i == pcount + 1) {
                $page = $(".page-next").clone();
                value = (page < pcount) ? page + 1 : pcount;
            }
            else $page.find('.page-link').text(i);

            $page.removeClass('d-none');
            $page.attr("value", value);

            if (i == page) $page.addClass("active");

            $(".pagination").append($page);
        }

        registerPaginationEvents();
    }).catch(error => console.log(error));
}

function registerPaginationEvents() { 
    $(".page-item").click(function () { 
        let id = parseInt($(this).attr('value'));

        history.replaceState("a", "Page", `/${id}`);
        localStorage.setItem("currentMoviesListPage", id);
        fillCatalog(id);
        showPagination(id);
     })
}