# Miads Platform v2

Stack: Next.js, TypeScript 6, Tailwind CSS 4, shadcn/ui, Supabase, Lucide e Inter.

## Inicio
1. Copia `.env.example` a `.env.local`.
2. Agrega las claves de Supabase.
3. Ejecuta `supabase/schema.sql` en el SQL Editor.
4. En Supabase Authentication > URL Configuration agrega `http://localhost:3000/auth/callback`.
5. Para Google activa el proveedor y configura su Client ID/Secret.
6. `npm install` y `npm run dev`.

## Primer administrador
Regístrate y luego ejecuta en Supabase:
`update public.profiles set role='admin' where id=(select id from auth.users where email='TU_CORREO');`

## Registro y autenticación v3
- Registro en modal de 3 pasos.
- Google OAuth usa `prompt=select_account`, por lo que solicita elegir la cuenta.
- El registro por correo guarda el prospecto mediante trigger incluso cuando la confirmación de email está habilitada.
- Ejecuta nuevamente `supabase/schema.sql` para actualizar funciones y políticas.
- En Supabase > Authentication > URL Configuration añade:
  - `http://localhost:3000/auth/callback`
  - `https://miads.dev/auth/callback`

## Blog con MDX

Los artículos se redactan en `content/blog/*.mdx`. El nombre del archivo se convierte en la URL:

```text
content/blog/mi-articulo.mdx -> /blog/mi-articulo
```

Ejemplo mínimo:

```mdx
---
title: "Título del artículo"
description: "Descripción para la tarjeta y para SEO."
date: "2026-07-26"
author: "Equipo Miads"
category: "SEO"
image: "/images/blog/portada.svg"
tags: ["SEO", "Google"]
featured: false
published: true
---

Introducción del artículo.

## Primer tema

Contenido normal en Markdown.

### Subtema

- Lista uno
- Lista dos

<Callout type="tip" title="Consejo">
Contenido destacado dentro del artículo.
</Callout>

<CTA title="Título del llamado a la acción" text="Descripción del CTA." />
```

La tabla de contenido se genera automáticamente con los encabezados `##` y `###`. El tiempo de lectura también se calcula automáticamente. Para añadir una portada, guarda la imagen en `public/images/blog/` y usa su ruta en `image`.
