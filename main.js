document.addEventListener('DOMContentLoaded', function() {
    const palabras = ["javascript", "html", "css", "web", "programacion"];

    let palabraSeleccionada = palabras[Math.floor(Math.random() * palabras.length)];
    let palabraOculta = '_'.repeat(palabraSeleccionada.length);
    let intentos = 6;

    const palabraElement = document.getElementById('palabra');
    const intentosElement = document.getElementById('intentos');
    const letraInput = document.getElementById('letra');
    const adivinarButton = document.getElementById('adivinar');
    const mensajeElement = document.getElementById('mensaje');

    palabraElement.textContent = palabraOculta.split('').join(' ');
    actualizarIntentos();

    function actualizarInterfaz() {
        palabraElement.textContent = palabraOculta.split('').join(' ');
    }

    function actualizarIntentos() {
        intentosElement.textContent = `Intentos restantes: ${intentos}`;
    }

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

    function verificarEstado() {
        if (palabraOculta === palabraSeleccionada) {
            mostrarMensaje('¡Felicidades! Has ganado.', 'mensaje-ganador');
            deshabilitarEntrada();
        } else if (intentos === 0) {
            mostrarMensaje(`¡Has perdido! La palabra era: ${palabraSeleccionada}`, 'mensaje-perdedor');
            deshabilitarEntrada();
        }
    }

    function mostrarMensaje(mensaje, clase) {
        mensajeElement.textContent = mensaje;
        mensajeElement.className = clase;
    }

    function deshabilitarEntrada() {
        letraInput.disabled = true;
        adivinarButton.disabled = true;
    }

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

