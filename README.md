
# API de Gestión de Base de Datos

Esta API está diseñada para interactuar con una base de datos en Firebase Firestore. Proporciona funcionalidades CRUD (Crear, Leer, Actualizar, Eliminar) para varias colecciones relacionadas con prácticas, trabajos de grado, proyectos de investigación, líneas de investigación, calificaciones del grupo, miembros del grupo y convenios y alianzas.

## Tabla de Contenidos
- [Requisitos](#requisitos)
- [Configuración del Proyecto](#configuración-del-proyecto)
- [Uso de la API con Postman](#uso-de-la-api-con-postman)
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

### Crear Documentos

Para crear un nuevo documento en una colección, usa el método **POST**.

1. Selecciona `POST` en Postman.
2. Introduce la URL de la colección donde quieres crear un documento. Por ejemplo, para prácticas:
   ```
   http://localhost:3000/api/practicas
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
   http://localhost:3000/api/practicas
   ```
3. Haz clic en **Send**. Recibirás una respuesta con todos los documentos de la colección.

Para leer un documento específico por ID:

1. Usa el método **GET**.
2. Introduce la URL del documento específico:
   ```
   http://localhost:3000/api/practicas/<ID_DEL_DOCUMENTO>
   ```
3. Haz clic en **Send**. Deberías recibir los datos del documento.

### Actualizar Documentos

Para actualizar un documento existente, usa el método **PUT**.

1. Selecciona `PUT` en Postman.
2. Introduce la URL del documento específico:
   ```
   http://localhost:3000/api/practicas/<ID_DEL_DOCUMENTO>
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
   http://localhost:3000/api/practicas/<ID_DEL_DOCUMENTO>
   ```
3. Haz clic en **Send**. Recibirás una respuesta de confirmación.

## Rutas de la API

- **/api/practicas**
- **/api/trabajos-grado**
- **/api/proyectos-investigacion**
- **/api/lineas-investigacion**
- **/api/calificacion-grupo**
- **/api/miembros-grupo**
- **/api/convenios-alianzas**

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

- `nombre del grupo`: **String** - Nombre del grupo de investigación.
- `calificacion`: **Number** - Calificación del grupo.
- `fecha`: **Date** - Fecha de la calificación.

### Miembros del Grupo

Cada documento en la colección de **miembros del grupo** debe contener los siguientes campos:

- `nombre`: **String** - Nombre del miembro.
- `apellido`: **String** - Apellido del miembro.
- `rol`: **String** - Rol del miembro en el grupo (por ejemplo, "Investigador", "Estudiante").

### Convenios y Alianzas

Cada documento en la colección de **convenios y alianzas** debe contener los siguientes campos:

- `nombre de la institución`: **String** - Nombre de la institución asociada.
- `tipo de convenio`: **String** - Tipo de convenio (por ejemplo, "Investigación", "Educación").
- `fecha de inicio`: **Date** - Fecha de inicio del convenio.
- `fecha de finalización`: **Date** - Fecha de finalización del convenio.

## Ejemplos de Solicitudes

### Crear una práctica

```http
POST /api/practicas
Content-Type: application/json

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

### Leer todas las prácticas

```http
GET /api/practicas
```

### Actualizar una práctica

```http
PUT /api/practicas/<ID_DEL_DOCUMENTO>
Content-Type: application/json

{
    "título de la practica": "Título actualizado"
}
```

### Eliminar una práctica

```http
DELETE /api/practicas/<ID_DEL_DOCUMENTO>
```

## Contribuciones

Las contribuciones son bienvenidas. Si deseas contribuir, por favor, abre un *issue* o envía un *pull request*.

## Licencia

Este proyecto está bajo la Licencia MIT - consulta el archivo [LICENSE](LICENSE) para más detalles.
```

Este formato proporciona una estructura clara y detalles precisos para cada campo de las colecciones en tu base de datos, lo que facilitará la comprensión y el uso de la API. Puedes personalizar aún más el contenido según sea necesario.