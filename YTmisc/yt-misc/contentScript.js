(() => {
  let youtubeLeftControls, youtubePlayer;
  let currentVideo = "";
  let videoOpacity = 1.0;

  
  const dimVideo = () => {
    console.log("##### contentScript#dimVideo - starting");
    const videoEl = document.getElementById("primary-inner");
    console.log("##### contentScript#dimVideo - videoEl:", videoEl);
    console.log("##### contentScript#deimVideo - current opacity:", videoEl.style.opacity);
    videoOpacity = videoOpacity - 0.1;
    console.log("##### contentScript#deimVideo - new video opacity:", videoOpacity);
    if (videoOpacity < 0) {
      videoOpacity = 1.0;
    }
    videoEl.style.opacity = videoOpacity;
  };

  const hideRightNav = () => {
    console.log("##### contentScript#hideRightNav - starting");
    const rightNavEl = document.getElementById("secondary-inner");
    console.log("##### contentScript#hideRightNav - rightNavEl:", rightNavEl);
    rightNavEl.style.opacity = 0.1;
  };

  const checkSkipButton = () => {
      console.log("##### checkSkipButton - starting");
	    var skipButton = document.getElementsByClassName('ytp-ad-skip-button')[0];
	    if (skipButton) {
          skipButton.click();
      } else {
	      setTimeout(checkSkipButton, 1000);
	    }
  };

  const forwardEventHandler = async e => {
    const currentTime = youtubePlayer.currentTime;
    console.log("##### contentScript - fowardEventHandler - e.target:", e.target);
    const timeToFoward = Number(e.target.dataset.seconds);
    console.log("##### contentScript - timeToForward seconds:", timeToFoward);
    const newTime = youtubePlayer.currentTime + timeToFoward;
    youtubePlayer.currentTime = newTime;

    //const newBookmark = {
    //  time: currentTime,
    //  desc: "Bookmark at " + getTime(currentTime),
    //};
    //currentVideoBookmarks = await fetchBookmarks();
    //chrome.storage.sync.set({
    //  [currentVideo]: JSON.stringify([...currentVideoBookmarks, newBookmark].sort((a, b) => a.time - b.time))
    //});
  };

  
  chrome.runtime.onMessage.addListener((obj, sender, response) => {
    console.log("##### contentScript.js - chrome.runtime.onMessage.addListener - starting - obj:", obj);
    const { type, value, videoId } = obj;

    if (type === "NEW") {
      //currentVideo = videoId;
      //newVideoLoaded();
    } else if ( type === "SKIP") {
      console.log("##### contentScript #onMessage - SKIP section starting ...");
      checkSkipButton();
    } else if ( type === "HIDE-RIGHT-NAV") {
      console.log("##### contentScript #onMessage - hide right nav ...");
      hideRightNav();
    } else if ( type === "DIM-VIDEO") {
      console.log("##### contentScript #onMessage - dim video ...");
      dimVideo();
    }
  });

  //newVideoLoaded();
})();
