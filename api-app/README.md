### NOTA: **RECUERDEN GENERAR EL .ENV**

# Rutas para acceder a la Data:

### Hacer register **PUBLICA** **POST** /api/auth/register

### Hacer Login **PUBLICA** **POST** /api/auth/login

### Obtener Cursos **PUBLICA** **GET** /api/cursos

### Obtener Cursos por nombre **PUBLICA** **GET** /api/cursos/:name

### Obtener Cursos ID **PUBLICA** **GET** /api/cursos/:id

### Obtener Lista User **PRIVADA** **GET** /api/usersprivate/

### Crear Cursos **PRIVADA** **POST**/api/cursosprivate

### Crear Lesson para un curso **PRIVADA** **POST** /api/cursosprivate/:id

### Añadir Favoritos **PRIVADA** **PUT** /api/cursosprivate/favorite

### Añadir Curso **PRIVADA** **PUT** /api/cursosprivate/add

### Remove Favoritos **PRIVADA** **PUT** /api/cursosprivate/unfavorite

### Anadir Voto **PRIVADA** **PUT** /api/cursosprivate/:id/votes

### Editar Perfil **PRIVADA** **PUT** /api/usersprivate/:id/profile
