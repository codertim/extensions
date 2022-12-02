(() => {
  let youtubeLeftControls, youtubePlayer;
  let currentVideo = "";

  

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
    const { type, value, videoId } = obj;

    if (type === "NEW") {
      //currentVideo = videoId;
      //newVideoLoaded();
    } else if ( type === "SKIP") {
      console.log("##### contentScript #onMessage - SKIP section starting ...");
      checkSkipButton();
    }
  });

  //newVideoLoaded();
})();
