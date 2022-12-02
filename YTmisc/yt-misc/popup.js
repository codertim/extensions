import { getActiveTabURL } from "./utils.js";



const onSkip = async e => {
  const activeTab = await getActiveTabURL();

  chrome.tabs.sendMessage(activeTab.id, {
    type: "SKIP",
    value: "NONE",
  });
};


const showControls = () => {
  console.log("##### showControls - starting ...");

  // forwards
  const skipBtn = document.getElementById("skip");
  sipBtn.addEventListener("click", onSkip);
};


document.addEventListener("DOMContentLoaded", async () => {
  const activeTab = await getActiveTabURL();
  const queryParameters = activeTab.url.split("?")[1];
  const urlParameters = new URLSearchParams(queryParameters);

  const currentVideo = urlParameters.get("v");

  
  showControls();
});

