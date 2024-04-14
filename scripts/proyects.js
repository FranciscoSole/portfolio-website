window.onload = hideElements();

/** Esconde todos los elementos hardcodeados al cargar la página
 */
function hideElements(){
    try{
        changeDisplay(document.getElementById("proyectVid"), "none");
        changeDisplay(document.getElementById("goBack"), "none");
        changeDisplay(document.getElementById("universityProyects"), "none");
        changeDisplay(document.getElementById("hobbyProyects"), "none");

        for(let proyectInfo of document.getElementsByName("proyectInfo")){
            changeDisplay(proyectInfo, "none");
        }

    } catch(e){
        throw new Error(`[${e} in proyects.hideElements()]`);
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
        throw new Error(`[${e} in proyects.changeDisplay()]`);
    }
}

/**
 * Desplaza las categorías hacia afuera de la pantalla con sentido <- y muestra el div con el texto "< Volver a las categorías".
 * @param {string} clickedSection = id de la sección o elemento a la que se le hizo click
 * @param {string} secondSection = id de la sección o elemento a la que no se le hizo click
 */
function openSectionProyects(clickedSection, secondSection){
    try{
        let clicked = document.getElementById(clickedSection);
        let second = document.getElementById(secondSection);
        let changeTextDelay = 400;
        let changeTextDelay2 = (clickedSection == "university") ? 350 : 500; //determina lo que debe demorar en moverse el texto según la categoría clickeada
        let backgroundVid = document.getElementById("proyectVid");
        
        changeDisplay(backgroundVid, "block");
        checkAnimation("moveOut", clicked, second);
        setTimeout(function(){
            setTimeout(function(){ // Lo esconde después de 1 segundo
                goBack.innerText = "< Volver a las categorías";
            }, changeTextDelay);

            goBack.innerText = "<";
            changeDisplay(goBack, "flex");
        }, changeTextDelay2);

        showSectionProyects(clickedSection);
    } catch(e){
        throw new Error(`[${e} in proyects.openSectionProyects()]`);
    }
}

/**
 * Recibe la sección a mostrar en pantalla
 * @param {string} section = Puede ser "university" u otro (preferentemente "hobby" para legibilidad y escalabilidad a futuro)
 */
function showSectionProyects(section){
    try{
        let show, hide;
        if(section == "university"){
            show = "universityProyects";
            hide = "hobbyProyects";
        } else{
            show = "hobbyProyects";
            hide = "universityProyects";
        }
        
        let openSection = document.getElementById(show);
        let closeSection = document.getElementById(hide);
        changeDisplay(openSection, "block");
        changeDisplay(closeSection, "none");
    } catch(e){
        throw new Error(`[${e} in proyects.showSectionProyects()]`);
    }
}

/**
 * Reacomoda las categorías en pantalla y esconde div con el texto "< Volver a las categorías".
 * @param {string} targetSection = id de la sección o elemento a mover
 * @param {string} targetSection2 = id de la sección o elemento a mover
 */
function closeSectionProyects(targetSection, targetSection2){
    try{
        let section = document.getElementById(targetSection);
        let section2 = document.getElementById(targetSection2);
        let goBack = document.getElementById("goBack");

        checkAnimation("moveIn", section, section2);
        setTimeout(function(){ // Le establece como texto "<" a los 1.1 segundos para que quede más lindo cuando se desliza
            goBack.innerText = "<";

            setTimeout(function(){ // Lo esconde después de 1 segundo
                changeDisplay(goBack, "none");
            }, 1000);
        }, 1100);
    } catch(e){
        throw new Error(`[${e} in proyects.openSectionProyects()]`);
    }
}

/**
 * Determina que animaciones utilizar para los elementos recibidos.
 * @param {string} targetAnimation = puede ser "moveIn" o cualquier otro (preferentemente "moveOut" para legibilidad y escalabilidad a futuro)
 * @param {element} section = primer elemento a aplicar animación
 * @param {element} section2 = segundo elemento a aplicar la animación
 */
function checkAnimation(targetAnimation, section, section2){
    try{
        let goBack = document.getElementById("goBack");

        if(targetAnimation == "moveIn"){
            setAnimation(section, "moveInSections");
            setAnimation(section2, "moveInSections");
            setAnimation(goBack, "moveOutBackArrow", "3s",false);
        } else{
            setAnimation(section, "moveOutClicked");
            setAnimation(section2, "moveOutSecond");
            setAnimation(goBack, "moveInBackArrow", "3s", false);
        }
    } catch(e){
        throw new Error(`[${e} in proyects.checkAnimation()]`);
    }
}

/**
 * Establece animaciones. Puede ser las que checkAnimation() determinó o no. 
 * @param {element} sectionElement = elemento recibido para establecer la animación
 * @param {string} keyframe = nombre del keyframe que se le debe establecer al elemento
 * @param {boolean} relativePosition = parámetro OPCIONAL con true por defecto. true -> también se le agrega una posición relativa al elemento. false -> no se le agrega la posición relativa
 */
function setAnimation(sectionElement, keyframe, time="3s", relativePosition=true){
    try{
        if(relativePosition){
            sectionElement.style.position = "relative";
        }

        sectionElement.style.animation = `${keyframe} ease ${time} 1 forwards`;
    } catch(e){
        throw new Error(`[${e} in proyects.setAnimation()]`);
    }
}

/**
 * Muestra o esconde los skills del proyecto dependiendo de que si se están mostrando (los skills) o no 
 * @param {element} proyectElement = proyecto al que se le hace :hover
 */
function showHideProyectSkills(proyectElement){
    try{
        let proyectMainInfo = proyectElement.children[0];
        let proyectChildSkills = proyectMainInfo.children[1];
        
        if(isHidden(proyectChildSkills)){
            changeDisplay(proyectMainInfo, "grid");
            changeDisplay(proyectChildSkills, "inline-table");
            setAnimation(proyectChildSkills, "showProyectSkills", "0.5s");
        } else{
            setAnimation(proyectMainInfo, "moveDownName", "0.5s");
            setAnimation(proyectChildSkills, "hideProyectSkills", "0.5s");
            
            setTimeout(function(){ // Lo esconde pasados 200 milésimas de segundo
                changeDisplay(proyectChildSkills, "none");
            }, 200);
        }
    } catch(e){
        throw new Error(`[${e} in proyects.showHideProyectSkills()]`);
    }
}

/**
 * Valida que un elemento esté escondido
 * @param {element} proyectElement = el elemento a validar
 * @returns {boolean} = devuelve true solamente si el display del elemento es none
 */
function isHidden(proyectElement){
    try{
        return (proyectElement.style.display == "none");
    } catch(e){
        throw new Error(`[${e} in proyects.isHidden()]`);
    }
}