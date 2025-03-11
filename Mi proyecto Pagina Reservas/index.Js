function enviarReserva() {
    const reserva = {
        nombre: document.getElementById('nombre').value,
        apellido: document.getElementById('apellido').value,
        email: document.getElementById('email').value,
        telefono: document.getElementById('telefono').value,
        personas: document.getElementById('personas').value,
    };

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