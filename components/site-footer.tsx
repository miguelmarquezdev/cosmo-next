import Link from "next/link"
import Image from "next/image"

export function SiteFooter() {
  return (
    <footer className="bg-[#020617] py-14 text-[#E2E8F0]">
      <div className="container grid gap-10 md:grid-cols-4">
        <div>
          <Image src="/logo-miads-white.svg" alt="Miads" width={105} height={30} className="h-auto w-[105px]" />
          <p className="mt-4 text-sm text-slate-400">Marketing, tecnología y creatividad para hacer crecer marcas.</p>
        </div>
        {[["Servicios","SEO","Diseño web","Publicidad","Branding"],["Empresa","Nosotros","Proceso","Blog","Contacto"],["Acceso","Iniciar sesión","Comienza gratis","Panel de cliente","Privacidad"]].map((g) => (
          <div key={g[0]}><p className="font-semibold">{g[0]}</p><div className="mt-4 grid gap-2 text-sm text-slate-400">{g.slice(1).map((x) => <Link key={x} href="#" className="hover:text-[#0092e5]">{x}</Link>)}</div></div>
        ))}
      </div>
      <div className="container mt-10 pt-6 text-xs text-slate-500">© 2026 Miads · miads.dev</div>
    </footer>
  )
}
