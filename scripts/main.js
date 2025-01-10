window.onload = loadWelcome;
function loadWelcome(){
    try{
        let aboutMe = document.getElementById("aboutMe");
        aboutMe.style.display = "none"

        const session = sessionStorage.getItem("loadingVidLoaded")
        if ((!session) || (session == "false")) {
            let text = document.getElementsByClassName("loadingText")[0];
            console.log("Loading intro video")
            text.addEventListener('animationend', function() {
                removeLoadingVid()
                aboutMe.style.display = "grid";
                sessionStorage.setItem("loadingVidLoaded", "true")
            });
        } else{
            removeLoadingVid()
            aboutMe.style.display = "grid";
            console.log("Skipping intro video")
        }
    } catch(e){
        throw new Error(`[${e}] in main.loadWelcome()`)
    }
}

function removeLoadingVid(){
    try{
        const video_items = ["loading", "blind"]
        
        for(let item of video_items){
            const actual_item = document.getElementById(item)
            actual_item.remove();
        }
    } catch(e){
        throw new Error(`[${e}] in main.removeLoadingVid()`)
    }
}