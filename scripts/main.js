window.onload = loadWelcome();

function loadWelcome(){
    try{
        let aboutMe = document.getElementById("aboutMe")
        aboutMe.style.display = "none";
    
        let vid = document.getElementById("loadingVid");
        vid.playbackRate = 2;
        vid.onended = function(){
            document.getElementById("loading").remove();
            aboutMe.style.display = "grid";
            showMainMenu();
        }
    } catch(e){
        throw new Error(`[${e}] in main.loadWelcome()`)
    }
}

function showMainMenu(){
    try{
        document.getElementById("blind").remove()
        document.getElementById("mainVid").playbackRate = 0.75;
    } catch(e){
        throw new Error(`[${e}] in main.showMainMenu()`)
    }
}