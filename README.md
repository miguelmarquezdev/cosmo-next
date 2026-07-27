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

## Google Analytics 4 y Search Console

La integración ya está incluida en el proyecto.

### 1. Variables en desarrollo

Copia `.env.example` a `.env.local` y completa:

```env
NEXT_PUBLIC_SITE_URL=https://miads.dev
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
GOOGLE_SITE_VERIFICATION=TU_CODIGO_DE_VERIFICACION
```

- `NEXT_PUBLIC_GA_MEASUREMENT_ID`: en Google Analytics, abre **Administrar → Flujos de datos → Web** y copia el ID que comienza con `G-`.
- `GOOGLE_SITE_VERIFICATION`: en Search Console elige verificación por **Etiqueta HTML** y copia solamente el valor de `content`.

### 2. Variables en Vercel

En **Project Settings → Environment Variables**, crea las mismas tres variables para Production, Preview y Development. Luego realiza un Redeploy.

### 3. Archivos automáticos

- `/robots.txt` se genera desde `app/robots.ts`.
- `/sitemap.xml` se genera desde `app/sitemap.ts` e incluye automáticamente todos los artículos MDX publicados.
- La meta de Search Console se genera en `app/layout.tsx`.
- Google Analytics se carga en todas las páginas desde `app/layout.tsx` únicamente cuando existe el ID.

### 4. Eventos personalizados

Puedes importar el helper:

```tsx
import { trackEvent } from "@/lib/analytics"

trackEvent("click_whatsapp", { location: "hero" })
```

## Validación de acceso con Google

- `/login` solo permite entrar a usuarios que ya tienen un registro en `public.leads` o un rol `admin/staff` en `public.profiles`.
- Una cuenta de Google no registrada es desconectada y enviada a `/registro?reason=not_registered`.
- El panel `/cliente` vuelve a validar el acceso en el servidor, por lo que no se puede evitar la comprobación escribiendo la URL manualmente.
- El registro continúa mediante `/auth/complete`, donde se crea la solicitud del prospecto.

## Solicitudes de cambio

Esta versión incluye un flujo de solicitudes entre clientes y administradores.

1. Ejecuta `supabase/change-requests-migration.sql` en Supabase SQL Editor.
2. El cliente usa `/cliente/solicitudes` para enviar y consultar solicitudes.
3. El administrador usa `/admin/solicitudes` para responder y cambiar el estado.
4. Los badges del menú muestran solicitudes abiertas.

Estados disponibles: `pending`, `reviewing`, `working`, `completed`.
