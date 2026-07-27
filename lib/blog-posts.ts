export type BlogSection = {
  heading: string
  paragraphs: string[]
  bullets?: string[]
}

export type BlogPost = {
  slug: string
  title: string
  excerpt: string
  category: string
  date: string
  readingTime: string
  author: string
  cover: string
  sections: BlogSection[]
}

export const blogPosts: BlogPost[] = [
  {
    slug: "seo-que-genera-clientes",
    title: "SEO que genera clientes: una estrategia práctica para crecer",
    excerpt: "Cómo convertir búsquedas reales en oportunidades comerciales mediante contenido, técnica y autoridad.",
    category: "SEO",
    date: "26 julio, 2026",
    readingTime: "8 min de lectura",
    author: "Equipo Miads",
    cover: "/images/blog-seo.jpg",
    sections: [
      {
        heading: "El SEO no consiste solo en aparecer primero",
        paragraphs: [
          "Una estrategia SEO útil empieza entendiendo qué busca el cliente, qué problema necesita resolver y qué información necesita antes de tomar una decisión.",
          "El objetivo no es atraer visitas sin intención. El objetivo es construir páginas capaces de responder preguntas, generar confianza y llevar al usuario hacia una acción concreta."
        ]
      },
      {
        heading: "Los cuatro pilares de una estrategia sólida",
        paragraphs: ["Un proyecto sostenible combina cuatro áreas que deben trabajar juntas."],
        bullets: [
          "Investigación de palabras clave basada en intención de búsqueda.",
          "Arquitectura clara para servicios, categorías y contenidos.",
          "Optimización técnica de rendimiento, rastreo e indexación.",
          "Contenido experto y enlaces que fortalezcan la autoridad del sitio."
        ]
      },
      {
        heading: "Cómo medir si realmente funciona",
        paragraphs: [
          "Las posiciones son importantes, pero no son la única métrica. También deben medirse formularios enviados, llamadas, conversaciones por WhatsApp, solicitudes de cotización y ventas atribuidas al tráfico orgánico.",
          "Cuando cada página tiene un propósito comercial claro, el SEO deja de ser una tarea aislada y se convierte en un canal de adquisición medible."
        ]
      }
    ]
  },
  {
    slug: "como-planificar-un-sitio-web",
    title: "Cómo planificar un sitio web antes de comenzar a diseñarlo",
    excerpt: "Una guía para definir objetivos, estructura, contenido y conversiones antes de escribir una sola línea de código.",
    category: "Diseño web",
    date: "22 julio, 2026",
    readingTime: "7 min de lectura",
    author: "Equipo Miads",
    cover: "/images/blog-web.jpg",
    sections: [
      {
        heading: "Primero define el resultado",
        paragraphs: [
          "Antes de elegir colores o animaciones, hay que decidir qué debe conseguir el sitio: generar contactos, vender, reservar citas, captar estudiantes o presentar una marca.",
          "Este objetivo principal determina la navegación, los llamados a la acción y el tipo de contenido que debe priorizarse."
        ]
      },
      {
        heading: "Crea una arquitectura sencilla",
        paragraphs: ["Una buena estructura reduce dudas y permite que cada visitante encuentre rápidamente lo que necesita."],
        bullets: [
          "Inicio con propuesta de valor clara.",
          "Páginas individuales para cada servicio importante.",
          "Casos de éxito o resultados verificables.",
          "Blog para responder búsquedas y educar al cliente.",
          "Contacto o registro sin pasos innecesarios."
        ]
      },
      {
        heading: "Diseña para convertir",
        paragraphs: [
          "Los botones deben ser visibles, el texto debe poder escanearse y los formularios deben pedir únicamente la información necesaria.",
          "La velocidad, la adaptación móvil y la accesibilidad también forman parte del diseño. Una interfaz bonita que carga lento o confunde al visitante no cumple su función."
        ]
      }
    ]
  },
  {
    slug: "meta-ads-vs-google-ads",
    title: "Meta Ads vs. Google Ads: ¿cuál conviene para tu negocio?",
    excerpt: "Las diferencias más importantes entre captar demanda existente y generar interés mediante anuncios.",
    category: "Publicidad",
    date: "18 julio, 2026",
    readingTime: "6 min de lectura",
    author: "Equipo Miads",
    cover: "/images/blog-ads.jpg",
    sections: [
      {
        heading: "Dos plataformas, dos momentos distintos",
        paragraphs: [
          "Google Ads suele funcionar mejor cuando una persona ya está buscando una solución concreta. Meta Ads permite llegar a públicos que todavía no están buscando activamente, pero podrían interesarse por una oferta bien presentada.",
          "La elección depende del producto, el ciclo de compra, el presupuesto y la madurez de la marca."
        ]
      },
      {
        heading: "Cuándo usar cada plataforma",
        paragraphs: ["Estas señales pueden ayudarte a decidir dónde comenzar."],
        bullets: [
          "Google Ads: servicios urgentes, búsquedas locales y productos con demanda existente.",
          "Meta Ads: lanzamientos, contenido visual, audiencias nuevas y remarketing.",
          "Ambas: cuando existe un sistema de seguimiento y una oferta validada."
        ]
      },
      {
        heading: "La medición es más importante que la plataforma",
        paragraphs: [
          "Una campaña no debe evaluarse únicamente por clics o alcance. Hay que medir contactos calificados, costo por oportunidad, tasa de cierre y retorno real.",
          "Con una correcta configuración de conversiones, ambas plataformas pueden complementarse dentro del mismo embudo."
        ]
      }
    ]
  }
]

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug)
}
