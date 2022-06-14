# Rutas para acceder a la Data:

### Hacer register **PUBLICA** **POST** http://localhost:3001/api/auth/register

### Hacer Login **PUBLICA** **POST** http://localhost:3001/api/auth/login

### Obtener Cursos **PUBLICA** **GET** http://localhost:3001/api/cursos

### Obtener Cursos por nombre **PUBLICA** **GET** http://localhost:3001/api/cursos/:name

### Obtener Cursos ID **PUBLICA** **GET** http://localhost:3001/api/cursos/:id

### Obtener Lista User **PRIVADA** **GET** http://localhost:3001/api/usersprivate/

### Crear Cursos **PRIVADA** **POST** http://localhost:3001/api/cursosprivate

### Crear Lesson para un curso **PRIVADA** **POST** http://localhost:3001/api/cursosprivate/:id

### Buscar User por UserName **PRIVADA** **GET** http://localhost:3001/api/usersprivate/username

### Agregar Cursos Favoritos **PRIVADA** **PUT** http://localhost:3001/api/cursosprivate/:id/favorite
