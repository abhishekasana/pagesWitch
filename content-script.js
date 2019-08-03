function getQueryStringValue (key) {  
  return decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));  
}

function getQueryPair(key, typeCast){
	let value = getQueryStringValue(key);
	typeCast = typeof typeCast !== 'undefined' ? typeCast : true;

	if (typeCast===true && value !== NaN) {
		value = parseInt(value);
	}
	return [key, value];
}  

// can send message from background checking if pages or page in url and recieve it in the background only using chrome runetime messaging
function handlePagination(shift) {
	page = getQueryPair("page");
	pages = getQueryPair("pages");
	p = getQueryPair("p");
	keyValue = pages[1] && pages || page[1] && page || p[1] && p;
	let [pageKey, pageValue=0] = keyValue;
	if (isNaN(pageValue)) {
		pageValue = 0;
	}
	if (shift === "next"){
		pageValue += 1;
	} else if (shift === "prev" && pageValue !== 0){
		pageValue -= 1;
	}
	var url = new URL(window.location.href);
	var query_string = url.search;
	var search_params = new URLSearchParams(query_string);
	search_params.set(pageKey, pageValue);
	url.search = search_params.toString();
	window.location.href = url.toString();
}


var prev=document.createElement("div");
// prev.setAttribute(class, "button");
var next=document.createElement("div"); 
// next.setAttribute(class, "button");

var baseHeader=document.createElement("div"); 
baseHeader.innerHTML = "pageswitcher"
baseHeader.classList.add("dragheader");

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
parent.appendChild(next);
parent.appendChild(baseHeader);
// document.body.appendChild(parent);
document.body.insertBefore(parent, document.body.firstChild);

// draggable js

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (baseHeader) {
    // if present, the header is where you move the DIV from:
    baseHeader.onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV: 
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

dragElement(parent);

