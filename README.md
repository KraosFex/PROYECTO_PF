# PROYECTO_PF

## Planteamiento:

Nuestro objetivo principal es fomentar la cultura del mundo TI e interesar tanto a
niños como adolescente en el desarrollo web. Buscamos crear un entorno educativo digital
donde nuestros usuarios puedan familiarizarse con la lógica de programación y en el cual
los mismos aprendan los fundamentos básicos sobre la creación de sitios web.

Nuestro proyecto busca motivar a sus usuarios mediante el uso de herramientas
interactivas y didácticas que vuelvan el flujo de aprendizaje más entretenido, y a través de
la implementación de un ecosistema de competencia sana (Sistema de Rankings) que
logren que nuestros clientes si automotiven a superar/completar cursos con el fin de tener
un puesto más elevado en la competición.

También cabe destacar que cada usuario tendrá un perfil en el que se mostrará un
nivel de aprendizaje, este nivel iría aumentando entorna a que el estudiante vaya
completando clases, esto permitiría que el usuario este al tanto de su progreso general
todo el tiempo.

### NOTA: **RECUERDEN GENERAR EL .ENV**

# Rutas para acceder a la Data:

### Hacer register **PUBLICA** **POST** http://localhost:3001/api/auth/register

### Hacer Login **PUBLICA** **POST** http://localhost:3001/api/auth/login

### Obtener Cursos **PUBLICA** **GET** http://localhost:3001/api/cursos

### Obtener Cursos por nombre **PUBLICA** **GET** http://localhost:3001/api/cursos/:name

### Obtener Cursos ID **PUBLICA** **GET** http://localhost:3001/api/cursos/:id

### Obtener Lista User **PRIVADA** **GET** http://localhost:3001/api/usersprivate/

### Crear Cursos **PRIVADA** **POST** http://localhost:3001/api/cursosprivate

### Crear Lesson para un curso **PRIVADA** **POST** http://localhost:3001/api/cursosprivate/:id

### Añadir Favoritos **PRIVADA** **PUT** http://localhost:3001/api/cursosprivate/:id/favorite

### Remove Favoritos **PRIVADA** **PUT** http://localhost:3001/api/cursosprivate/:id/unfavorite

### Anadir Voto **PRIVADA** **PUT** http://localhost:3001/api/cursosprivate/:id/votes

### Editar Perfil **PRIVADA** **PUT** http://localhost:3001/api/usersprivate/:id/profile

### Stripe (pago) **PRIVADA** **POST** http://localhost:3001/api/paysprivate
