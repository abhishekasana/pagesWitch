var prev=document.createElement("div");
var next=document.createElement("div");
var inputField = document.createElement("input");
var baseHeader=document.createElement("div");

inputField.type = "number";

inputField.addEventListener("click", ()=>{next.innerHTML = "JUMP"; next.onclick = () => handlePagination('JUMP', inputField.value);});

const {page, pages, p} = parseQueryString(window.location.search.substring(1));

baseHeader.innerHTML = "PAGESWITCH".concat(" ", "[", page || pages || p || "", "]");
baseHeader.classList.add("dragheader");
baseHeader.addEventListener("click", ()=>{next.innerHTML = "NEXT"});

prev.innerHTML = "PREV";
prev.classList.add("paginator-button");
prev.id = "previous";
prev.onclick = () => handlePagination('prev');

next.innerHTML = "NEXT";
next.classList.add("paginator-button");
next.id = "next";
next.onclick = () => handlePagination('next');

var parent=document.createElement("div");
parent.classList.add("draggable");
parent.appendChild(prev);
parent.appendChild(inputField);
parent.appendChild(next);
parent.appendChild(baseHeader);
// document.body.appendChild(parent);
document.body.insertBefore(parent, document.body.firstChild);

dragElement(parent);
