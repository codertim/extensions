import { getActiveTabURL } from "./utils.js";



const onSkip = async e => {
  console.log("##### onSkip - starting ...");
  const activeTab = await getActiveTabURL();

  chrome.tabs.sendMessage(activeTab.id, {
    type: "SKIP",
    value: "NONE",
  });
};


const onHideRightNav = async e => {
  console.log("##### onHideRightNav - starting ...");
  const activeTab = await getActiveTabURL();
  console.log("##### onHideRightNav - activeTab:", activeTab);

  chrome.tabs.sendMessage(activeTab.id, {
    type: "HIDE-RIGHT-NAV",
    value: "NONE",
  });
};


const showControls = () => {
  console.log("##### showControls - starting ...");

  // forwards
  const skipBtn = document.getElementById("skip");
  skipBtn.addEventListener("click", onSkip);

  // hide right nav
  const hideRightNavBtn = document.getElementById("hide-right-nav");
  hideRightNavBtn.addEventListener("click", onHideRightNav);
};


document.addEventListener("DOMContentLoaded", async () => {
  const activeTab = await getActiveTabURL();
  const queryParameters = activeTab.url.split("?")[1];
  const urlParameters = new URLSearchParams(queryParameters);

  const currentVideo = urlParameters.get("v");

  showControls();
});

