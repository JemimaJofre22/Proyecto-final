const express = require("express");
const si = require("systeminformation");

const app = express();

const PORT = 3000;

app.get("/", (req, res) => {
    res.send("Servidor funcionando correctamente 🚀");
});

app.get("/api/sistema", async (req, res) => {

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
    discoTotal: disco[0].size,
    discoLibre: disco[0].available,
    ip: red[0]?.ip4 || "No disponible",
interfaz: red[0]?.iface || "No disponible"
uptime: tiempo.uptime
});

});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${PORT}`);
});