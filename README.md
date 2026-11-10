# TP Integrador Final - Monitoreo de Sistema en Tiempo Real
  
**Cátedra:** Práctica Profesionalizante III - 2026
---

## 1. Tecnologías Utilizadas
La aplicación está desarrollada separando claramente el cliente y el servidor, cumpliendo con los estándares de la cátedra:
- **Frontend:** HTML5, CSS3, JavaScript (DOM, Fetch API), Bootstrap 5 (diseño responsivo y cards) y Chart.js para visualización de métricas.
- **Backend:** Node.js, Express, Socket.IO (comunicación en tiempo real), CORS y la librería `systeminformation` para la extracción de recursos del hardware GNU/Linux.
- **Control de versiones:** Git y GitHub (trabajo en ramas paralelas y merges).

## 2. Vista en el Navegador Web y en Dispositivo Móvil
La interfaz web muestra tarjetas estilizadas con Bootstrap y gráficos dinámicos actualizados segundo a segundo mediante WebSockets.
   
   (Nota: Aquí puedes colocar la captura de pantalla de cómo se ve en tu navegador local).

Gracias a la separación de capas, el frontend fue empaquetado como aplicación nativa Android utilizando herramientas de conversión HTML2APK.
   
   (Nota: Aquí puedes colocar la captura de cómo se ve en el celular o emulador).

## 3. Guía de Instalación y Puesta en Marcha Local
Sigue estos pasos para clonar el repositorio y ponerlo en funcionamiento en tu equipo:
a- Clonar el repositorio:
     git clone [https://github.com/JemimaJofre22/Proyecto-final.git](https://github.com/JemimaJofre22/Proyecto-final.git)
b- cd Proyecto-final
c- Instalar las dependencias del Backend:
     cd backend
     npm install
d- Iniciar el servidor Node.js:
     npm start
(El servidor se iniciará por defecto en el puerto 3000).   
e- Acceder a la aplicación:
     Abre tu navegador web e ingresa a: http://localhost:3000


## 4. GitHub Helpers y Enlaces de Interés
Conforme a las herramientas de apoyo solicitadas por la cátedra para la auditoría y análisis del repositorio, se pueden utilizar los siguientes helpers:
- Visualizador de Estructura / Git: GitDiagram para inspeccionar el flujo de trabajo de las ramas.
- Editor Web Instantáneo: GitHub1s para abrir el repositorio directamente con interfaz de VS Code en el navegador.
- Empaquetado APK: Generado mediante la herramienta HTML2APK para su distribución en dispositivos móviles



## 5. Arquitectura del Sistema y Despliegue
El sistema opera bajo una arquitectura cliente-servidor en tiempo real, donde el backend recopila datos del sistema operativo y los emite mediante WebSockets hacia las interfaces web y móviles.


```mermaid
graph LR
    A[Servidor GNU/Linux] -->|systeminformation| B(Backend Node.js + Express + Socket.IO)
    B -->|WebSocket / Tiempo Real| C[Frontend Web Bootstrap + Chart.js]
    B -->|WebSocket / Tiempo Real| D[Aplicación Móvil APK - HTML2APK] 


















