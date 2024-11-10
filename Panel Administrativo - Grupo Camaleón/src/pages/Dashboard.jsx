export default function Dashboard() {
  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <h3 className="font-semibold">Bienvenido al Panel Administrativo</h3>
          <p className="text-sm text-muted-foreground mt-2">
            Gestione el contenido del sitio web del Grupo Camaleón desde aquí.
          </p>
        </div>
      </div>
    </div>
  );
}