window.onload = run;

function run(){
    try{
        createInformation()
            .then(() => { hideElements()})
            .catch((e) => {throw new Error(e)})
    } catch(e){
        throw new Error(`[${e}] in projects.run()`);
    }
}

/**
 * Crea las informaciones dinamicamente
 * @returns {Promise}
 */
function createInformation(){
    return new Promise((resolve, reject) => {
        try{
            const main = document.getElementById("main")
            fetch("../json/info.json")
            .then((response) => response.json())
            .then((information) => {
                const information_keys = Object.keys(information);

                for(let index = 0; index < information_keys.length; index++){
                    const actual_slide = information_keys[index]
                    const actual_information = information[actual_slide]
                    
                    let new_information_element = document.createElement("section");
                    new_information_element.id = actual_slide;
                    
    
                    let information_title_element = document.createElement("div");
                    information_title_element.id = "title"
                    information_title_element.textContent = actual_information["title"]
                    new_information_element.appendChild(information_title_element)

                    let information_description_element = document.createElement("div");
                    information_description_element.id = "description"
                    
                    actual_information["description"].forEach((paragraph, index) => {
                        const text = document.createElement("p");
                        text.textContent = paragraph;
                        information_description_element.appendChild(text);
                    
                        // Agregar <br><br> solo si no es el último párrafo
                        if (index < actual_information["description"].length - 1) {
                            const br = document.createElement('br')
                            information_description_element.appendChild(br);
                            information_description_element.appendChild(br);
                        }

                    });
                    new_information_element.appendChild(information_description_element)
                    
                    let next_slide = (index + 1 < information_keys.length) ? information_keys[index + 1] : "start";
                    let arrow_information__element = document.createElement("div");
                    arrow_information__element.id = "arrow"
                    arrow_information__element.textContent = "< presione para continuar >"
                    arrow_information__element.onclick = function() {moveSlide(actual_slide, next_slide)};
                    new_information_element.appendChild(arrow_information__element)

                    main.appendChild(new_information_element)
                }
                resolve();
            }).catch(reject)
        } catch(e){
            reject(`[${e}] in projects.createInformation()`);
        }
    });
}

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