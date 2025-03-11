function enviarReserva() {
    const reserva = {
        nombre: document.getElementById('nombre').value,
        apellido: document.getElementById('apellido').value,
        email: document.getElementById('email').value,
        telefono: document.getElementById('telefono').value,
        personas: document.getElementById('personas').value,
    };

if (reserva.nombre === '' || reserva.apellido === '' || reserva.email === '' || reserva.telefono === '' || reserva.personas === '') {
        document.getElementById('confirmacion2').textContent = 'Por favor, complete todos los campos.';
        return;
    }

    else { 
        document.getElementById('confirmacion2').textContent = 'Reserva realizadaa con éxito.';
     } 


     if (reserva.personas <= 0) {
        document.getElementById('confirmacion2').textContent = 'Por favor, ingrese un número válido de personas.';
        return;
    }

    const nombreRegex = /^[a-zA-Z\s]+$/;
    const apellidoRegex = /^[a-zA-Z\s]+$/;

    if (!nombreRegex.test(reserva.nombre)) {
        document.getElementById('confirmacion2').textContent = 'El nombre no puede contener números.';
        return;
    }

    if (!apellidoRegex.test(reserva.apellido)) {
        document.getElementById('confirmacion2').textContent = 'El apellido no puede contener números.';
        return;
    }

    fetch('http://localhost:3000/api/reservar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reserva)  // Convertir el objeto reserva a JSON
    })
    .then(response => response.json())
    .then(data => {
        console.log('Reserva realizada:', data);
    })
    .catch(error => {
        console.error('Error al realizar la reserva:', error);
    });
}
