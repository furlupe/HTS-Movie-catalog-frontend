import {URL_DETERMINATOR } from "./pages_constants.js";

export function getContent(path) {
    for (let d in URL_DETERMINATOR) {
        let inside = URL_DETERMINATOR[d];

        if (!inside.regexp.test(path)) continue;

        $("#navbar").find(`#${d}`).addClass("text-white");
        return inside.data(path);
    }
}