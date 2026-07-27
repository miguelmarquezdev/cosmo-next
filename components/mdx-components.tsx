import type { ComponentPropsWithoutRef, ReactNode } from "react"
import Link from "next/link"
import Image from "next/image"
import { CheckCircle2, Info, Lightbulb, TriangleAlert } from "lucide-react"
import { slugifyHeading } from "@/lib/blog-mdx"
import { cn } from "@/lib/utils"
import { CodeBlock } from "@/components/code-block"
import { RegistrationCTAButton } from "@/components/registration-cta-button"

function textFromChildren(children: ReactNode): string {
  if (typeof children === "string" || typeof children === "number") return String(children)
  if (Array.isArray(children)) return children.map(textFromChildren).join("")
  if (children && typeof children === "object" && "props" in children) {
    return textFromChildren((children as { props: { children?: ReactNode } }).props.children)
  }
  return ""
}

type HeadingProps = Omit<ComponentPropsWithoutRef<"h2">, "children"> & {
  level: 2 | 3
  children?: ReactNode
}

function Heading({ level, children, ...props }: HeadingProps) {
  const id = slugifyHeading(textFromChildren(children))
  if (level === 2) return <h2 id={id} className="scroll-mt-32" {...props}>{children}</h2>
  return <h3 id={id} className="scroll-mt-32" {...props}>{children}</h3>
}

export function Callout({ type = "info", title, children }: { type?: "info" | "tip" | "warning" | "success"; title?: string; children: ReactNode }) {
  const icons = { info: Info, tip: Lightbulb, warning: TriangleAlert, success: CheckCircle2 }
  const Icon = icons[type]
  return (
    <div className="my-8 rounded-2xl border border-primary/15 bg-primary/[.045] p-5 not-prose dark:bg-primary/[.055] sm:p-6">
      <div className="flex items-start gap-3.5">
        <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-lg bg-primary/10">
          <Icon className="size-[18px] text-primary" />
        </span>

        <div className="min-w-0 flex-1">
          {title && (
            <div className="m-0 p-0 text-[15px] font-medium leading-6 text-foreground">
              {title}
            </div>
          )}

          <div
            className={cn(
              "callout-content min-w-0 text-sm leading-7 text-muted-foreground [&>p:first-child]:!mt-0 [&>p:first-child]:!pt-0 [&>p]:!mb-0",
              title && "mt-2"
            )}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export function CTA({ title = "¿Listo para hacer crecer tu negocio?", text = "Cuéntanos qué necesitas y prepararemos una propuesta adaptada a tu empresa.", href = "/#contacto" }: { title?: string; text?: string; href?: string }) {
  return (
    <div className="my-12 overflow-hidden rounded-3xl border border-primary/15 bg-gradient-to-br from-primary/[.10] via-primary/[.055] to-transparent p-8 not-prose dark:from-primary/[.14] dark:via-primary/[.07] md:p-10">
      <p className="text-xs font-bold uppercase tracking-[.18em] text-primary">Siguiente paso</p>
      <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground md:text-3xl">{title}</h2>
      <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">{text}</p>
      <RegistrationCTAButton className="mt-7" />
    </div>
  )
}

export const mdxComponents = {
  h2: ({ children, ...props }: ComponentPropsWithoutRef<"h2">) => (
    <Heading level={2} {...props}>{children}</Heading>
  ),
  h3: ({ children, ...props }: ComponentPropsWithoutRef<"h3">) => (
    <Heading level={3} {...props}>{children}</Heading>
  ),
  a: ({ href = "", ...props }: ComponentPropsWithoutRef<"a">) => {
    if (href.startsWith("/")) return <Link href={href} {...props} />
    return <a href={href} target="_blank" rel="noreferrer" {...props} />
  },
  pre: (props: ComponentPropsWithoutRef<"pre">) => <CodeBlock {...props} />,
  img: ({ src = "", alt = "", ...props }: ComponentPropsWithoutRef<"img">) => (
    <span className="relative my-8 block aspect-[16/9] overflow-hidden rounded-2xl not-prose">
      <Image src={String(src)} alt={alt} fill className="object-cover" sizes="(max-width: 900px) 100vw, 760px" />
    </span>
  ),
  Callout,
  CTA,
}
