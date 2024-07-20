window.onload = hideElements();

/** Esconde todos los elementos hardcodeados al cargar la página
 */
function hideElements(){
    try{
        changeDisplay(document.getElementById("working"), "none");
        changeDisplay(document.getElementById("student"), "none");
        changeDisplay(document.getElementById("me"), "none");

    } catch(e){
        throw new Error(`[${e}] in info.hideElements()`);
    }
}

/**
 * Cambia el estado del elemento que se le pase como parámetro.
 * @param {element} element = el elemento que se le pase (el objeto en sí, no un id!)
 * @param {string} value = nombre del valor a establecerle, ej "none"
 */
function changeDisplay(element, value){
    try{
        element.style.display = value;
    } catch(e){
        throw new Error(`[${e}] in info.changeDisplay()`);
    }
}

/**
 * Mueve el elemento correspondiente al id que se le pase como primer parámetro, lo esconde y muestra el segundo parámetro.
 * @param {string} actualSlide = el id del slide actual
 * @param {string} nextSlide = el id del slide siguiente
 */
function moveSlide(actualSlide, nextSlide){
    try{
        let actual = document.getElementById(actualSlide);
        let next = document.getElementById(nextSlide);
        let moveOutAnimation = (actualSlide == "start")? "moveOutStart":"moveOutClicked";
        let moveInAnimation;
        let timer;

        if(nextSlide == "start"){
            moveInAnimation = "moveInStart";
            timer = 1150;
        } else{
            moveInAnimation = "moveInNext";
            timer = 1250;
        }

        next.style.animation = `${moveInAnimation} ease 2s 1 forwards`;
        actual.style.animation = `${moveOutAnimation} ease 3s 1 forwards`;
        setTimeout(function(){
            changeDisplay(actual, "none")
            if(nextSlide == "start"){
                changeDisplay(next, "inline-flex");
            } else{
                changeDisplay(next, "block");
            }
        }, timer);
    } catch(e){
        throw new Error(`[${e}] in info.moveSlide()`);
    }
}