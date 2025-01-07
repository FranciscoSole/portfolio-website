window.onload = run;

function run(){
    document.getElementById('contact-form').addEventListener('submit', 
        function(event) {
            event.preventDefault(); // Previene el comportamiento por defecto del formulario (recarga de la página)
            
            // Obtiene los valores del formulario
            const message = document.getElementById('message').value;
        
            // Crea el enlace mailto con los valores del formulario
            const mailtoLink = `mailto:contacto@solefrancisco.com?subject=[Contacto]%20Nuevo%20mensaje%20desde%20portfolio&body=${encodeURIComponent(message)}`;
        
            // Redirige al usuario a su cliente de correo predeterminado
            window.location.href = mailtoLink;
        }
    );

    document.getElementById('menu-icon').addEventListener('click', 
        function() {
            let nav = document.getElementsByTagName("nav")[0]
        
            if (nav.style.flexDirection === "column") {
                nav.style.flexDirection = "row";
            } else {
                nav.style.flexDirection = "column"; 
            }
        
            let navLinks = document.getElementsByClassName('item'); 
            for (let i = 0; i < navLinks.length; i++) {
                navLinks[i].classList.toggle('active');
            }
        }
    );
}



