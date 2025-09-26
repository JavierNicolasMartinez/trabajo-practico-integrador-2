# **DOCUMENTACIÓN**

## Relaciones entre los modelos:

### Relación 1:1 embebida: User ↔ Profile (profile embebido en User)

- El perfil pertenece exclusivamente al "User" que es el documento padre.
- Entonces, la información siempre se consulta dependiendo del usuario.
- Basicamente, no puede existir un perfil sin un usuario que se registre y especifique sus datos.

**VENTAJAS:**

- Una gran ventaja es que al consultar sobre un usuario con un simple Id podemos traer todos los datos del padre con los hijos.
- Viene todo en una sola contula.

**DESVENTAJAS:**

- La primera desventaja que pude observar es que el "profile" tiene demasiados campos, lo cuál vuelve al schema demasiado grande y se puede hacer muy grande la cantidad de datos que pueden llegar a ser cargadados en un solo usuario.
- Los controladores para poder hacer cambios o eliminar tienen una dificultad mayor, en algunas ocasiones tuve una difultad para consultad los datos.

### Relación 1:N referenciada: User → Article (author referenciado)

- En el Schema de "Article" es referenciado el "Author", osea el usuario que crea el Artículo.

### Relación 1:N referenciada: Article → Comment (article referenciado)

- En el Schema de "Comment" es referenciado el Artículo, que a su vez también tiene una referencia con el Author del comentario. Esta relación es de uno a muchos, un artículo puede tener muchos comentarios.

### Relación N:M referenciada: Article ↔ Tag (array de ObjectIds)

- En el Schema de "Article" es referenciado un Array de Tags, la relación es de muchos a muchos, porque muchos artículos pueden tener muchas etiquetas.

**VENTAJAS:**

- Esto facilita la consulta independiente, como también las otras relaciones que posee, esto facilita mucho las busquedas.
- Es mejor usar referenciado porque en este caso son relaciones de uno a muchos o de muchos a muchos.
- Evita la duplicación de datos.

**DESVENTAJAS:**

- Una gran desventaja es que requiero múltiples consultas.
- Si es que referencie algo mal, me puede generar problemas y romper.

```javascript

```

<!-- 6. Documentación requerida
En el README.md incluir:
● Explicar con sus propias palabras por qué se eligió embebido o referenciado para
cada relación. Analizar ventajas y desventajas de cada decisión tomada en el diseño
del sistema.
● Documentación de endpoints con ejemplos de request/response.
● Instrucciones de instalación y configuración.
● Explicación de las validaciones personalizadas implementadas. -->
