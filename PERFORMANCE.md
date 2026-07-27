# Optimización aplicada

- Las páginas de marketing y blog se generan como contenido estático.
- Los artículos usan `generateStaticParams`, `dynamicParams = false` y `revalidate = false`.
- El MDX permanece como Server Component; solo la barra de progreso y la tabla de contenido hidratan JavaScript.
- El header público ya no consulta Supabase durante el render del servidor, permitiendo que la landing y el blog entren en caché/CDN.
- Se desactivó el prefetch automático en enlaces de navegación y tarjetas del blog para evitar solicitudes RSC innecesarias al pasar el cursor o al entrar en la página.
- La barra de progreso agrupa cálculos con `requestAnimationFrame`.
- La portada del artículo mantiene prioridad y formatos AVIF/WebP.
