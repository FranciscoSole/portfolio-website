window.onload = loadWelcome();

function loadWelcome(){
    let aboutMe = document.getElementById("aboutMe")
    aboutMe.style.display = "none";

    let vid = document.getElementById("loadingVid");
    vid.playbackRate = 2;
    vid.onended = function(){
        document.getElementById("loading").remove();
        aboutMe.style.display = "grid";
        showMainMenu();
    }
}

function showMainMenu(){
    document.getElementById("blind").remove()
    let vid = document.getElementById("mainVid");
    vid.playbackRate = 0.75;
}