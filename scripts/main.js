window.onload = loadWelcome;
function loadWelcome(){
    try{
        let aboutMe = document.getElementById("aboutMe");
        aboutMe.style.display = "none"

        const session = sessionStorage.getItem("loadingVidLoaded")
        if ((!session) || (session == "false")) {
            console.log("Loading intro video")

            let vid = document.getElementById("loadingVid");
            vid.playbackRate = 2;
            vid.play().then(() => {
                vid.onended = function () {
                    sessionStorage.setItem("loadingVidLoaded", "true");
                    removeLoadingVid(aboutMe)
                };
            }).catch((error) => {
                console.error("Error playing the video: ", error);
                removeLoadingVid(aboutMe)
            });
        } else{
            console.log("Skipping intro video")
            removeLoadingVid(aboutMe)
        }

        document.getElementById("mainVid").playbackRate = 0.75;
    } catch(e){
        throw new Error(`[${e}] in main.loadWelcome()`)
    }
}

function removeLoadingVid(aboutMe){
    try{
        document.getElementById("loading").remove();
        document.getElementById("blind").remove();
        aboutMe.style.display = "grid";
    } catch(e){
        throw new Error(`[${e}] in main.removeLoadingVid()`)
    }
}