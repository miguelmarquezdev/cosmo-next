"use client"

import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

export function RegistrationCTAButton({
  label = "Comienza gratis",
  className,
}: {
  label?: string
  className?: string
}) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new CustomEvent("miads:open-registration"))}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className
      )}
    >
      {label}
      <ArrowRight className="size-4" />
    </button>
  )
}
