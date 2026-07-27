"use client"

import { useState, type HTMLAttributes, type ReactNode } from "react"
import { Check, Copy } from "lucide-react"
import { cn } from "@/lib/utils"

function getText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node)
  if (Array.isArray(node)) return node.map(getText).join("")
  if (node && typeof node === "object" && "props" in node) {
    return getText((node as { props?: { children?: ReactNode } }).props?.children)
  }
  return ""
}

export function CodeBlock({ children, className, ...props }: HTMLAttributes<HTMLPreElement>) {
  const [copied, setCopied] = useState(false)

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(getText(children).replace(/\n$/, ""))
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="code-block group relative my-7 not-prose">
      <button
        type="button"
        onClick={copyCode}
        className="absolute right-3 top-3 z-10 inline-flex size-8 items-center justify-center rounded-lg border border-white/10 bg-[#111827]/80 text-slate-300 opacity-0 backdrop-blur transition hover:bg-[#1f2937] hover:text-white focus:opacity-100 group-hover:opacity-100"
        aria-label={copied ? "Código copiado" : "Copiar código"}
        title={copied ? "Copiado" : "Copiar código"}
      >
        {copied ? <Check className="size-4 text-emerald-400" /> : <Copy className="size-4" />}
      </button>
      <pre className={cn(className)} {...props}>{children}</pre>
    </div>
  )
}
