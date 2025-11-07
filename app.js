document.addEventListener("DOMContentLoaded", function() {
    const carouselImage = document.getElementById("carouselImage");
    if (carouselImage) {       
        
        const images = [
            "imagenes/Mirador_del_Sol_Camino_al_filo_serrano.jpg", 
            "imagenes/potrero_de_los_funes.jpg", 
            "imagenes/salto-del-tabaquillo2.jpg"  
        ];
        
        let currentIndex = 0;
        
        const prevBtn = document.getElementById("prevBtn");
        const nextBtn = document.getElementById("nextBtn");

        function updateImage() {
            carouselImage.src = images[currentIndex]; 
            const container = document.querySelector('.carousel-container');
            if (images[currentIndex] === "") {
                 container.style.backgroundColor = '#d0d0d0';
            } else {
                 container.style.backgroundColor = 'transparent';
            }
        }

        nextBtn.addEventListener("click", function() {
            currentIndex++;
            if (currentIndex >= images.length) {
                currentIndex = 0;
            }
            updateImage();
        });


        prevBtn.addEventListener("click", function() {
            currentIndex--;
            if (currentIndex < 0) {
                currentIndex = images.length - 1;
            }
            updateImage();
        });

        updateImage();
    }


    
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        
        contactForm.addEventListener("submit", function(event) {
            event.preventDefault(); 
            
            let isValid = true;
            
            clearErrors();
            
            const nombre = document.getElementById("nombre");
            const email = document.getElementById("email");
            const telefono = document.getElementById("telefono");
            
            // 3. Validaciones
            
            // Nombre: Obligatorio, longitud máx 50
            if (nombre.value.trim() === "") {
                showError("errorNombre", "El nombre es obligatorio.", nombre);
                isValid = false;
            } else if (nombre.value.trim().length > 50) {
                showError("errorNombre", "El nombre no puede superar los 50 caracteres.", nombre);
                isValid = false;
            }

            // Email: Obligatorio, Expresión Regular
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (email.value.trim() === "") {
                showError("errorEmail", "El email es obligatorio.", email);
                isValid = false;
            } else if (!emailRegex.test(email.value.trim())) {
                showError("errorEmail", "El formato del email no es válido.", email);
                isValid = false;
            }

            // Teléfono: Obligatorio, Expresión Regular (10 dígitos)
            const telRegex = /^\d{10}$/;
            if (telefono.value.trim() === "") {
                showError("errorTelefono", "El teléfono es obligatorio.", telefono);
                isValid = false;
            } else if (!telRegex.test(telefono.value.trim())) {
                showError("errorTelefono", "Debe ser un número de 10 dígitos (ej: 2664123456).", telefono);
                isValid = false;
            }

           
            const successContainer = document.getElementById("form-success");
            successContainer.innerHTML = ""; 

            if (isValid) {
                const successTitle = document.createElement("h3");
                successTitle.textContent = "¡Consulta enviada con éxito!";

                const successNombre = document.createElement("p");
                successNombre.textContent = `Nombre: ${nombre.value.trim()}`;
                
                const successEmail = document.createElement("p");
                successEmail.textContent = `Email: ${email.value.trim()}`;
                
                const successTel = document.createElement("p");
                successTel.textContent = `Teléfono: ${telefono.value.trim()}`;

                successContainer.appendChild(successTitle);
                successContainer.appendChild(successNombre);
                successContainer.appendChild(successEmail);
                successContainer.appendChild(successTel);
                
                contactForm.reset(); 
            }
        });

        // Función auxiliar para mostrar errores
        function showError(errorId, message, inputElement) {
            document.getElementById(errorId).textContent = message;
            inputElement.classList.add("error");
        }

        // Función auxiliar para limpiar errores
        function clearErrors() {
            const errorSpans = document.querySelectorAll(".error-message");
            errorSpans.forEach(span => span.textContent = "");
            
            const errorInputs = document.querySelectorAll(".form-group input.error");
            errorInputs.forEach(input => input.classList.remove("error"));
        }
    }

});