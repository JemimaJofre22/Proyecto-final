// Conectamos con el servidor de Socket.IO
const socket = io();

// Saber si nos conectamos con éxito
socket.on('connect', () => {
    console.log("Conectado al servidor WebSocket con ID:", socket.id);
});

// Saber si se perdió la conexión
socket.on('disconnect', () => {
    console.log("Se perdió la conexión con el servidor.");
    document.getElementById('cpu').innerText = "Desconectado";
});

// Función auxiliar para crear gráficos de línea limpios
function crearGrafico(idCanvas, labelNombre, colorHex) {
    const ctx = document.getElementById(idCanvas).getContext('2d');
    return new Chart(ctx, {
        type: 'line',
        data: {
            labels: [], // Eje X (Tiempo)
            datasets: [{
                label: labelNombre,
                data: [], // Eje Y (Valor)
                borderColor: colorHex,
                backgroundColor: colorHex.replace('1)', '0.1)'),
                borderWidth: 2,
                fill: true,
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Inicializamos los gráficos para cada tarjeta
const cpuChart = crearGrafico('cpuChart', 'CPU (%)', 'rgba(13, 110, 253, 1)');
const ramChart = crearGrafico('ramChart', 'RAM Libre (MB)', 'rgba(25, 135, 84, 1)');
const discoChart = crearGrafico('discoChart', 'Disco (%)', 'rgba(255, 193, 7, 1)');
const redChart = crearGrafico('redChart', 'Red (Bytes)', 'rgba(220, 53, 69, 1)');

// Función para actualizar los gráficos manteniendo solo los últimos 10 puntos
function actualizarGrafico(chart, etiquetaTiempo, nuevoValor) {
    chart.data.labels.push(etiquetaTiempo);
    chart.data.datasets[0].data.push(nuevoValor);

    if (chart.data.labels.length > 10) {
        chart.data.labels.shift();
        chart.data.datasets[0].data.shift();
    }
    chart.update();
}

// Escuchamos el evento de métricas que envía el backend
socket.on('actualizacion-sistema', (data) => {
    // Actualizamos los textos de las tarjetas según los IDs del HTML
    document.getElementById('cpu').innerText = `Uso: ${data.cpu}%`;
    document.getElementById('ram').innerText = `Libre: ${data.memoriaLibre} MB`;
    document.getElementById('disco').innerText = `Uso: ${data.disco}%`;
    document.getElementById('red').innerText = `Bytes RX/TX: ${data.red}`;

    // Obtenemos la hora actual para el eje X de los gráficos
    const horaActual = new Date().toLocaleTimeString();

    // Actualizamos los gráficos
    actualizarGrafico(cpuChart, horaActual, data.cpu);
    actualizarGrafico(ramChart, horaActual, data.memoriaLibre);
    actualizarGrafico(discoChart, horaActual, data.disco);
    actualizarGrafico(redChart, horaActual, data.red);
});