// Conectamos con el servidor de Socket.IO
const socket = io();

// Escuchamos el evento de métricas que envía el backend
socket.on('actualizacion-sistema', (data) => {
    // Actualizamos los textos de las tarjetas según los IDs del HTML
    document.getElementById('cpu').innerText = `Uso: ${data.cpu}%`;
    document.getElementById('ram').innerText = `Libre: ${data.memoriaLibre} MB`;
    document.getElementById('disco').innerText = `Uso: ${data.disco}%`;
    document.getElementById('red').innerText = `Bytes RX/TX: ${data.red}`;
});