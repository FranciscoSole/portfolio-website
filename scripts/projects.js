window.onload = run;

function run(){
    try{
        createCategories()
            .then(() => { return createProjects()})
            .then(() => { hideElements()})
            .catch((e) => {throw new Error(e)})
    } catch(e){
        throw new Error(`[${e}] in projects.run()`);
    }
}
/**
 * Crea dinámicamente las categorias de la pagina al cargarla
 * @returns {Promise}
 */
function createCategories(){
    return new Promise((resolve, reject) => {
        try{
            const main = document.getElementById("main")
            fetch("../json/projects_categories.json")
            .then((response) => response.json())
            .then((categories) => {
                const category_keys = Object.keys(categories);
    
                for(let category of category_keys){
                    const actual_category = categories[category];

                    let new_category_element = document.createElement("section");
                    new_category_element.className = "category";
                    new_category_element.id = category;
                    new_category_element.onclick = function() {openSectionProjects(this)};
    
                    let category_name_element = document.createElement("div");
                    category_name_element.id = "name"
                    category_name_element.textContent = actual_category["name"]
                    
                    let category_description_element = document.createElement("div");
                    category_description_element.id = "description"
                    category_description_element.textContent = actual_category["description"]
    
                    new_category_element.appendChild(category_name_element)
                    new_category_element.appendChild(category_description_element)
                    main.appendChild(new_category_element)
                }
    
                resolve();
            }).catch(reject)
        } catch(e){
            reject(`[${e}] in projects.createCategories()`);
        }
    });
}

/**
 * Crea dinámicamente los projectos de la pagina al cargar la pagina
 * @returns {Promise}
 */
function createProjects(){
    return new Promise((resolve, reject) => {
        try{
            const main = document.getElementById("main")
            fetch("../json/projects.json")
            .then((response) => response.json())
            .then((categories) => {
    
                fetch("../json/project_skills_images.json")
                .then((response) => response.json())
                .then((skill_images) => {
                    const category_keys = Object.keys(categories);
    
                    for(let category of category_keys){
                        const actual_category = categories[category];
                        const project_keys = Object.keys(actual_category);
    
                        let new_category_element = document.createElement("div");
                        new_category_element.id = category;
                        main.appendChild(new_category_element);
                        
                        for(let project of project_keys){
                            const actual_project = actual_category[project];
                            const project_id = project;
                            const project_name = actual_project["name"];
                            const project_skills = actual_project["skills"]
                            const project_github = actual_project["github"];
    
                            let new_project_element = document.createElement("div");
                            new_project_element.id = project_id;
                            new_project_element.className = "project";
                            new_project_element.onmouseenter = function() {showHideSkills(this);};
                            new_project_element.onmouseleave = function() {showHideSkills(this);};
                            new_project_element.onclick = function() {window.open(project_github, "_blank");};
    
                            let project_info_element = document.createElement("div");
                            project_info_element.className = "name";
                            project_info_element.textContent = project_name;
                            new_project_element.appendChild(project_info_element);
    
                            let project_skills_element = document.createElement("div")
                            project_skills_element.className = "skills"
    
                            for(let skill of project_skills){
                                let skill_image = document.createElement("img")
                                let skill_image_url = document.createComment(` Original image: ${skill_images[skill]} `);
    
                                skill_image.src =  `../img/${skill}.svg`
                                skill_image.id = skill
                                skill_image.alt = `Icono de ${skill}`
                                project_skills_element.appendChild(skill_image_url);
                                project_skills_element.appendChild(skill_image)
                            }
    
                            new_project_element.appendChild(project_skills_element)
                            new_category_element.appendChild(new_project_element) 
                        }
                    }

                    resolve()
                }).catch(reject);
            }).catch(reject);

        } catch(e){
            reject(`[${e}] in projects.createProjects()`);
        }
    });
}

/** 
 * Esconde todos los elementos al cargar la página 
 * */
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
 * @param {element} element = el elemento al que se le quiera cambiar el display
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
 * @param {Element} clickedSection = la categoria presionada 
 */
function openSectionProjects(clickedSection){
    try{
        const sections = document.getElementsByClassName("category")
        const sections_array = Array.from(sections).filter(section => section.id !== clickedSection.id)

        const sections_object = {
            "sections_clicked": clickedSection,
            "sections_in": sections_array,
            "sections_out": ""
        }
        checkAnimation("moveOut", sections_object);

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

        const backgroundVid = document.getElementById("projectVid");
        changeDisplay(backgroundVid, "block");

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

        changeDisplay(openSectionProjects, "block");
        changeDisplay(sectionToHide, "none");
    } catch(e){
        throw new Error(`[${e}] in projects.showSectionProjects()`);
    }
}

/**
 * Reacomoda las categorías en pantalla y esconde div con el texto "< Volver a las categorías".
 */
function closeSectionProjects(){
    try{
        const goBack = document.getElementById("goBack");
        
        const sections = document.getElementsByClassName("category")
        const sections_array = Array.from(sections)
        const sections_object = {
            "sections_clicked": "",
            "sections_in": "",
            "sections_out": sections_array
        }
        checkAnimation("moveIn", sections_object)
        
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
 * @param {string} animation = debe ser moveIn o moveOut exclusivamente
 * @param {object} sections_object = objeto con las propiedades "sections_clicked", "sections_in", y "sections_out"
 */
function checkAnimation(animation, sections_object){
    try{
        const goBack = document.getElementById("goBack");
        let target_section = null
        let target_animation = null
        let arrow_animation = null

        if(animation == "moveIn"){
            target_section = sections_object["sections_out"]
            target_animation = "moveInSections"
            arrow_animation = "moveOutBackArrow"
        } else{
            const sections_clicked = sections_object["sections_clicked"]
            setAnimation(sections_clicked, "moveOutClicked");

            target_section = sections_object["sections_in"]
            target_animation = "moveOutSecond"
            arrow_animation = "moveInBackArrow"
        }

        for(let section of target_section){
            setAnimation(section, target_animation);
        }

        setAnimation(goBack, arrow_animation, "3s", false);

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