# TP Integrador Final - Monitoreo de Sistema en Tiempo Real 
**Cátedra:**Práctica Profesionalizante III - 2026

## Tecnologías Utilizadas
- **Frontend:** HTML5, CSS3, JavaScript, Bootstrap 5, Chart.js.
- **Backend:** Node.js, Express, Socket.IO, CORS, systeminformation.

## Arquitectura del Sistema (Diagrama Mermaid)
```mermaid
graph LR
    A[Servidor / Hardware] -->|systeminformation| B(Backend Node.js + Express + Socket.IO)
    B -->|WebSocket en tiempo real| C[Frontend Web Bootstrap + Chart.js]