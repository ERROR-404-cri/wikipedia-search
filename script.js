let input = document.getElementById('input');
let infoDiv = document.getElementById('info');
let infoarr = [];

input.addEventListener('focusin', function () {
    input.placeholder = "";
});
input.addEventListener('focusout', function () {
    input.placeholder = "Search your curiosity";
});

input.addEventListener('input', debounced(find, 500));

function debounced(fn, delay) {
    let timer;
    let self = this;
    return function() {
        if(timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(fn,delay);
    };
}

function debouncedFind() {
    return debounced(find, 100);
}

async function find() {
    try{
        let searchTerm = input.value;
        let apiUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info|extracts&inprop=url&utf8=&format=json&origin=*&srlimit=10&srsearch=${searchTerm}`;
        if (searchTerm) {
            let res = await fetch(apiUrl);
            res = await res.json();
            infoarr = res ?.query ?.search;
            console.log(res);
            infoDiv.innerHTML = ``;
            infoarr.forEach(res => {
                // console.log(res.title,res.snippet);
                createinfo(res.title, res.snippet);
            });
        }
    }
    catch(err){
        infoDiv.innerHTML = `Something went wrong, Try again...`;
    }

}

function createinfo(title, snippet) {
    let elem = document.createElement('strong');
    let detail = document.createElement('p');
    elem.innerHTML = `${title}`;
    detail.innerHTML = `${snippet}...`;
    infoDiv.append(elem);
    infoDiv.append(detail);
}