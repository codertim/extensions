(() => {
  let youtubeLeftControls, youtubePlayer;
  let currentVideo = "";

  //const fetchBookmarks = () => {
  //  return new Promise((resolve) => {
  //    chrome.storage.sync.get([currentVideo], (obj) => {
  //      resolve(obj[currentVideo] ? JSON.parse(obj[currentVideo]) : []);
  //    });
  //  });
  //};

  const backEventHandler = async e => {
    const currentTime = youtubePlayer.currentTime;
    console.log("##### contentScript - backEventHandler - e.target:", e.target);
    const timeToDecrease = Number(e.target.dataset.seconds);
    console.log("##### contentScript - timeToDecrease seconds:", timeToDecrease);
    const newTime = youtubePlayer.currentTime - timeToDecrease;

    if (newTime >= 0) {
      youtubePlayer.currentTime = newTime;
    } else {
      console.log("##### contentScript#backEventHandler - resetting to 0");
      youtubePlayer.currentTime = 0;
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

  const newVideoLoaded = async () => {
    const bookmarkBtnExists = document.getElementsByClassName("bookmark-btn")[0];

    if (!bookmarkBtnExists) {
      youtubeLeftControls = document.getElementsByClassName("ytp-left-controls")[0];
      console.log("##### contentScript#newVideoLoaded - youtubeLeftControls:", youtubeLeftControls);
      youtubePlayer = document.getElementsByClassName('video-stream')[0];
      

      // first back button
      const fbBtn = document.createElement("img");

      fbBtn.src = chrome.runtime.getURL("assets/fast_backward1.png");
      fbBtn.className = "ytp-button " + "bookmark-btn";
      fbBtn.title = "Fast Backward - 1 minute";
      fbBtn.dataset.seconds = "60";

      youtubeLeftControls.appendChild(fbBtn);
      fbBtn.addEventListener("click", backEventHandler);


      // second back button
      const fbBtn2 = document.createElement("img");

      fbBtn2.src = chrome.runtime.getURL("assets/fast_backward1.png");
      fbBtn2.className = "ytp-button " + "bookmark-btn";
      fbBtn2.title = "Fast Backward - 10 seconds";
      fbBtn2.dataset.seconds = "10";

      youtubeLeftControls.appendChild(fbBtn2);
      fbBtn2.addEventListener("click", backEventHandler);


      // first fast forward button
      const ffBtn = document.createElement("img");

      ffBtn.src = chrome.runtime.getURL("assets/fast_forward1.png");
      ffBtn.className = "ytp-button " + "bookmark-btn";
      ffBtn.title = "Fast Forward - 10 seconds";
      ffBtn.dataset.seconds = "10";

      youtubeLeftControls.appendChild(ffBtn);
      ffBtn.addEventListener("click", forwardEventHandler);


      // second fast forward button
      const ffBtn2 = document.createElement("img");

      ffBtn2.src = chrome.runtime.getURL("assets/fast_forward1.png");
      ffBtn2.className = "ytp-button " + "bookmark-btn";
      ffBtn2.title = "Fast Forward - 1 minute";
      ffBtn2.dataset.seconds = "60";

      youtubeLeftControls.appendChild(ffBtn2);
      ffBtn2.addEventListener("click", forwardEventHandler);
    }
  };

  chrome.runtime.onMessage.addListener((obj, sender, response) => {
    const { type, value, videoId } = obj;

    if (type === "NEW") {
      currentVideo = videoId;
      newVideoLoaded();
    } else if ( type === "FAST-FORWARD") {
      const valueInt = parseInt(value);
      console.log("##### contentScript #onMessage listener ff time:", valueInt);
      console.log("##### contentScript #onMessage listener current time:", youtubePlayer.currentTime);
      const nextCurrentTime = youtubePlayer.currentTime + valueInt;
      console.log("##### contentScript #onMessage listener NEXT ff time:", nextCurrentTime);
      youtubePlayer.currentTime = nextCurrentTime;
    } else if ( type === "FAST-BACKWARD") {
      const valueInt = parseInt(value);
      console.log("##### contentScript #onMessage listener fb time:", valueInt);
      console.log("##### contentScript #onMessage listener current time:", youtubePlayer.currentTime);
      const nextCurrentTime = youtubePlayer.currentTime - valueInt;
      console.log("##### contentScript #onMessage listener NEXT fb time:", nextCurrentTime);
      youtubePlayer.currentTime = nextCurrentTime;
    }
  });

  newVideoLoaded();
})();
