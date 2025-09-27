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

#

## ENDPOINTS y Ejemplos de request/response.

#### AUTH

**POST /api/auth/register**: Registro de usuario con perfil embebido. (público)
**Request**

```http
{
  "username": "Javier",
  "email": "javimartinez@gmail.com",
  "password": "Javi1234",
  "role": "admin",
  "profile": {
    "first_name": "Javier Nicolas",
    "last_name": "Martínez"
  }
}
```

**Response**

```http
{
    "ok": true,
    "message": "Usuario registrado exitosamente",
    "user": {
        "username": "javier",
        "email": "javimartinez@gmail.com",
        "password": "$2b$10$Z.hHfVu.zFONTnNL8.JNde36v5.jV0rEbRKL.ryPWZrBhFuJJtNDa",
        "role": "admin",
        "profile": {
            "first_name": "Javier Nicolas",
            "last_name": "Martínez",
            "biography": "",
            "avatarUrl": "",
            "birthDate": "2025-09-27T00:25:15.318Z"
        },
        "deletedAt": null,
        "_id": "68d72eebdf089126becd7bdb",
        "createdAt": "2025-09-27T00:25:15.330Z",
        "updatedAt": "2025-09-27T00:25:15.330Z",
        "id": "68d72eebdf089126becd7bdb"
    }
}
```

**POST /api/auth/login:** Login con JWT enviado como cookie segura. (público)
**Request**

```http
{
    "username": "Javier",
    "password": "Javi1234"
}
```

**Response**

```http
{
    "ok": true,
    "message": "Login exitoso"
}
```

**GET /api/auth/profile:** Obtener perfil del usuario autenticado. (usuario autenticado)
**Response**

```htpp
{
    "ok": true,
    "message": "Perfil encontrado",
    "data": {
        "first_name": "Javier Nicolas",
        "last_name": "Martínez",
        "biography": "",
        "avatarUrl": "",
        "birthDate": "2025-09-27T00:25:15.318Z"
    }
}
```

**PUT /api/auth/profile:** Actualizar perfil embebido del usuario autenticado. (usuario
autenticado)
**Request**

```http
{
    "profile": {
    "first_name": "Javi Nico",
    "last_name": "Martínezz",
    "biography": "Futuro develop",
    "birthDate": "2001-12-26"
    }
}
```

**Response**

```http
{
    "ok": true,
    "message": "Perfil actualizado",
    "profile": {
        "profile": {
            "first_name": "Javi Nico",
            "last_name": "Martínezz",
            "biography": "Futuro develop",
            "birthDate": "2001-12-26T00:00:00.000Z"
        },
        "_id": "68d72eebdf089126becd7bdb",
        "username": "javier",
        "email": "javimartinez@gmail.com",
        "password": "$2b$10$Z.hHfVu.zFONTnNL8.JNde36v5.jV0rEbRKL.ryPWZrBhFuJJtNDa",
        "role": "admin",
        "deletedAt": null,
        "createdAt": "2025-09-27T00:25:15.330Z",
        "updatedAt": "2025-09-27T00:47:28.724Z",
        "id": "68d72eebdf089126becd7bdb"
    }
}
```

**POST /api/auth/logout**: Logout limpiando cookie de autenticación. (usuario
autenticado)

**Response**

```http
{
    "ok": true,
    "message": "Logout exitoso"
}
```

#### USER

**GET /api/users** → Listar todos los usuarios con populate de artículos. (solo admin)
**Response**

```http
{
    "ok": true,
    "message": "Usuarios encontrados exitosamente",
    "data": [
        {
            "profile": {
                "first_name": "Javi",
                "last_name": "Martínez",
                "biography": "",
                "avatarUrl": "",
                "birthDate": "2025-09-23T14:20:56.570Z"
            },
            "_id": "68d2acc880d69b6ddc3fa5b7",
            "username": "javi",
            "email": "javi@test.com",
            "password": "$2b$10$p.7.XDR3NvVPZqQEwj7YJu.6liMEgjUxkm8zZw.QBZPvePWY3RpYW",
            "role": "admin",
            "deletedAt": null,
            "createdAt": "2025-09-23T14:20:56.617Z",
            "updatedAt": "2025-09-23T14:20:56.617Z",
            "id": "68d2acc880d69b6ddc3fa5b7"
        },...
```

**GET /api/users/:id** → Obtener usuario específico con artículos y comentarios. (solo
admin)
**Response**

```http
"ok": true,
    "data": {
        "profile": {
            "first_name": "Javi Nico",
            "last_name": "Martínezz",
            "biography": "Futuro develop",
            "birthDate": "2001-12-26T00:00:00.000Z"
        },
        "_id": "68d72eebdf089126becd7bdb",
        "username": "javier",
        "email": "javimartinez@gmail.com",
        "password": "$2b$10$Z.hHfVu.zFONTnNL8.JNde36v5.jV0rEbRKL.ryPWZrBhFuJJtNDa",
        "role": "admin",
        "deletedAt": null,
        "createdAt": "2025-09-27T00:25:15.330Z",
        "updatedAt": "2025-09-27T00:47:28.724Z",
        "Articles": [],
        "Comments": [],
        "id": "68d72eebdf089126becd7bdb"
    }
}
```

**PUT /api/users/:id **→ Actualizar usuario (solo admin).
**Request**

```http
{
    "email": "javijoslman@gmail.com"
}
```

**Response**

```http
{
    "ok": true,
    "msg": "Usuario actualizado correctamente",
    "data": {
        "profile": {
            "first_name": "Javi Nico",
            "last_name": "Martínezz",
            "biography": "Futuro develop",
            "birthDate": "2001-12-26T00:00:00.000Z"
        },
        "_id": "68d72eebdf089126becd7bdb",
        "username": "javier",
        "email": "javijoslman@gmail.com",
        "password": "$2b$10$Z.hHfVu.zFONTnNL8.JNde36v5.jV0rEbRKL.ryPWZrBhFuJJtNDa",
        "role": "admin",
        "deletedAt": null,
        "createdAt": "2025-09-27T00:25:15.330Z",
        "updatedAt": "2025-09-27T01:38:16.217Z",
        "id": "68d72eebdf089126becd7bdb"
    }
}
```

**DELETE /api/users/:id** → Eliminación física de usuario (solo admin).
**Response**

```http
{
    "ok": true,
    "message": "Usuario eliminado completamente con exito"
}
```

#### TAG

**POST /api/tags** → Crear etiqueta (solo admin).
**Request**

```http
{
    "name": "PruebasTag",
    "description": "Es para mostrar en el readme"
}
```

**Response**

```http
{
    "ok": true,
    "message": "Etiqueta creada con exito",
    "tag": {
        "name": "PruebasTag",
        "description": "Es para mostrar en el readme",
        "_id": "68d7451683310ae115e0661a",
        "createdAt": "2025-09-27T01:59:50.716Z",
        "updatedAt": "2025-09-27T01:59:50.716Z",
        "id": "68d7451683310ae115e0661a"
    }
}
```

**GET /api/tags **→ Listar todas las etiquetas. (usuario autenticado)
**Response**

```http
"ok": true,
    "message": "Etiquetas encontradas",
    "tags": [
        {
            "_id": "68d4b7f0428c043388e7ff51",
            "name": "Primer etiqueta",
            "description": "Hay que hacerlo ya",
            "createdAt": "2025-09-25T03:33:04.612Z",
            "updatedAt": "2025-09-25T03:33:04.612Z",
            "id": "68d4b7f0428c043388e7ff51"
        },...
```

**GET /api/tags/:id** → Obtener etiqueta con populate de artículos asociados (usuario
autenticado).
**Response**
{
"ok": true,
"message": "La etiqueta fue encontrada con exito",
"oneTag": {
"\_id": "68d7451683310ae115e0661a",
"name": "PruebasTag",
"description": "Es para mostrar en el readme",
"createdAt": "2025-09-27T01:59:50.716Z",
"updatedAt": "2025-09-27T01:59:50.716Z",
"Articles": [],
"id": "68d7451683310ae115e0661a"
}
}

**PUT /api/tags/:id** → Actualizar etiqueta (solo admin).
**Request**

```http
{
    "description": "Cambio y prueba"
}
```

**Response**

```http
{
    "ok": true,
    "message": "Etiqueta actualizada",
    "updatedTag": {
        "_id": "68d7451683310ae115e0661a",
        "name": "PruebasTag",
        "description": "Cambio y prueba",
        "createdAt": "2025-09-27T01:59:50.716Z",
        "updatedAt": "2025-09-27T03:07:54.842Z",
        "id": "68d7451683310ae115e0661a"
    }
}
```

**DELETE /api/tags/:id **→ Eliminar etiqueta (solo admin).

**Response**

```http
{
    "ok": true,
    "message": "Etiqueta eliminada exitosamente",
    "deletedTag": {
        "_id": "68d7451683310ae115e0661a",
        "name": "PruebasTag",
        "description": "Cambio y prueba",
        "createdAt": "2025-09-27T01:59:50.716Z",
        "updatedAt": "2025-09-27T03:07:54.842Z",
        "id": "68d7451683310ae115e0661a"
    }
}
```

#### ARTICLE

**POST /api/articles **→ Crear artículo. (usuario autenticado)
**Request**

```http
{
    "title": "Article de prueba",
    "content": "Esto es una prueba para el readme - viendo si funciona todo correctamente",
    "excerpt": "Prueba prueba prueba",
    "status": "archived",
    "tags": [
        "68d4b7f0428c043388e7ff51"
    ]
}
```

**Response**

```http
{
    "ok": true,
    "message": "Artículo creado exitosamente",
    "data": {
        "title": "Article de prueba",
        "content": "Esto es una prueba para el readme - viendo si funciona todo correctamente",
        "excerpt": "Prueba prueba prueba",
        "status": "archived",
        "author": "68d72eebdf089126becd7bdb",
        "tags": [
            "68d4b7f0428c043388e7ff51"
        ],
        "_id": "68d822ded19b7882dfd662f8",
        "createdAt": "2025-09-27T17:46:06.021Z",
        "updatedAt": "2025-09-27T17:46:06.021Z",
        "id": "68d822ded19b7882dfd662f8"
    }
}
```

**GET /api/articles** → Listar artículos publicados con populate de author y tags.
(usuario autenticado)
**Response**

```http
{
"ok": true,
    "message": "Articulos encontrados",
    "articles": [
            "_id": "68d822ded19b7882dfd662f8",
            "title": "Article de prueba",
            "content": "Esto es una prueba para el readme - viendo si funciona todo correctamente",
            "excerpt": "Prueba prueba prueba",
            "status": "archived",
            "author": {
                "profile": {
                    "first_name": "Javi Nico",
                    "last_name": "Martínezz",
                    "biography": "Futuro develop",
                    "birthDate": "2001-12-26T00:00:00.000Z"
                },
                "_id": "68d72eebdf089126becd7bdb",
                "username": "javier",
                "email": "javijoslman@gmail.com",
                "password": "$2b$10$Z.hHfVu.zFONTnNL8.JNde36v5.jV0rEbRKL.ryPWZrBhFuJJtNDa",
                "role": "admin",
                "deletedAt": null,
                "createdAt": "2025-09-27T00:25:15.330Z",
                "updatedAt": "2025-09-27T01:38:16.217Z",
                "id": "68d72eebdf089126becd7bdb"
            },
            "tags": [
                {
                    "_id": "68d4b7f0428c043388e7ff51",
                    "name": "Primer etiqueta",
                    "description": "Hay que hacerlo ya",
                    "createdAt": "2025-09-25T03:33:04.612Z",
                    "updatedAt": "2025-09-25T03:33:04.612Z",
                    "id": "68d4b7f0428c043388e7ff51"
                }
            ],
            "createdAt": "2025-09-27T17:46:06.021Z",
            "updatedAt": "2025-09-27T17:46:06.021Z",
            "id": "68d822ded19b7882dfd662f8"
        }
    ]
}
```

**GET /api/articles/:id **→ Obtener artículo por ID con populate completo. (usuario
autenticado)
**Response**

```http
{
    "ok": true,
    "message": "Articulo encontrado",
    "article": {
        "_id": "68d822ded19b7882dfd662f8",
        "title": "Article de prueba",
        "content": "Esto es una prueba para el readme - viendo si funciona todo correctamente",
        "excerpt": "Prueba prueba prueba",
        "status": "archived",
        "author": {
            "profile": {
                "first_name": "Javi Nico",
                "last_name": "Martínezz",
                "biography": "Futuro develop",
                "birthDate": "2001-12-26T00:00:00.000Z"
            },
            "_id": "68d72eebdf089126becd7bdb",
            "username": "javier",
            "email": "javijoslman@gmail.com",
            "password": "$2b$10$Z.hHfVu.zFONTnNL8.JNde36v5.jV0rEbRKL.ryPWZrBhFuJJtNDa",
            "role": "admin",
            "deletedAt": null,
            "createdAt": "2025-09-27T00:25:15.330Z",
            "updatedAt": "2025-09-27T01:38:16.217Z",
            "id": "68d72eebdf089126becd7bdb"
        },
        "tags": [
            {
                "_id": "68d4b7f0428c043388e7ff51",
                "name": "Primer etiqueta",
                "description": "Hay que hacerlo ya",
                "createdAt": "2025-09-25T03:33:04.612Z",
                "updatedAt": "2025-09-25T03:33:04.612Z",
                "id": "68d4b7f0428c043388e7ff51"
            }
        ],
        "createdAt": "2025-09-27T17:46:06.021Z",
        "updatedAt": "2025-09-27T17:46:06.021Z",
        "id": "68d822ded19b7882dfd662f8"
    }
}
```

**GET /api/articles/my** → Listar artículos del usuario logueado. (usuario autenticado)
**Response**

```http
{
    "ok": true,
    "message": "Tus articulos",
    "articles": [
        {
            "_id": "68d822ded19b7882dfd662f8",
            "title": "Article de prueba",
            "content": "Editado para muestra, esto es un contenido nuevo, las exigencias son muchas",
            "excerpt": "Prueba prueba prueba",
            "status": "archived",
            "author": "68d72eebdf089126becd7bdb",
            "tags": [
                "68d4b7f0428c043388e7ff51"
            ],
            "createdAt": "2025-09-27T17:46:06.021Z",
            "updatedAt": "2025-09-27T18:21:14.250Z",
            "id": "68d822ded19b7882dfd662f8"
        },
        {
            "_id": "68d82c9fcf3b90004a878ea7",
            "title": "Nuevo article",
            "content": "Esto es una prueba para el readme - viendo si funciona todo correctamente nueva nueva",
            "excerpt": "Prueba prueba prueba",
            "status": "published",
            "author": "68d72eebdf089126becd7bdb",
            "tags": [
                "68d4b7f0428c043388e7ff51"
            ],
            "createdAt": "2025-09-27T18:27:43.414Z",
            "updatedAt": "2025-09-27T18:27:43.414Z",
            "id": "68d82c9fcf3b90004a878ea7"
        }
    ]
}
```

**PUT /api/articles/:id **→ Actualizar artículo (solo autor o admin).
**Request**

```http
{
    "content": "Editado para muestra, esto es un contenido nuevo, las exigencias son muchas"
}
```

**Response**

```http
{
    "ok": true,
    "message": "Articulo actualizado correctamente",
    "updatedArticle": {
        "_id": "68d822ded19b7882dfd662f8",
        "title": "Article de prueba",
        "content": "Editado para muestra, esto es un contenido nuevo, las exigencias son muchas",
        "excerpt": "Prueba prueba prueba",
        "status": "archived",
        "author": "68d72eebdf089126becd7bdb",
        "tags": [
            "68d4b7f0428c043388e7ff51"
        ],
        "createdAt": "2025-09-27T17:46:06.021Z",
        "updatedAt": "2025-09-27T18:21:14.250Z",
        "id": "68d822ded19b7882dfd662f8"
    }
}
```

**DELETE /api/articles/:id** → Eliminación física (solo autor o admin).
**Response**

```http
{
    "ok": true,
    "message": "Articulo eliminado exitosamente",
    "deletedArticle": {
        "_id": "68d4b9b7f67321b8c779bf63",
        "title": "hola1",
        "content": "Editado",
        "excerpt": "dasmdkamdkas1",
        "status": "archived",
        "author": "68d2acc880d69b6ddc3fa5b7",
        "tags": [
            "68d4b7f0428c043388e7ff51"
        ],
        "createdAt": "2025-09-25T03:40:39.402Z",
        "updatedAt": "2025-09-25T12:16:24.054Z",
        "id": "68d4b9b7f67321b8c779bf63"
    }
}
```

#### COMMENTS

**POST /api/comments **→ Crear comentario en artículo. (usuario autenticado)
**Request**

```http
{
    "content": "Prueba de comentario en artículo",
    "article": "68d822ded19b7882dfd662f8"
}
```

**Response**

```http
{
    "ok": true,
    "message": "Comentario creado con exito",
    "comment": {
        "content": "Prueba de comentario en artículo",
        "author": "68d72eebdf089126becd7bdb",
        "article": "68d822ded19b7882dfd662f8",
        "_id": "68d833215943e66a623c8ffa",
        "createdAt": "2025-09-27T18:55:29.629Z",
        "updatedAt": "2025-09-27T18:55:29.629Z"
    }
}
```

**GET /api/comments/article/:articleId **→ Listar comentarios de un artículo con
populate de author. (usuario autenticado)
**Response**

```http
{
    "ok": true,
    "message": "El artículo con sus comentarios y author son:",
    "commentArt": {
        "_id": "68d822ded19b7882dfd662f8",
        "title": "Article de prueba",
        "content": "Editado para muestra, esto es un contenido nuevo, las exigencias son muchas",
        "excerpt": "Prueba prueba prueba",
        "status": "archived",
        "author": {
            "profile": {
                "first_name": "Javi Nico",
                "last_name": "Martínezz",
                "biography": "Futuro develop",
                "birthDate": "2001-12-26T00:00:00.000Z"
            },
            "_id": "68d72eebdf089126becd7bdb",
            "username": "javier",
            "email": "javijoslman@gmail.com",
            "password": "$2b$10$Z.hHfVu.zFONTnNL8.JNde36v5.jV0rEbRKL.ryPWZrBhFuJJtNDa",
            "role": "admin",
            "deletedAt": null,
            "createdAt": "2025-09-27T00:25:15.330Z",
            "updatedAt": "2025-09-27T01:38:16.217Z",
            "id": "68d72eebdf089126becd7bdb"
        },
        "tags": [
            "68d4b7f0428c043388e7ff51"
        ],
        "createdAt": "2025-09-27T17:46:06.021Z",
        "updatedAt": "2025-09-27T18:21:14.250Z",
        "Comments": [
            {
                "_id": "68d833215943e66a623c8ffa",
                "content": "Prueba de comentario en artículo",
                "author": "68d72eebdf089126becd7bdb",
                "article": "68d822ded19b7882dfd662f8",
                "createdAt": "2025-09-27T18:55:29.629Z",
                "updatedAt": "2025-09-27T18:55:29.629Z"
            },
            {
                "_id": "68d836784d89508e1ef492dc",
                "content": "Prueba de comentario en artículo nuevo",
                "author": "68d72eebdf089126becd7bdb",
                "article": "68d822ded19b7882dfd662f8",
                "createdAt": "2025-09-27T19:09:44.992Z",
                "updatedAt": "2025-09-27T19:09:44.992Z"
            }
        ],
        "id": "68d822ded19b7882dfd662f8"
    }
}
```

**GET /api/comments/my **→ Listar comentarios del usuario logueado. (usuario
autenticado)
**Response**

```http
{
    "ok": true,
    "message": "Los comentarios encontrados son:",
    "mycomments": [
        {
            "_id": "68d833215943e66a623c8ffa",
            "content": "Prueba de comentario en artículo",
            "author": "68d72eebdf089126becd7bdb",
            "article": "68d822ded19b7882dfd662f8",
            "createdAt": "2025-09-27T18:55:29.629Z",
            "updatedAt": "2025-09-27T18:55:29.629Z"
        },
        {
            "_id": "68d836784d89508e1ef492dc",
            "content": "Prueba de comentario en artículo nuevo",
            "author": "68d72eebdf089126becd7bdb",
            "article": "68d822ded19b7882dfd662f8",
            "createdAt": "2025-09-27T19:09:44.992Z",
            "updatedAt": "2025-09-27T19:09:44.992Z"
        }
    ]
}
```

**PUT /api/comments/:id **→ Actualizar comentario (solo autor o admin).
**Request**

```http
{
    "content": "CAMBIO EN EL COMENTARIO PARA EL README"
}
```

**Response**

```http
{
    "ok": true,
    "message": "Comentario actualizado",
    "updatedComment": {
        "_id": "68d836784d89508e1ef492dc",
        "content": "CAMBIO EN EL COMENTARIO PARA EL README",
        "author": "68d72eebdf089126becd7bdb",
        "article": "68d822ded19b7882dfd662f8",
        "createdAt": "2025-09-27T19:09:44.992Z",
        "updatedAt": "2025-09-27T19:32:24.795Z"
    }
}
```

**DELETE /api/comments/:id **→ Eliminación física de comentario (solo autor o
admin).
**Response**

```http
{
    "ok": true,
    "message": "Comentario eliminado",
    "deletedComment": {
        "_id": "68d83f5da64eafa7d7c44a44",
        "content": "Prueba de comentario en artículo nuevo para eliminacion",
        "author": "68d72eebdf089126becd7bdb",
        "article": "68d822ded19b7882dfd662f8",
        "createdAt": "2025-09-27T19:47:41.538Z",
        "updatedAt": "2025-09-27T19:47:41.538Z"
    }
}
```

#### ARTICLE - TAGS

**POST /api/articles/:articleId/tags/:tagId** → Agregar etiqueta a artículo. (solo autor
o admin)
**Response**

```http
{
    "ok": true,
    "message": "Etiqueta agregada al artículo",
    "Article": {
        "_id": "68d82c9fcf3b90004a878ea7",
        "title": "Nuevo article",
        "content": "Esto es una prueba para el readme - viendo si funciona todo correctamente nueva nueva",
        "excerpt": "Prueba prueba prueba",
        "status": "published",
        "author": "68d72eebdf089126becd7bdb",
        "tags": [
            "68d4b7f0428c043388e7ff51",
            "68d744f1c5b1629ddeff64e7"
        ],
        "createdAt": "2025-09-27T18:27:43.414Z",
        "updatedAt": "2025-09-27T19:57:34.530Z",
        "id": "68d82c9fcf3b90004a878ea7"
    }
}
```

**DELETE /api/articles/:articleId/tags/:tagId** → Remover etiqueta de artículo. (solo
autor o admin)
**Response**

```http
{
    "ok": true,
    "message": "Etiqueta eliminada del articulo",
    "ArticleTag": {
        "_id": "68d82c9fcf3b90004a878ea7",
        "title": "Nuevo article",
        "content": "Esto es una prueba para el readme - viendo si funciona todo correctamente nueva nueva",
        "excerpt": "Prueba prueba prueba",
        "status": "published",
        "author": "68d72eebdf089126becd7bdb",
        "tags": [
            "68d4b7f0428c043388e7ff51"
        ],
        "createdAt": "2025-09-27T18:27:43.414Z",
        "updatedAt": "2025-09-27T19:59:11.589Z",
        "id": "68d82c9fcf3b90004a878ea7"
    }
}
```

## Guía de Inicialización y Configuración del ProyectoGuía de Inicialización y Configuración del Proyecto

#### Siga los siguientes pasos para poner en marcha el proyecto en su entorno local:Siga los siguientes pasos para poner en marcha el proyecto en su entorno local:

##### 1. Clonación del Repositorio

- Primero, clone el repositorio a su máquina local.
- Diríjase a la ubicación de su preferencia.
- Clone el repositorio utilizando el método que proporciona GitHub (HTTPS o SSH) en la terminal de su sistema:

```powershell
git clone [URL_DEL_REPOSITORIO]

```

**Acceda al directorio del proyecto:**

```powershell
cd [NOMBRE_DEL_DIRECTORIO]
```

##### 2.Instalación de Dependencias

El proyecto utiliza Node.js y Express junto con una serie de librerías esenciales. A continuación, se detallan las principales dependencias que se instalarán:

**Dependencia Propósito Principal**
**express** _Framework principal para la construcción de la API._
**mongoose** _Modelado de objetos para MongoDB (ODM)._
**dotenv** _Carga de variables de entorno desde el archivo .env._
**bcrypt** _Hashing de contraseñas para seguridad._
**jsonwebtoken** _Creación y verificación de JSON Web Tokens (JWT) para autenticación._
**cors** _Habilita el Intercambio de Recursos de Origen Cruzado (CORS)._
**morgan** _Logger de peticiones HTTP para desarrollo._
**express-validator** _Middleware para validación y saneamiento de datos._
**cookie-parser** _Parseo de cookies adjuntas a las peticiones del cliente._

##### Para descargar todas estas librerías, ejecute el siguiente comando en la terminal, dentro del directorio del proyecto:

```powershell
npm install
# O su forma corta:
npm i
```

##### 3. Configuración del Entorno (.env)

- Para que el proyecto se conecte correctamente a la base de datos y funcione con su configuración de seguridad, debe establecer las variables de entorno:

- Cree una copia del archivo de ejemplo y renómbrelo a .env:

```powershell
cp .env.example .env

```

_Abra el nuevo archivo .env y configure las variables con los valores correspondientes a su entorno local (por ejemplo, el URI de su base de datos, el puerto del servidor, la clave secreta de JWT, etc.)._

##### 4. Conexión a la Base de Datos

**El proyecto requiere una instancia de MongoDB para almacenar sus datos:**

Asegúrese de tener un servidor de MongoDB corriendo (localmente o en un servicio cloud como Atlas).

Verifique que el nombre de la base de datos especificado en su variable de entorno MONGO_URI (o similar) sea el correcto. Mongoose gestionará la conexión usando este URI al iniciar el servidor.

##### 5. Punto de Entrada Principal (app.js)

El corazón de la aplicación es el archivo app.js (o server.js, dependiendo de la convención), donde se inicializa la aplicación Express y se configura el middleware esencial (como dotenv, express, cors, morgan, y las rutas de la API) antes de que el servidor comience a escuchar peticiones en el puerto configurado.

Asegúrese de que este archivo esté correctamente configurado para importar y utilizar todas las dependencias listadas, establecer la conexión con Mongoose y levantar el servidor.

##### 6. Inicio del Proyecto

Una vez que las dependencias estén instaladas y las variables de entorno configuradas, inicie el servidor de desarrollo:

```powershell
npm run dev
```

El proyecto ahora debería estar corriendo en el puerto especificado en su archivo .env (por ejemplo, http://localhost:3000), listo para recibir consultas y entregar respuestas satisfactorias.
Por si le sirve, podría utilizar la aplicación "POSTMAN" que fue la que use yo para hacer las pruebas de más arriba.

## Explicación de las validaciones personalizadas implementadas.

```javascript
export const idCommentValidation = [
    .custom(async (id) => {
      const comment = await CommentModel.findById(id);
      if (!comment) {
        throw new Error("El comentario no existe");
      }
      return true;
    }),
];

export const idArticleCommentValidation = [
  param("articleId")
    .custom(async (id) => {
      const article = await ArticleModel.findById(id);
      if (!article) {
        throw new Error("El articulo no existe");
      }
      return true;
    }),
];
```

Ambas funciones utilizan la validación personalizada (.custom) de express-validator para verificar la existencia de un recurso en la base de datos de MongoDB (a través de Mongoose).
idCommentValidation - Hay varias que son parecidas.
Código y Descripción
idCommentValidation Esta validación se aplica directamente al campo que se está validando en el request.
CommentModel.findById(id) Su propósito es confirmar que un comentario existe en la base de datos.

A diferencia de: idArticleCommentValidation
El custom aqui valida el parametro especifico:
param("articleId") Esta validación está explícitamente dirigida al campo llamado articleId que se espera encontrar en los parámetros de la URL (req.params).
ArticleModel.findById(id) Su propósito es confirmar que un artículo existe en la base de datos, utilizando el valor de articleId.

**Cuando algun campo exige ser unico en la base de datos: por ejemplo email.**

```javascript
 .custom(async (email, { req }) => {
      const emailExiste = await UserModel.findOne({
        email: email,
        _id: { $ne: req.params.id },
      });
      if (emailExiste) {
        throw new Error("El email ya está en uso");
      }
      return true;
    }),

```

**Análisis de la Validación**
La validación, que es una función personalizada de express-validator, realiza los siguientes pasos:
Recupera el Email y el ID del Usuario:
Toma el valor del email que se está enviando en el request como primer argumento.

_Accede al objeto req (petición de Express) para obtener el ID del usuario que se está actualizando (req.params.id)._

**Consulta a la Base de Datos (MongoDB/Mongoose):**

Ejecuta una búsqueda asíncrona usando UserModel.findOne() para encontrar un usuario que cumpla con dos condiciones simultáneas:

email: email: Que el email del usuario en la base de datos coincida con el email que se está validando.

\_id: { $ne: req.params.id }: Que el ID del usuario encontrado NO sea igual al ID del usuario que se está actualizando. (El operador $ne significa "not equal").

###### Lógica de Unicidad (El Core de la Validación):

Si emailExiste es verdadero (es decir, la consulta encuentra un usuario que usa ese email PERO tiene un ID diferente al que se está actualizando), se lanza el error:

```javascript
throw new Error("El email ya está en uso");
```

Si emailExiste es falso (la consulta no encuentra ningún otro usuario con ese email), la validación es exitosa:

```javascript
return true;
```

¿Por qué la condición \_id: { $ne: req.params.id }?
Esta es la clave para las operaciones de actualización. Al actualizar su propio perfil, un usuario puede enviar su email actual sin modificarlo. Si la consulta solo buscara por el email, encontraría al usuario, lanzaría el error y bloquearía la actualización.

Al añadir la condición $ne, la validación dice: "Busca si algún otro usuario (con un ID diferente) ya está usando este email". De esta manera, permite que el usuario mantenga su email si no lo ha modificado, pero impide que use el email de un tercero.

### LOGUEADO

```javascript
export const adminMiddleware = async (req, res, next) => {
  try {
    if (req.logeado.role !== "admin") {
      return res
        .status(403)
        .json({ ok: false, Message: "Solo un admin puede hacer esta acción" });
    }
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, message: "Error interno del servidor" });
  }
};
```

Verifica que el usuario logueado tenga el role: admin.

```javascript
export const OwnerOrAdminCommentMiddleware = async (req, res, next) => {
  const logueado = req.logeado;
  try {
    const comment = await CommentModel.findOne({ _id: req.params.id });

    if (logueado.role !== "admin" && comment.author !== logueado._id) {
      return res.status(401).json({
        ok: false,
        message: "No tienes permisos",
      });
    }

    next();
  } catch (error) {
    console.error("Server error", error);
    return res.status(500).json({
      ok: false,
      message: "Error en el servidor",
    });
  }
};

export const ownerOrAdminArticleMiddleware = async (req, res, next) => {
  const logueado = req.logeado;
  try {
    const articulo = await ArticleModel.findOne({ _id: req.params.id });
    // console.log(articulo);
    if (logueado.role !== "admin" && articulo.author !== logueado._id) {
      return res.status(403).json({ ok: false, message: "No tiene permisos" });
    }
    next();
  } catch (error) {
    res.status(500).json({ ok: false, message: "Error interno del servidor" });
  }
};
```

El primero verifica si el role del que quiere hacer un cambio al comentario es admin o si es el autor.
El segundo verifica si el role del que quiere hacer un cambio al articulo es admin o si es el autor.
