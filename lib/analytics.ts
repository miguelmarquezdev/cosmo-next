"use client"

import { sendGAEvent } from "@next/third-parties/google"

type AnalyticsParams = Record<string, string | number | boolean | undefined>

/**
 * Envía un evento a GA4. No hace nada cuando el ID de Analytics no está configurado.
 */
export function trackEvent(name: string, params: AnalyticsParams = {}) {
  if (!process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID) return
  sendGAEvent("event", name, params)
}
