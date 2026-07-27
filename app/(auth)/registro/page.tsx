import { RegistrationDialog } from "@/components/registration-dialog"

type Props = {
  searchParams: Promise<{ reason?: string }>
}

export default async function Page({ searchParams }: Props) {
  const { reason } = await searchParams
  const notice =
    reason === "not_registered"
      ? "Esta cuenta de Google todavía no está registrada en Miads. Completa estos pasos para crear tu solicitud y habilitar tu panel."
      : undefined

  return (
    <div className="flex min-h-[65vh] items-center justify-center">
      <RegistrationDialog autoOpen label="Abrir registro" notice={notice} />
    </div>
  )
}
