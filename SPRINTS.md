# SPRINTS.md — SpendFlow Planner

Este archivo indica el sprint activo y la tarea inmediata. Codex debe consultarlo antes de proponer o ejecutar el siguiente cambio.

## Sprint activo

**Sprint 2 — QA funcional completo**

## Tarea actual

Validar el flujo principal de punta a punta en producción, empezando por login, grupo activo y navegación básica.

## Sprint anterior completado

**Sprint 1 — Build y Vercel**

- `npm run build` corregido.
- Deploy publicado en Vercel.
- URL de producción: `https://spend-flow-planner.vercel.app`.
- Variables de entorno cargadas en Vercel.
- Redirect URLs de Supabase configuradas.
- Login/registro básico validado en producción.

## Problema pendiente

Completar QA funcional para confirmar que no haya errores bloqueantes ni fugas visibles de datos entre grupos.

## Validación

- Probar login y cierre de sesión.
- Probar creación y cambio de grupo activo.
- Probar invitaciones por link.
- Probar administración de miembros y roles.
- Probar alta de gastos.
- Probar tarjetas, calendario y flujo mensual.
- Probar cuotas iniciales.
- Probar reportes e historial.
- Probar comprobantes por grupo.
- Verificar que un usuario no vea datos de otro grupo.

## Siguiente tarea inmediata

Probar creación/cambio de grupo activo y navegación principal en producción.
