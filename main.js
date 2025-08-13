document.addEventListener('DOMContentLoaded', () => {
    // --- NODOS DEL DOM ---
    const portada = document.getElementById('portada');
    const navLinks = document.querySelectorAll('.nav-link');
    const profileContents = document.querySelectorAll('.profile-content');
    const sharedContent = document.querySelectorAll('.shared-content');
    const consolePrompt = document.getElementById('console-prompt');
    const currentDirSpan = document.getElementById('current-dir');
    const backLink = consolePrompt.querySelector('a');

    // --- SONIDOS ---
    const hoverSound = new Audio('https://www.myinstants.com/media/sounds/select.mp3');
    const clickSound = new Audio('https://www.myinstants.com/media/sounds/confirm.mp3');
    hoverSound.volume = 0.5;
    clickSound.volume = 0.5;

    // --- LÓGICA DE NAVEGACIÓN (CORREGIDA) ---

    function showContent(targetId) {
        // 1. Ocultar todo el contenido principal
        portada.style.display = 'none';
        profileContents.forEach(content => content.style.display = 'none');
        
        // 2. Ocultar el contenido compartido (contacto y prompt)
        sharedContent.forEach(content => content.style.display = 'none');

        if (targetId) {
            // 3. Si hay un objetivo, mostrar el perfil y el contenido compartido
            const targetContent = document.getElementById(targetId);
            if (targetContent) {
                targetContent.style.display = 'block';
                sharedContent.forEach(content => content.style.display = 'block');
                currentDirSpan.textContent = targetId.replace('-content', '');
            }
        } else {
            // 4. Si no hay objetivo, mostrar solo la portada
            portada.style.display = 'block';
            currentDirSpan.textContent = ''; // Limpiar el directorio actual
        }
    }

    // --- MANEJADOR DE RUTAS ---
    // Esta función lee la URL y decide qué mostrar
    function handleRouteChange() {
        const hash = window.location.hash.substring(1); // ej: "programacion"
        const targetId = hash ? `${hash}-content` : null; // ej: "programacion-content"
        showContent(targetId);
    }

    // --- EVENT LISTENERS ---

    // **LA CORRECCIÓN PRINCIPAL ESTÁ AQUÍ**
    // Ahora, el clic solo cambia la URL (el hash).
    // El 'hashchange' listener se encarga del resto.
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            clickSound.play();
            // Esto dispara el evento 'hashchange' que es capturado abajo
            window.location.hash = e.currentTarget.hash; 
        });
    });

    // Listener para el botón de "Go Back"
    backLink.addEventListener('click', (e) => {
        e.preventDefault();
        clickSound.play();
        window.location.hash = ''; // Limpia el hash para volver al inicio
    });

    // Listener que se activa cada vez que la URL (el hash) cambia
    window.addEventListener('hashchange', handleRouteChange);

    // Llamada inicial para mostrar el contenido correcto al cargar la página
    handleRouteChange();

    // --- EFECTOS DE SONIDO EN ELEMENTOS INTERACTIVOS ---
    const interactiveElements = document.querySelectorAll('a, .btn, input');
    interactiveElements.forEach(elem => {
        elem.addEventListener('mouseenter', () => {
            hoverSound.currentTime = 0;
            hoverSound.play().catch(e => {});
        });
    });
});