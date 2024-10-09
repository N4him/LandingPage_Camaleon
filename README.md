# Esquemas de MongoDB para el Sistema de Gestión de Investigación

Este proyecto contiene esquemas de MongoDB para un sistema de gestión de investigación. Estos esquemas están diseñados para soportar roles de usuario, prácticas de investigación, gestión de tesis, seguimiento de proyectos, miembros del grupo y alianzas institucionales.

## Colección: `usuarios`

- **_id**: Identificador único (ObjectId).
- **nombre**: Nombre completo del usuario (String).
- **rol**: Rol del usuario (por ejemplo, "Director", "Profesor", "Estudiante", "Administrador") (String).
- **email**: Correo electrónico para la autenticación del usuario (String).
- **contraseña**: Contraseña encriptada (String).
- **foto_perfil**: ObjectId que se refiere a la foto de perfil del usuario en GridFS (ObjectId).
- **lineas_investigacion**: Lista de áreas de investigación asociadas con el usuario (Array de Strings).
- **creado_en**: Fecha en la que se creó el usuario (Date).
- **actualizado_en**: Fecha en la que se actualizó por última vez el usuario (Date).
- **token_jwt**: Token JWT para la gestión de sesiones (String).

## Colección: `practicas_investigacion`

- **_id**: Identificador único (ObjectId).
- **titulo**: Título de la práctica de investigación (String).
- **estudiante_responsable**: Información sobre el estudiante responsable, incluyendo nombre y correo electrónico (Documento embebido).
- **profesores_responsables**: Lista de profesores que supervisan la práctica (Array de Strings).
- **descripcion**: Descripción detallada de la práctica (String).
- **enlace_proyecto**: Enlace a la página del proyecto (String).
- **documentos_adjuntos**: Lista de documentos adjuntos (Array de Documentos Embebidos).
- **creado_en**: Fecha en la que se creó la práctica (Date).
- **actualizado_en**: Fecha en la que se actualizó por última vez la práctica (Date).
- **creado_por**: ObjectId que se refiere al creador (ObjectId).
- **permiso**: Nivel de permiso requerido para modificar la práctica (String).

## Colección: `trabajos_grado`

- **_id**: Identificador único (ObjectId).
- **titulo**: Título de la tesis (String).
- **estudiantes**: Lista de estudiantes involucrados en la tesis (Array de Strings).
- **directores**: Lista de supervisores de la tesis (Array de Strings).
- **mencion**: Mención de la tesis (por ejemplo, "Meritoria", "Laureada") (String).
- **descripcion**: Descripción de la tesis (String).
- **enlace_proyecto**: Enlace a la página del proyecto de la tesis (String).
- **documentos_adjuntos**: Lista de documentos adjuntos (Array de Documentos Embebidos).
- **creado_en**: Fecha en la que se creó la tesis (Date).
- **actualizado_en**: Fecha en la que se actualizó por última vez la tesis (Date).
- **creado_por**: ObjectId que se refiere al creador (ObjectId).
- **permiso**: Nivel de permiso requerido para modificar la tesis (String).

## Colección: `proyectos_investigacion`

- **_id**: Identificador único (ObjectId).
- **titulo**: Título del proyecto de investigación (String).
- **objetivos**: Lista de objetivos del proyecto (Array de Strings).
- **resultados**: Lista de resultados obtenidos del proyecto (Array de Strings).
- **produccion_academica**: Lista de publicaciones académicas asociadas con el proyecto (Array de Strings).
- **directores**: Lista de directores del proyecto, incluyendo referencias a sus fotos de perfil en GridFS (Array de Documentos Embebidos).
- **profesionales**: Lista de profesionales involucrados (Array de Strings).
- **estudiantes**: Lista de estudiantes involucrados (Array de Strings).
- **fecha_inicio**: Fecha de inicio del proyecto (Date).
- **fecha_fin**: Fecha de finalización del proyecto (Date).
- **documentos_adjuntos**: Lista de documentos adjuntos (Array de Documentos Embebidos).
- **creado_en**: Fecha en la que se creó el proyecto (Date).
- **actualizado_en**: Fecha en la que se actualizó por última vez el proyecto (Date).
- **creado_por**: ObjectId que se refiere al creador (ObjectId).
- **permiso**: Nivel de permiso requerido para modificar el proyecto (String).

## Colección: `miembros_grupo`

- **_id**: Identificador único (ObjectId).
- **nombre_completo**: Nombre completo del miembro del grupo (String).
- **lineas_investigacion**: Lista de áreas de investigación asociadas con el miembro (Array de Strings).
- **foto**: ObjectId que se refiere a la foto del miembro en GridFS (ObjectId).
- **enlace_cv**: Enlace al CV o perfil profesional del miembro (String).
- **creado_en**: Fecha en la que se agregó el miembro (Date).
- **actualizado_en**: Fecha en la que se actualizó por última vez la información del miembro (Date).
- **creado_por**: ObjectId que se refiere al creador (ObjectId).
- **permiso**: Nivel de permiso requerido para modificar la información del miembro (String).

## Colección: `convenios_alianzas`

- **_id**: Identificador único (ObjectId).
- **institucion**: Nombre de la institución (String).
- **objetivos**: Lista de objetivos del convenio (Array de Strings).
- **resultados**: Lista de resultados obtenidos del convenio (Array de Strings).
- **enlace_institucion**: Enlace a la página de la institución (String).
- **documentos_adjuntos**: Lista de documentos adjuntos (Array de Documentos Embebidos).
- **creado_en**: Fecha en la que se creó el convenio (Date).
- **actualizado_en**: Fecha en la que se actualizó por última vez el convenio (Date).
"""
