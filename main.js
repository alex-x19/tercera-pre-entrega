document.addEventListener('DOMContentLoaded', function() {
    // Palabras disponibles para adivinar
    const palabras = ["javascript", "html", "css", "web", "programacion"];

    // Seleccionar una palabra al azar
    let palabraSeleccionada = palabras[Math.floor(Math.random() * palabras.length)];
    let palabraOculta = '_'.repeat(palabraSeleccionada.length);
    let intentos = 6;

    // Elementos del DOM
    const palabraElement = document.getElementById('palabra');
    const intentosElement = document.getElementById('intentos');
    const letraInput = document.getElementById('letra');
    const adivinarButton = document.getElementById('adivinar');
    const mensajeElement = document.getElementById('mensaje');

    // Mostrar la palabra oculta
    palabraElement.textContent = palabraOculta.split('').join(' ');
    actualizarIntentos();

    // Actualizar la interfaz de usuario
    function actualizarInterfaz() {
        palabraElement.textContent = palabraOculta.split('').join(' ');
    }

    // Actualizar el número de intentos restantes
    function actualizarIntentos() {
        intentosElement.textContent = `Intentos restantes: ${intentos}`;
    }

    // Verificar si la letra está en la palabra
    function verificarLetra(letra) {
        let letraEncontrada = false;
        for (let i = 0; i < palabraSeleccionada.length; i++) {
            if (palabraSeleccionada[i] === letra) {
                palabraOculta = palabraOculta.substr(0, i) + letra + palabraOculta.substr(i + 1);
                letraEncontrada = true;
            }
        }
        if (!letraEncontrada) {
            intentos--;
        }
        actualizarInterfaz();
        actualizarIntentos();
        verificarEstado();
    }

    // Verificar si se ha ganado o perdido el juego
    function verificarEstado() {
        if (palabraOculta === palabraSeleccionada) {
            mostrarMensaje('¡Felicidades! Has ganado.', 'mensaje-ganador');
            deshabilitarEntrada();
        } else if (intentos === 0) {
            mostrarMensaje(`¡Has perdido! La palabra era: ${palabraSeleccionada}`, 'mensaje-perdedor');
            deshabilitarEntrada();
        }
    }

    // Mostrar mensaje en el DOM
    function mostrarMensaje(mensaje, clase) {
        mensajeElement.textContent = mensaje;
        mensajeElement.className = clase;
    }

    // Deshabilitar la entrada del usuario
    function deshabilitarEntrada() {
        letraInput.disabled = true;
        adivinarButton.disabled = true;
    }

    // Evento para adivinar letra
    adivinarButton.addEventListener('click', function() {
        const letra = letraInput.value.toLowerCase();
        if (letra.length === 1 && letra.match(/[a-z]/i)) {
            verificarLetra(letra);
            letraInput.value = '';
        } else {
            mostrarMensaje('Por favor, ingresa una letra válida.', 'mensaje-error');
        }
    });
});

