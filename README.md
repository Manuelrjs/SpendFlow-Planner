# SpendFlow Planner

SpendFlow Planner es una aplicación web responsive para controlar gastos, tarjetas, cuotas y compromisos futuros por grupo.

La idea central del producto es: **ver no solo lo que gasté, sino lo que ya comprometí pagar en el tiempo**.

## Documentación principal

- `MANIFESTO.md`: fuente de verdad del producto, reglas críticas y estado actual.
- `ROADMAP.md`: fases y sprints del proyecto.
- `SPRINTS.md`: sprint activo, tarea actual y validación esperada.
- `AGENTS.md`: instrucciones operativas para Codex.

## Stack

- Next.js.
- TypeScript.
- Tailwind CSS.
- Supabase Auth.
- Supabase Database.
- Supabase Storage.
- OpenAI API.
- PWA.
- Deploy objetivo: Vercel.

## Funcionalidades actuales

- Login con Supabase Auth.
- Grupos y multi-grupo.
- Selector de grupo activo.
- Invitaciones por link.
- Administración de miembros.
- Roles admin / miembro.
- RLS por grupo.
- Registro e historial de gastos.
- Nuevo gasto.
- Reportes.
- Tarjetas físicas y cuentas de tarjeta.
- Calendario de cierre/vencimiento.
- Flujo mensual.
- Cuotas iniciales.
- Personas.
- Categorías.
- Medios de pago.
- Mantenimiento.
- Comprobantes por grupo.
- Storage de comprobantes.
- IA para lectura de imágenes/PDF.
- PWA para iPhone.
- Tema oscuro moderno.
- Tema claro clásico.
- Navegación mobile con bottom nav y menú Más.

## Variables de entorno

Crear `.env.local` en desarrollo y configurar las mismas variables en Vercel.

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
OPENAI_API_KEY=
NEXT_PUBLIC_APP_URL=
NEXT_PUBLIC_APP_NAME=SpendFlow Planner
```

Notas:

- `OPENAI_API_KEY` es server-side y no debe exponerse en frontend.
- No usar variables `NEXT_PUBLIC_*` para secretos.
- La service role key de Supabase no debe exponerse en frontend.
- `NEXT_PUBLIC_APP_URL` debe apuntar a la URL pública real en producción para generar links de invitación.

## Cómo correr local

```bash
npm install
npm run dev
```

Abrir la URL local que indique Next.js, normalmente `http://localhost:3000`.

## Cómo correr build

```bash
npm run build
```

Para una validación limpia del sprint actual:

```bash
rm -rf .next
npm run build
echo $?
```

El resultado esperado para el sprint activo es exit code `0`.

## Supabase

SpendFlow Planner usa Supabase para:

- autenticación de usuarios;
- base de datos PostgreSQL;
- políticas RLS;
- almacenamiento de comprobantes.

Las tablas principales incluyen:

- `grupos`;
- `perfiles`;
- `miembros_grupo`;
- `invitaciones_grupo`;
- `gastos`;
- `cuotas_tarjeta`;
- `calendario_tarjetas`;
- `compras_cuotas_iniciales`;
- `comprobantes`;
- `cuentas_tarjeta`;
- `tarjetas_fisicas`;
- `personas`;
- `categorias`;
- `medios_pago`.

## Grupo activo y RLS

El grupo activo se define por `perfiles.grupo_id`.

Reglas críticas:

- El usuario puede pertenecer a varios grupos mediante `miembros_grupo`.
- El selector de grupo activo actualiza `perfiles.grupo_id`.
- Todas las pantallas operativas deben consultar usando el grupo activo.
- Las tablas operativas están protegidas por RLS.
- No desactivar RLS.
- No hacer consultas globales sin `grupo_id`.
- No mostrar datos de otro grupo.

## Storage de comprobantes

Los comprobantes se guardan en Supabase Storage, separados por grupo.

Ruta nueva esperada:

```text
{grupo_id}/{año}/{mes}/{gasto_id}/{archivo}
```

Reglas:

- No borrar rutas antiguas.
- Usar columnas reales en español.
- `tipo_archivo` debe guardar MIME real:
  - `image/jpeg`;
  - `image/png`;
  - `image/webp`;
  - `application/pdf`.
- No guardar `imagen`, `pdf` u `otro` en `tipo_archivo`.

## IA / OpenAI

La app usa OpenAI API para lectura de imágenes/PDF de comprobantes.

Reglas:

- El análisis debe ejecutarse del lado servidor.
- `OPENAI_API_KEY` no debe estar disponible en frontend.
- La IA sugiere datos, pero el usuario valida antes de guardar.
- La IA es un asistente, no un requisito para registrar gastos manualmente.

## PWA

SpendFlow Planner está orientada a uso mobile-first y PWA en iPhone.

Flujo de instalación en iPhone:

1. Abrir la URL pública en Safari.
2. Tocar Compartir.
3. Elegir Agregar a pantalla de inicio.
4. Confirmar el nombre SpendFlow.
5. Abrir desde el ícono instalado.

La navegación mobile debe funcionar con bottom nav:

- Inicio.
- Nuevo.
- Gastos.
- Flujo.
- Más.

## Deploy en Vercel

Pasos esperados:

1. Confirmar que `npm run build` finaliza correctamente.
2. Crear proyecto en Vercel desde el repositorio.
3. Configurar variables de entorno.
4. Deployar.
5. Copiar la URL pública real.
6. Configurar Supabase Auth Redirect URLs.
7. Probar login, grupos, invitaciones, gastos, comprobantes, IA y PWA.

## Supabase Auth Redirect URLs

En Supabase ir a **Authentication → URL Configuration**.

Configurar **Site URL** con la URL real de Vercel, por ejemplo:

```text
https://spendflow-planner.vercel.app
```

Configurar **Redirect URLs**:

```text
https://spendflow-planner.vercel.app/**
http://localhost:3000/**
https://*.app.github.dev/**
```

Si Vercel asigna otra URL real, reemplazar el ejemplo por esa URL tanto en Supabase como en `NEXT_PUBLIC_APP_URL`.

## Notas de seguridad

- No exponer `OPENAI_API_KEY` en frontend.
- No exponer la service role key de Supabase en frontend.
- No desactivar RLS.
- No crear consultas operativas sin filtro por `grupo_id`.
- No mostrar datos de otro grupo.
- No tocar schema, RLS, Storage, Auth, grupos, invitaciones, gastos, flujo, calendario o IA salvo tarea explícita.

## Estado actual

La app está desplegada en Vercel:

```text
https://spend-flow-planner.vercel.app
```

Tarea activa según `SPRINTS.md`:

- Sprint 2 — QA funcional completo.
- Validar flujos principales en producción.
- Confirmar separación por grupo y ausencia de errores bloqueantes.
