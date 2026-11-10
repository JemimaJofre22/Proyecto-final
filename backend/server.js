const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const si = require("systeminformation");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

app.use(cors());

// Servir la carpeta frontend de forma estática
app.use(express.static(path.join(__dirname, '../frontend')));

const PORT = 3000;

app.get("/", (req, res) => {
    res.send("Servidor funcionando correctamente 🚀");
});

// Ruta API REST
app.get("/api/sistema", async (req, res) => {
    try {
        const cpu = await si.cpu();
        const memoria = await si.mem();
        const disco = await si.fsSize();
        const red = await si.networkInterfaces();
        const tiempo = await si.time();
        res.json({
            sistema: process.platform,
            cpu: cpu.brand,
            nucleos: cpu.cores,
            memoriaTotal: memoria.total,
            memoriaLibre: memoria.free,
            discoTotal: disco[0]?.size || 0,
            discoLibre: disco[0]?.available || 0,
            ip: red[0]?.ip4 || "No disponible",
            interfaz: red[0]?.iface || "No disponible",
            uptime: tiempo.uptime
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// CONFIGURACIÓN DE SOCKET.IO

io.on('connection', (socket) => {
    console.log('Cliente conectado por WebSocket:', socket.id);

    // Enviar métricas del sistema cada 2 segundos a la interfaz
    const intervalo = setInterval(async () => {
        try {
            const load = await si.currentLoad();
            const mem = await si.mem();
            const disk = await si.fsSize();
            const net = await si.networkStats();

            const data = {
                cpu: load.currentLoad.toFixed(1),
                memoriaLibre: (mem.free / (1024 * 1024)).toFixed(1), // en MB
                disco: disk[0] ? disk[0].use.toFixed(1) : 0,
                red: net[0] ? net[0].rx_bytes : 0
            };

            // Emite el mensaje con el evento que la app.js está escuchando
            socket.emit('actualizacion-sistema', data);
        } catch (error) {
            console.error('Error al emitir métricas:', error);
        }
    }, 2000);

    socket.on('disconnect', () => {
        console.log('Cliente desconectado:', socket.id);
        clearInterval(intervalo);
    });
});

// Importante: Usamos server.listen en lugar de app.listen para que funcione Socket.IO
server.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor escuchando en http://0.0.0.0:${PORT}`);
});