function parseQueryString(query) {
    var vars = query.split("&");
    var query_string = {};
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        var key = decodeURIComponent(pair[0]);
        var value = decodeURIComponent(pair[1]);
        // If first entry with this name
        if (typeof query_string[key] === "undefined") {
            query_string[key] = decodeURIComponent(value);
            // If second entry with this name
        } else if (typeof query_string[key] === "string") {
            var arr = [query_string[key], decodeURIComponent(value)];
            query_string[key] = arr;
            // If third or later entry with this name
        } else {
            query_string[key].push(decodeURIComponent(value));
        }
    }
    return query_string;
}


// can send message from background checking if pages or page in url and recieve it in the background only using chrome runetime messaging
function handlePagination(shift, inputValue) {
    let queryObj = parseQueryString(window.location.search.substring(1));
    const {page, pages, p} = queryObj;
    let keyValue = page && ["page", parseInt(page)] || pages && ["pages", parseInt(pages)] || p && ["p", parseInt(p)];

    let [pageKey, pageValue=0] = keyValue;
    if (isNaN(pageValue)) {
        pageValue = 0;
    }
    if (shift === "next"){
        pageValue += 1;
    } else if (shift === "prev" && pageValue !== 0){
        pageValue -= 1;
    } else if (shift === "JUMP") {
        pageValue = inputValue;
    }
    var url = new URL(window.location.href);
    var query_string = url.search;
    var search_params = new URLSearchParams(query_string);
    search_params.set(pageKey, pageValue);
    url.search = search_params.toString();
    window.location.href = url.toString();
}

