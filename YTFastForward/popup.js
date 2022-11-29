import { getActiveTabURL } from "./utils.js";



const onFF = async e => {
  console.log("##### onFF - starting ...");
  const ffTime = e.target.dataset.fftime;
  console.log("##### onFF - ffTime =", ffTime);
  const activeTab = await getActiveTabURL();

  chrome.tabs.sendMessage(activeTab.id, {
    type: "FAST-FORWARD",
    value: ffTime,
  });
};


const onFB = async e => {
  console.log("##### onFB - starting ...");
  const time = e.target.dataset.fbtime;
  console.log("##### onFB - time =", time);
  const activeTab = await getActiveTabURL();

  chrome.tabs.sendMessage(activeTab.id, {
    type: "FAST-BACKWARD",
    value: time,
  });
};

const showXtraControls = () => {
  console.log("##### showXtraControls - starting ...");

  // forwards
  const btnFF10sEl = document.getElementById("ff10s");
  btnFF10sEl.addEventListener("click", onFF);

  const btnFF30sEl = document.getElementById("ff30s");
  btnFF30sEl.addEventListener("click", onFF);

  const btnFF60sEl = document.getElementById("ff60s");
  btnFF60sEl.addEventListener("click", onFF);

  const btnFF10mEl = document.getElementById("ff10m");
  btnFF10mEl.addEventListener("click", onFF);
  
  const btnFF1hEl = document.getElementById("ff1h");
  btnFF1hEl.addEventListener("click", onFF);

  // backwards
  const btnFB10sEl = document.getElementById("fb10s");
  btnFB10sEl.addEventListener("click", onFB);

  const btnFB30sEl = document.getElementById("fb30s");
  btnFB30sEl.addEventListener("click", onFB);

  const btnFB60sEl = document.getElementById("fb60s");
  btnFB60sEl.addEventListener("click", onFB);

  const btnFB10mEl = document.getElementById("fb10m");
  btnFB10mEl.addEventListener("click", onFB);
  
  const btnFB1hEl = document.getElementById("fb1h");
  btnFB1hEl.addEventListener("click", onFB);
};


const onPlay = async e => {
  const bookmarkTime = e.target.parentNode.parentNode.getAttribute("timestamp");
  const activeTab = await getActiveTabURL();

  chrome.tabs.sendMessage(activeTab.id, {
    type: "PLAY",
    value: bookmarkTime,
  });
};


const setBookmarkAttributes =  (src, eventListener, controlParentElement) => {
  const controlElement = document.createElement("img");

  controlElement.src = "assets/" + src + ".png";
  controlElement.title = src;
  controlElement.addEventListener("click", eventListener);
  controlParentElement.appendChild(controlElement);
};


document.addEventListener("DOMContentLoaded", async () => {
  const activeTab = await getActiveTabURL();
  const queryParameters = activeTab.url.split("?")[1];
  const urlParameters = new URLSearchParams(queryParameters);

  const currentVideo = urlParameters.get("v");

  /*
  if (activeTab.url.includes("youtube.com/watch") && currentVideo) {
    chrome.storage.sync.get([currentVideo], (data) => {
      const currentVideoBookmarks = data[currentVideo] ? JSON.parse(data[currentVideo]) : [];

      viewBookmarks(currentVideoBookmarks);
      showXtraControls();
    });
  } else {
    const container = document.getElementsByClassName("container")[0];

    container.innerHTML = '<div class="title">This is not a youtube video page.</div>';
  }
  */
  showXtraControls();
});

