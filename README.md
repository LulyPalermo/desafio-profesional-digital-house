![Logo](/assets/img/logo-readme.png)

### 🛒 Descripción
**Rent a look** es una aplicación web Full Stack para alquilar ropa y accesorios para fiestas.
Permite a los usuarios explorar productos, gestionar favoritos y realizar reservas, mientras que los administradores pueden gestionar productos, usuarios y funcionalidades del sistema.

---

### 🚀 Tecnologías utilizadas
## Frontend
- **React 19**
- **React Router DOM 7.1.5**
- **Vite 6**
- **SweetAlert2**
- **Material UI Icons**

## Backend
- **Java 17**
- **Spring Boot 3.3.x**
- **Spring Data JPA**
- **Spring Security**
- **MySQL**
- **Hibernate**

---

### ⚙️ Instalación local
Para correr este proyecto de manera local, seguí estos pasos:

## 📦 Cloná el repositorio
```bash
  git clone https://github.com/LulyPalermo/desafio-profesional-digital-house
  cd rent-a-look
```

## 🛠️ Backend (Spring Boot)
1. **Configuración de Base de Datos**: Accedé a MySQL y creá la base de datos:
```bash
CREATE DATABASE db_rental_springboot;
```
La aplicación ya cuenta con datos, y está configurada para inicializarlos automáticamente al iniciar el servidor.

2. Dentro del proyecto encontrarás un archivo llamado application.properties.example, debes renombrarlo como application.properties y editar los datos según tu entorno local:
```bash
spring.datasource.url=jdbc:mysql://localhost:3306/db_rental_springboot
spring.datasource.username=TU_USUARIO
spring.datasource.password=TU_CONTRASENA
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

spring.jpa.database-platform=org.hibernate.dialect.MySQLDialect
spring.jpa.show-sql=true
spring.jpa.hibernate.ddl-auto=create
logging.level.org.hibernate.SQL=debug
```

3. Ejecutar el Backend desde la raíz del proyecto:
Accedé a la carpeta del backend:
```bash
cd backend
```
Ejecutá spring-boot:
```bash
mvn spring-boot:run
```

## 🎨 Frontend (React + Vite)
1. Accedé a la carpeta del frontend:
```bash
cd frontend
```

2. Instalá las dependencias:
```bash
npm install
```

3. Iniciá el servidor:
```bash
npm run dev

```
4. Abrí en tu navegador la URL que te indique la consola

---

### 📬 Endpoints (API REST)

## 🔐 Admin
| Método | Endpoint              | Descripción                          | ¿Se debe loguear?   |
|--------|-----------------------|--------------------------------------|---------------------|
| GET    | /admin_users          | Listado de usuarios administradores  |✅ (ADMIN)           |

## 👗 Productos
| Método | Endpoint              | Descripción                          | ¿Se debe loguear?    |
|--------|-----------------------|--------------------------------------|----------------------|
| GET    | /products             | Listado de productos                 | ❌                   |
| GET    | /products/{id}        | Detalle de producto                  | ❌                   |
| POST   | /products             | Crear producto                       | ✅ (ADMIN)           |
| DELETE | /products/{id}        | Eliminar producto                    | ✅ (ADMIN)           |

## 📅 Reservas
| Método | Endpoint                           | Descripción                    | ¿Se debe loguear?  |
|--------|------------------------------------|--------------------------------|--------------------|
| POST   | /reservations                      | Crear una reserva              | ✅                 |
| GET    | /reservations/user/{userId}        | Listar reservas de un usuario  | ✅                 |
| GET    | /reservations/product/{productId}  | Listar reservas de un producto | ❌                 |

---

### 🗂️ Diagrama de Entidades
[Link al diagrama](https://www.figma.com/design/D8pb8YtySUind4VRhLDEpF/Desaf%C3%ADo-profesional---Digital-House?node-id=2003-12&t=TOD7kyS114yf8sgd-1)

> Creado con [dbdiagram](https://dbdiagram.io)

---

### 🧪 Planificación y ejecución de los tests
[Link test sprint 1](https://www.figma.com/design/D8pb8YtySUind4VRhLDEpF/Desaf%C3%ADo-profesional---Digital-House?node-id=160-707&t=TOD7kyS114yf8sgd-1)
[Link test sprint 2](https://www.figma.com/design/D8pb8YtySUind4VRhLDEpF/Desaf%C3%ADo-profesional---Digital-House?node-id=160-1442&t=TOD7kyS114yf8sgd-1)
[Link test sprint 3](https://www.figma.com/design/D8pb8YtySUind4VRhLDEpF/Desaf%C3%ADo-profesional---Digital-House?node-id=220-3011&t=TOD7kyS114yf8sgd-1)
[Link test sprint 4](https://www.figma.com/design/D8pb8YtySUind4VRhLDEpF/Desaf%C3%ADo-profesional---Digital-House?node-id=220-3012&t=TOD7kyS114yf8sgd-1)

---

### ✉️ Envío de confirmación de reservas
Al crear una reserva, la aplicación genera un correo de confirmación usando **SendGrid.**

**Modo de prueba (por defecto):**
Por seguridad, el envío real del correo está simulado. En lugar de enviar emails, el contenido generado se imprime en la consola del servidor, mostrando: Destinatario, Asunto y Contenido del correo.
Esto permite verificar que el flujo completo funciona, sin exponer credenciales ni enviar correos reales.

**Para activar el envío real de correos:**
1. Descomentar en ReservationController la sección de envío de email real.
2. Definir las variables de entorno en tu archivo application.properties:
```bash
sendgrid.api.key=${SENDGRID_API_KEY}
sendgrid.from.email=TU_EMAIL
```
3. Reiniciar el servidor Spring Boot.

---

### 🗒️ Notas adicionales
La aplicación cuenta con un archivo import.sql el cual contiene todos los datos para utilizar la app.

**Usuarios predefinidos:**
👩🏻 Administrador con todos los permisos:
Email: lucia@ejemplo.com
Contraseña: 123456

👨🏻 Administrador:
Email: benjamin@ejemplo.com
Contraseña: 678910

👩🏻 Usuario sitio público:
Email: olivia@ejemplo.com
Contraseña: 123456o& 

👉🏼 En la carpeta public hay imágenes guardadas para poder realizar la subida de productos o de caracteristicas (se llaman img-prueba / icon-caract-prueba).

---

#### 📷 Imágenes
Las imágenes utilizadas en este proyecto fueron tomadas con fines educativos y de demostración. **No son de autoría propia.**

#### 📚 Documentación en Figma
[Link](https://www.figma.com/design/D8pb8YtySUind4VRhLDEpF/Desaf%C3%ADo-profesional---Digital-House?node-id=2005-20&t=TOD7kyS114yf8sgd-1) 

#### 👩🏻‍💻 Desarrollado por Lucía Palermo
Proyecto académico Professional Developer | Digital House | 2025


