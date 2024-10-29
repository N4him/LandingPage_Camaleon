# API de Gestión de Base de Datos

Esta API está diseñada para interactuar con una base de datos en Firebase Firestore. Proporciona funcionalidades CRUD (Crear, Leer, Actualizar, Eliminar) para varias colecciones relacionadas con prácticas, trabajos de grado, proyectos de investigación, líneas de investigación, calificaciones del grupo, miembros del grupo y convenios y alianzas.

## Tabla de Contenidos
- [Requisitos](#requisitos)
- [Configuración del Proyecto](#configuración-del-proyecto)
- [Uso de la API con Postman](#uso-de-la-api-con-postman)
  - [Autenticación](#autenticación)
  - [Cerrar Sesión](#cerrar-sesión)
  - [Crear Documentos](#crear-documentos)
  - [Leer Documentos](#leer-documentos)
  - [Actualizar Documentos](#actualizar-documentos)
  - [Eliminar Documentos](#eliminar-documentos)
- [Rutas de la API](#rutas-de-la-api)
- [Estructura de las Colecciones](#estructura-de-las-colecciones)
  - [Prácticas](#prácticas)
  - [Trabajos de Grado](#trabajos-de-grado)
  - [Proyectos de Investigación](#proyectos-de-investigación)
  - [Líneas de Investigación](#líneas-de-investigación)
  - [Calificación del Grupo](#calificación-del-grupo)
  - [Miembros del Grupo](#miembros-del-grupo)
  - [Convenios y Alianzas](#convenios-y-alianzas)
- [Ejemplos de Solicitudes](#ejemplos-de-solicitudes)
- [Contribuciones](#contribuciones)
- [Licencia](#licencia)

## Requisitos

- Node.js
- Firebase Firestore
- Postman (o cualquier herramienta similar para hacer solicitudes HTTP)

## Configuración del Proyecto

1. Clona este repositorio en tu máquina local:
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd <NOMBRE_DEL_REPOSITORIO>
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Configura Firebase en el archivo `config.js` con tus credenciales de Firestore.

4. Inicia el servidor:
   ```bash
   npm run dev
   ```

El servidor estará disponible en `http://localhost:3000`.

## Uso de la API con Postman

### Autenticación

Para acceder a las rutas protegidas, primero debes autenticarte.

1. **Iniciar Sesión**

   - Selecciona `POST` en Postman.
   - Introduce la URL:
     ```
     http://localhost:3000/auth/login
     ```
   - En la pestaña "Body", selecciona `raw` y establece el tipo a `JSON`. Introduce el siguiente JSON:
     ```json
     {
         "email": "jon@gmail.com",
         "password": "123456"
     }
     ```
   - Haz clic en **Send**. Recibirás un mensaje de éxito y el usuario autenticado.

### Cerrar Sesión

Para cerrar sesión:

1. Selecciona `POST` en Postman.
2. Introduce la URL:
   ```
   http://localhost:3000/auth/logout
   ```
3. Haz clic en **Send**. Recibirás un mensaje de confirmación en formato JSON:
   ```json
   {
       "message": "Cerrar sesión"
   }
   ```

### Crear Documentos

Para crear un nuevo documento en una colección, usa el método **POST**.

1. Selecciona `POST` en Postman.
2. Introduce la URL de la colección donde quieres crear un documento. Por ejemplo, para prácticas:
   ```
   http://localhost:3000/practicas
   ```
3. En la pestaña "Body", selecciona `raw` y establece el tipo a `JSON`. Introduce el JSON del nuevo documento. Ejemplo:
   ```json
   {
       "resultado de investigacion": "Descripción de la investigación",
       "profesor": {
           "apellido(s)": "Pérez",
           "nombre(s)": "Juan"
       },
       "nombre del estudiante": {
           "apellido(s)": "García",
           "nombre(s)": "Ana"
       },
       "título de la practica": "Título de la práctica"
   }
   ```

4. Haz clic en **Send**. Deberías recibir una respuesta con el ID del nuevo documento.

### Leer Documentos

Para leer todos los documentos de una colección, usa el método **GET**.

1. Selecciona `GET` en Postman.
2. Introduce la URL de la colección. Por ejemplo:
   ```
   http://localhost:3000/practicas
   ```
3. Haz clic en **Send**. Recibirás una respuesta con todos los documentos de la colección.

Para leer un documento específico por ID:

1. Usa el método **GET**.
2. Introduce la URL del documento específico:
   ```
   http://localhost:3000/practicas/<ID_DEL_DOCUMENTO>
   ```
3. Haz clic en **Send**. Deberías recibir los datos del documento.

### Actualizar Documentos

Para actualizar un documento existente, usa el método **PUT**.

1. Selecciona `PUT` en Postman.
2. Introduce la URL del documento específico:
   ```
   http://localhost:3000/practicas/<ID_DEL_DOCUMENTO>
   ```
3. En la pestaña "Body", selecciona `raw` y establece el tipo a `JSON`. Introduce el JSON con los cambios. Ejemplo:
   ```json
   {
       "título de la practica": "Título actualizado"
   }
   ```
4. Haz clic en **Send**. Recibirás una respuesta con el documento actualizado.

### Eliminar Documentos

Para eliminar un documento, usa el método **DELETE**.

1. Selecciona `DELETE` en Postman.
2. Introduce la URL del documento que deseas eliminar:
   ```
   http://localhost:3000/practicas/<ID_DEL_DOCUMENTO>
   ```
3. Haz clic en **Send**. Recibirás una respuesta de confirmación.

## Rutas de la API

- **/auth**: Rutas de autenticación.
  - **POST /auth/login**: Iniciar sesión.
  - **POST /auth/logout**: Cerrar sesión.
- **/practicas**: Rutas para gestionar prácticas.
- **/trabajosGrado**: Rutas para gestionar trabajos de grado.
- **/proyectosInvestigacion**: Rutas para gestionar proyectos de investigación.
- **/lineasInvestigacion**: Rutas para gestionar líneas de investigación.
- **/calificacionGrupo**: Rutas para gestionar calificaciones de grupos.
- **/miembrosGrupo**: Rutas para gestionar miembros de grupos.
- **/conveniosAlianzas**: Rutas para gestionar convenios y alianzas.

Cada ruta admite las siguientes operaciones:
- **GET**: Leer documentos (todos o por ID)
- **POST**: Crear nuevos documentos
- **PUT**: Actualizar documentos existentes
- **DELETE**: Eliminar documentos

## Estructura de las Colecciones

### Prácticas

Cada documento en la colección de **prácticas** debe contener los siguientes campos:

- `resultado de investigacion`: **String** - Descripción del resultado de la investigación.
- `profesor`: **Object** - Información del profesor.
  - `apellido(s)`: **String** - Apellido(s) del profesor.
  - `nombre(s)`: **String** - Nombre(s) del profesor.
- `nombre del estudiante`: **Object** - Información del estudiante.
  - `apellido(s)`: **String** - Apellido(s) del estudiante.
  - `nombre(s)`: **String** - Nombre(s) del estudiante.
- `título de la practica`: **String** - Título de la práctica.

### Trabajos de Grado

Cada documento en la colección de **trabajos de grado** debe contener los siguientes campos:

- `nombre del estudiante`: **String** - Nombre completo del estudiante.
- `título`: **String** - Título del trabajo de grado.
- `director de tesis`: **String** - Nombre del director de tesis.
- `fecha de defensa`: **Date** - Fecha en que se defendió el trabajo.

### Proyectos de Investigación

Cada documento en la colección de **proyectos de investigación** debe contener los siguientes campos:

- `nombre del proyecto`: **String** - Nombre del proyecto de investigación.
- `descripcion`: **String** - Descripción del proyecto.
- `investigador principal`: **String** - Nombre del investigador principal.
- `fecha de inicio`: **Date** - Fecha en que comenzó el proyecto.
- `estado`: **String** - Estado actual del proyecto (por ejemplo, "En progreso", "Finalizado").

### Líneas de Investigación

Cada documento en la colección de **líneas de investigación** debe contener los siguientes campos:

- `nombre de la línea`: **String** - Nombre de la línea de investigación.
- `descripcion`: **String** - Descripción de la línea de investigación.
- `investigadores`: **Array** - Lista de investigadores involucrados en la línea.

### Calificación del Grupo

Cada documento en la colección de **calificación del grupo** debe contener los siguientes campos:

- `nombre del

 grupo`: **String** - Nombre del grupo.
- `calificacion`: **Number** - Calificación del grupo.
- `comentarios`: **String** - Comentarios sobre la calificación.
```

### Cambios Realizados
- En la sección de **Cerrar Sesión**, se añadió el mensaje de confirmación en formato JSON que se enviará al usuario tras cerrar la sesión.

Este formato hace que la documentación sea más clara y fácil de seguir para los usuarios que deseen utilizar la API. Si necesitas más cambios, ¡no dudes en decírmelo!