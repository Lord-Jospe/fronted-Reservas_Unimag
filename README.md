# 🏫 Reservas Unimag - Frontend

Interfaz web desarrollada en **React** y **TypeScript** para la gestión de reservas de espacios en la Universidad del Magdalena. Esta interfaz consume una API REST (backend) desarrollada en Spring Boot.

## 🛠️ Tecnologías
- **React** 18
- **TypeScript**
- **Axios**
- **React Router**
- **Vite**
- **Boostrap**
- **SweetAlert2 & SweetAlert2 React Content**
  
## 🚀 Características Principales
- 🔑 Inicio de sesión con validación de credenciales y JWT.
- 📅 Reserva de espacios con selección de fecha y hora.
- 🏫 Gestión de espacios dependiendo el tipo y disponibilidad.
- 👤 Roles de usuario: El sistema gestiona y restringe el acceso a vistas y funcionalidades según el rol del usuario autenticado (Administrador o Estudiante).
- 🔍 Búsqueda y filtrado de reservas.
- 🚨 Alertas personalizadas con SweetAlert2 y notificaciones con Toastify.

## 📦 Requisitos previos
Antes de instalar, asegúrate de tener:
- **Node.js** (v18 o superior)
- **npm**
- Acceso al **backend** corriendo localmente o en un servidor.
- Acceso a la **base de datos** corriendo localmente o en un servidor

## ⚡ Instalación y Configuración

### 1. Clonar el repositorio

```bash
git clone https://github.com/Lord-Jospe/fronted-Reservas_Unimag.git
cd fronted-Reservas_Unimag
```

### 2. Instalar Dependencias y librerias adicionales

```bash
npm install
npm install --save @fortawesome/fontawesome-svg-core
npm install --save @fortawesome/free-solid-svg-icons
npm install --save @fortawesome/react-fontawesome
npm install --save @fortawesome/free-brands-svg-icons
npm install lucide-react
npm install bootstrap
npm install axios
npm install jwt-decode
npm install sweetalert2
npm install sweetalert2-react-content
npm install react-toastify
```

## ▶️ Ejecución del proyecto

```bash
npm run build
npm run dev
```

## 📷 Vistas

### Login 
<img width="1365" height="649" alt="image" src="https://github.com/user-attachments/assets/54535a98-8ac0-47f2-ab17-7faa7d398f2a" />

### Home principal (vista de estudiante)
<img width="1361" height="648" alt="image" src="https://github.com/user-attachments/assets/e933c970-b205-4d2f-9738-ff05cb61b5fa" />

### Vista para reservar un espacio 
<img width="1365" height="644" alt="image" src="https://github.com/user-attachments/assets/57b1a677-cec2-46d2-a9c1-f84a5ee5022d" />

### Vista de panel de administrador
<img width="1365" height="650" alt="image" src="https://github.com/user-attachments/assets/38baa4f1-a8d3-4c46-8696-53ca50b4b09d" />

## 🔗 Backend

Esta interfaz está conectada con un backend desarrollado por el equipo ([@AndresMes](https://github.com/Lord-Jospe) [@MatteoAngulo](https://github.com/MatteoAngulo) [@LeonelP7](https://github.com/LeonelP7)). Puedes encontrarlo en:

👉 [Backend Reservas Unimag](https://github.com/MatteoAngulo/reservasEspaciosUnimag)

## 👥 Autor(es)

- **Joseph Ferrer** - [@Lord-Jospe](https://github.com/Lord-Jospe) - Desarrollador

## 📞 Contacto

🔗 **Link del Proyecto**: [https://github.com/Lord-Jospe/fronted-Reservas_Unimag.git](https://github.com/Lord-Jospe/fronted-Reservas_Unimag.git)

---

⭐ Si te ha sido útil este proyecto, ¡no olvides darle una estrella!
