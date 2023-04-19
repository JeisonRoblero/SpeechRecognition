function ReconocimientoDeVoz(){
    const btn = document.querySelector('.hablar');
    const contenido = document.querySelector('.contenido');
    const respuesta = document.querySelector('.respuesta');
    errort = 'Error: '
    const tu = `Tú: `;
    const ia = 'IA: ';

    //Saludos
    const hola = ['Hola',
    'Hola, ¡bienvenido a esta página web!',
    'Hola, ¿cómo te va?'];

    const saludos = ['Estoy muy bien y ¿tú qué tal?',
    'Genial, aquí tratando de conquistar el mundo',
    'No tan bien como tú'];

    const clima = ['El clima está fresco pana rabit',
    'El clima está bien',
    'Vas a necesitar un suater para hoy'];

    try {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.lang = "es-Mx";

        recognition.onstart = function () {
            console.log('La voz está activada, puedes hablar');
            btn.textContent = `ESCUCHANDO...`;
            contenido.style.background = "rgba(80, 80, 80, 0.24)";
            document.querySelector('.instrucciones').style.color = "white";
            document.querySelector('.instrucciones').style.background = "#00F05B";
            document.querySelector('.instrucciones').textContent = `La entrada de voz está activada, puedes hablar...`;
        };

        recognition.onresult = function(event) {
            const indiceActual = event.resultIndex;

            const texto = event.results[indiceActual][0].transcript;
            contenido.classList.toggle('texto-active');
            contenido.textContent = tu + texto;

            readOutLoud(texto);
        };

        recognition.onerror = function(event) {
            if(event.error == 'no-speech'){
                errort = '🧏 No se escucha, intenta hablar más fuerte o acercarte más al micrófono 🎙️ -> ';
            } else if(event.error == 'network'){
                errort = '📡 Error, no hay conexión a internet 😥 -> ';
            } else if(event.error == 'not-allowed'){
                errort = '⛔ Error, tu navegador no permite la entrada de audio en esta página, intenta cambiar la configuración -> ';
            }
            contenido.style.background = "#960000";
            contenido.textContent = errort + event.error;
        }

        recognition.onend = function () {
            document.querySelector('.instrucciones').style.background = "black";
            document.querySelector('.instrucciones').textContent = `Instrucciones: Toca el botón "hablar" para empezar`;
            btn.textContent = 'HABLAR';
        };

        //Agregando el listener a el botón
        btn.addEventListener('click', () => {
            recognition.start();
        });

        function readOutLoud(mensaje){
            const speech = new SpeechSynthesisUtterance();
            speech.lang = 'es-Mx';

            const mensajeMin = mensaje.toLowerCase();
            
            if(mensajeMin.includes('cómo estás') || mensajeMin == 'qué tal'){
                textoFinal = saludos[Math.floor(Math.random() * saludos.length)];
            } else if(mensajeMin.includes('hola') || mensajeMin.includes('qué onda') || mensajeMin.includes('hey')){
                textoFinal = hola[Math.floor(Math.random() * hola.length)];
            } else if(mensajeMin.includes('clima')){
                textoFinal = clima[Math.floor(Math.random() * clima.length)];
            } else if(mensajeMin.includes('te llamas')){
                textoFinal = 'Me llamo GoGo Robot';
            } else if(mensajeMin.includes('quién te creó')){
                textoFinal = 'Mi creador es Yeison Roblero';
            } else if(mensajeMin.includes('modo oscuro')){
                document.querySelector('.inicio').style.background = "black";
                textoFinal = 'Genial, aquí lo tienes';
            } else {
                textoFinal = 'No entendí lo que dijiste :(';
            }

            respuesta.textContent = ia + textoFinal;
            speech.text = textoFinal;

            speech.volume = 1;
            speech.rate = 1;
            speech.pitch = 1;

            window.speechSynthesis.speak(speech);
        }

    }catch(e){
        alert(`Lo sentimos la API de reconocimiento de voz no está disponible en este navegador :(.
            Puedes cambiarte a otro. error: ${e}`);
    }
}

ReconocimientoDeVoz();

//Navegación
navSlide = () => {
    const burger = document.querySelector('.menu');
    const nav = document.querySelector('.enlaces');
    const navLinks = document.querySelectorAll('.enlaces li');

    burger.addEventListener('click', () => {
        //Toggle Nav
        nav.classList.toggle('menu-active');

        //Animate Links
        navLinks.forEach((link, index) => {
            if(link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        //Burger Animation
        burger.classList.toggle('toggle');
    });
}

navSlide();

navSlideOff = () => {
    const nav = document.querySelector('.enlaces');
    const navLinks = document.querySelectorAll('.enlaces li');
    const burger = document.querySelector('.menu');

    nav.addEventListener('click', () => {
        //Toggle Nav
        nav.classList.toggle('menu-active');

         //Animate Links
         navLinks.forEach((link, index) => {
            if(link.style.animation) {
                link.style.animation = '';
            } else {
                
            }
        });
        
        //Burger Animation
        burger.classList.toggle('toggle');
    });
}

navSlideOff();


navegacion = () => {
    const sections = document.querySelectorAll('section');
    const activo = document.querySelector('.activo');
    const gradients = [
            "rgb(0, 151, 221)",
            "rgb(0, 151, 221)",
            "rgb(0, 151, 221)",
            "rgb(0, 151, 221)"
        ];
    
    const options = {
        threshold: 0.7
    };     

    let observer = new IntersectionObserver(navCheck, options);

    function navCheck(entries) {
        entries.forEach(entry => {
            const className = entry.target.className;
            const activeAnchor = document.querySelector(`[data-page=${className}]`);
            const gradientIndex = entry.target.getAttribute('data-index');
            const coords = activeAnchor.getBoundingClientRect();
            const directions = {
                height: coords.height,
                width: coords.width,
                top: coords.top,
                left: coords.left
            };

            if(entry.isIntersecting){
                activo.style.setProperty("left", `${directions.left}px`);
                activo.style.setProperty("top", `${directions.top}px`);
                activo.style.setProperty("width", `${directions.width}px`);
                activo.style.setProperty("height", `${directions.height}px`);
                activo.style.background = gradients[gradientIndex];
            }
        });
    }

    sections.forEach(section => {
        observer.observe(section);
    });
}

navegacion();