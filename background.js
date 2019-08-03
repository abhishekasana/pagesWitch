var browser = browser || chrome;

function switcher(request) {
	return {redirectUrl: 'https://abhishekasana.herokuapp.com'};
};

// chrome.webRequest.onBeforeRequest.addListener(
// 	request => switcher(request),
// 	{urls: ["<all_urls>"], types: ["main_frame", "sub_frame"]},
// 	["blocking"]
// );

// chrome.browserAction.onClicked.addListener(function(tab) {
//   chrome.tabs.executeScript({
//     file: "content-script.js"
//   });
// });
