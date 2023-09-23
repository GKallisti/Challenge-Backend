![Estoes](assets/images/logo.png "Esto es Agencia Digital")
# Backend challenge
* Se debe crear un servicio que maneje los datos de la plataforma de gestión de proyectos.
* Si bien no hay restricción de tiempo, creemos que de 3 a 5 horas es un tiempo razonable para entregarlo con calidad.

## Diseño
Podés encontrar el diseño [acá](https://www.figma.com/file/YLDHikbDgfsZbVdEbO0H6U/Full-Stack-Test-1?node-id=1%3A1701). La referencia sirve para tener una idea clara del servicio a desarrollar.

## Definición funcional
El usuario accede a un administrador de proyectos para realizar la gestión, puede crearlos, editarlos y eliminarlos.

* El usuario puede crear proyectos y editarlos.
* El usuario puede eliminar proyectos.
* El usuario puede asignar proyectos a usuarios.
* El usuario puede buscar un proyecto.

## API REST
El objetivo es realizar la construcción de endpoint clase Projects que represente la información del proyecto como muestra el diseño.

* Realizar el schema de base de datos de proyectos(MySQL).
* El endpoint debe traer un listado de proyectos con paginado.
* Traer un solo proyecto /id.
* Realizar un POST para insertar o editar un proyecto.
* Realizar un DELETE para eliminar un proyecto.
* Debe permitir realizar una búsqueda por nombre de proyecto.
* Asignar multiples usuarios a un proyecto.
* Se debe utilizar swagger para documentar los endpoints.

## Definiciones técnicas
* El servicio debe estar realizado en Laravel, Node Express o el framework de JS que te sea más comodo utilizar.
* La aplicación debe estar publicada y debe ser accesible mediante un link(Ver Netfly, Heroku) o cualquier webserver.
* El código de la aplicación debe estar subida a un repositorio de público acceso.

## Consideraciones
* Es importante que existan las validaciones de datos, ejemplo si se solicita un proyecto que no existe.

## Muchas gracias por tu tiempo!



#################################################################################################################

# Desafío de Backend - Postulación a Primer Empleo IT

¡Hola, soy Gisella y este es mi repositorio de desafío de backend Challenge! 🚀

## Descripción del Desafío

Este proyecto es parte de mi proceso de postulación a un puesto como desarrolladora backend. El desafío consiste en crear una aplicación backend que gestiona proyectos y usuarios, con relaciones entre ellos. Mi objetivo es demostrar mis habilidades en el desarrollo de aplicaciones web utilizando tecnologías como Node.js, Express.js, Sequelize (ORM), y PostgreSQL.

## Características Clave

- Creación, lectura, actualización y eliminación (CRUD) de proyectos.
- Asignación de usuarios a proyectos.
- Gestión de usuarios y proyectos.
- Paginación de proyectos.
- API RESTful para acceder a los datos.

## Tecnologías Utilizadas

- Node.js
- Express.js
- Sequelize (ORM)
- PostgreSQL
- Swagger (documentación de API)
- Otros módulos y bibliotecas de Node.js según sea necesario.

## Instrucciones de Uso

1. De ser necesario, clona este repositorio en tu máquina local.
2. Instala las dependencias utilizando `npm install`.
3. Configura una base de datos PostgreSQL y actualiza la configuración en el archivo `.env`.
4. Ejecuta el servidor utilizando `npm start`.
5. Accede a la documentación de la API en `https://pm-backend-challenge.onrender.com/api-docs/`.
6. Accede al deploy ejecutandose en Render desde `https://pm-backend-challenge.onrender.com`.


## Documentación de la API

La documentación de la API se encuentra disponible en [Swagger](https://pm-backend-challenge.onrender.com/api-docs/) y proporciona detalles sobre cómo interactuar con los endpoints de la aplicación.

## Contribuir

Si deseas contribuir a este proyecto, ¡te animo a hacerlo! Puedes abrir problemas, proponer mejoras o enviar solicitudes de extracción.

## Autor

- Nombre: Gisella Gonzalez
- Portafolio: https://portfolio-gkallisti.vercel.app/
- LinkedIn: https://www.linkedin.com/in/gisella-gkallisti/
- Correo Electrónico: gg.kallisti@gmail.com

## Agradecimientos

Me gustaría agradecer a German Cugliandolo por brindarme la oportunidad de presentar mi desafío de backend como parte de mi proceso de postulación. ¡Espero con gusto la posibilidad de trabajar juntos!

---

¡Gracias por visitar mi repositorio! Si tienes alguna pregunta o comentario, ¡no dudes en ponerte en contacto conmigo! 😊 Que tengas un hermoso dia!
