window.onload = hideElements;

/** Esconde todos los elementos hardcodeados al cargar la página */
function hideElements(){
    try{
        changeDisplay(document.getElementById("projectVid"), "none");
        changeDisplay(document.getElementById("goBack"), "none");
        changeDisplay(document.getElementById("university"), "none");
        changeDisplay(document.getElementById("hobby"), "none");

        const skills = document.getElementsByClassName("skills")
        const skillsArray = Array.from(skills)

        for(let projectSkills of skillsArray){
            changeDisplay(projectSkills, "none")
        }
    } catch(e){
        throw new Error(`[${e}] in projects.hideElements()`);
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
        throw new Error(`[${e}] in projects.changeDisplay()`);
    }
}

/**
 * Desplaza las categorías hacia afuera de la pantalla con sentido <- y muestra el div con el texto "< Volver a las categorías".
 * @param {string} clickedSection = id de la sección o elemento a la que se le hizo click
 * @param {string} secondSection = id de la sección o elemento a la que no se le hizo click
 */

function getSectionsObject(){
    try{
        return {
            "university_section": "hobby_section",
            "hobby_section": "university_section"
        }
    } catch(e){
        throw new Error(`[${e}] in projects.getSectionsObject()`);
    }
}

/**
 * Abre la categoria deseada y esconde la otra
 * @param {Element} clickedSection = la categoria presionada 
 */
function openSectionProjects(clickedSection){
    try{
        const backgroundVid = document.getElementById("projectVid");
        changeDisplay(backgroundVid, "block");
        
        const sections = getSectionsObject()
        const hideSection = document.getElementById(sections[clickedSection.id]);
        checkAnimation("moveOut", clickedSection, hideSection);

        const section_timer = {
            "university_section": 350,
            "hobby_section": 500
        }
        const goBackTextDelay = 400;
        const goBackTextDelay2 = section_timer[clickedSection.id]
        const goBack = document.getElementById("goBack");

        //se lee de adentro para afuera, primero va el 2do setTimeout()
        setTimeout(function(){
            setTimeout(function(){ // Lo esconde después de 1 segundo
                goBack.innerText = "< Volver a las categorías";
            }, goBackTextDelay);

            goBack.innerText = "<";
            changeDisplay(goBack, "flex");
        }, goBackTextDelay2);

        showSectionProjects(clickedSection.id);
    } catch(e){
        throw new Error(`[${e}] in projects.openSectionProjects()`);
    }
}

/**
 * Recibe la sección a mostrar en pantalla
 * @param {string} section_name = tiene que ser el nombre de la seccion a mostrar
 */
function showSectionProjects(section_name){
    try{
        const categoryToSection = {
            "university_section": "university",
            "hobby_section": "hobby"
        }
        const hideCategorySection = {
            "university_section": "hobby",
            "hobby_section": "university"
        }

        const selectedSection = categoryToSection[section_name]
        const openSectionProjects = document.getElementById(selectedSection);
        
        const hideSectionProjects = hideCategorySection[section_name]
        const sectionToHide = document.getElementById(hideSectionProjects)
        console.log(openSectionProjects)

        changeDisplay(openSectionProjects, "block");
        changeDisplay(sectionToHide, "none");
    } catch(e){
        throw new Error(`[${e}] in projects.showSectionProjects()`);
    }
}

/**
 * Reacomoda las categorías en pantalla y esconde div con el texto "< Volver a las categorías".
 * @param {string} targetSection = id de la sección o elemento a mover
 */
function closeSectionProjects(targetSection, targetSection2){
    try{
        const section = document.getElementById(targetSection);
        const section2 = document.getElementById(targetSection2);
        const goBack = document.getElementById("goBack");

        checkAnimation("moveIn", section, section2);

        //se lee de adentro para afuera, primero va el 2do setTimeout()
        setTimeout(function(){ // Le establece como texto "<" a los 1.1 segundos para que quede más lindo cuando se desliza
            goBack.innerText = "<";
            
            setTimeout(function(){ // Lo esconde después de 1 segundo
                changeDisplay(goBack, "none");
            }, 1000);
        }, 1100);
    } catch(e){
        throw new Error(`[${e}] in projects.openSectionProjects()`);
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
        const goBack = document.getElementById("goBack");

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
        throw new Error(`[${e}] in projects.checkAnimation()`);
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
        throw new Error(`[${e}] in projects.setAnimation()`);
    }
}

/**
 * Muestra o esconde los skills del proyecto dependiendo de que si se están mostrando o no 
 * @param {element} project = proyecto al que se le hace :hover
 */
function showHideSkills(project){
    try{
        const skills = project.children[1]
        if(isHidden(skills)){
            changeDisplay(project, "inline-grid")
            changeDisplay(skills, "inline-table");
            setAnimation(skills, "showSkills", "0.5s");
        } else{
            changeDisplay(project, "inline-grid")
            changeDisplay(skills, "inline-table");
            setAnimation(skills, "moveDownName", "0.5s");
            setAnimation(skills, "hideSkills", "0.5s");
            
            setTimeout(function(){ // Lo esconde pasados 200 milésimas de segundo
                changeDisplay(skills, "none");
            }, 200);
        }
    } catch(e){
        throw new Error(`[${e}] in projects.showHideSkills()`);
    }
}

/**
 * Valida que un elemento esté escondido
 * @param {element} element = el elemento a validar si está oculto
 * @returns {boolean} = devuelve true solamente si el display del elemento es none, caso contrario devuelve false
 */
function isHidden(element){
    try{
        return (element.style.display == "none");
    } catch(e){
        throw new Error(`[${e}] in projects.isHidden()`);
    }
}