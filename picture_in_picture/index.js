const videoElement = document.getElementById("video");
const button = document.getElementById("button");

// Prompt to select media stream, pass to video element, then play
async function selectMediaStream() {
  try {
    const mediaStream = await navigator.mediaDevices.getDisplayMedia();
    videoElement.srcObject = mediaStream;
    videoElement.onloadedmetadata = () => {
      videoElement.play();
    };
  } catch (error) {
    console.error(error);
  }
}

button.addEventListener("click", async () => {
    // disable button
    button.disabled = true;
    // start PiP 
    await videoElement.requestPictureInPicture();
    // reset button
    button.disabled = false;
});

// on load

selectMediaStream();
