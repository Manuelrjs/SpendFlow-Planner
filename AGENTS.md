# SpendFlow Planner — Instrucciones para Codex

## Lectura obligatoria antes de trabajar

Antes de tocar código, documentación operativa o configuración, Codex debe leer siempre:

1. `MANIFESTO.md`.
2. `AGENTS.md`.
3. `README.md`.
4. `ROADMAP.md`, si existe.
5. `SPRINTS.md`, si existe.

`MANIFESTO.md` es la fuente de verdad del producto. Sus reglas críticas de arquitectura, seguridad, diseño y flujo de trabajo tienen prioridad sobre documentación histórica del repo, salvo instrucciones directas del usuario en la tarea actual.

## Rol de Codex en este proyecto

Codex debe actuar como guía técnico por sprints:

- Identificar la tarea actual desde `SPRINTS.md`.
- Proponer un plan corto antes de modificar.
- Ejecutar cambios mínimos, seguros y enfocados.
- Validar con comandos o checks cuando aplique.
- Explicar qué cambió, cómo se probó y cuál es el siguiente paso sugerido.
- Actualizar `SPRINTS.md` o `ROADMAP.md` si la tarea lo requiere.

## Flujo Git recomendado

Para avanzar rápido sin perder control:

- Cambios chicos, urgentes y acotados de build/config pueden ir directo a `main` si la validación pasa y no tocan áreas sensibles.
- Funcionalidades nuevas, cambios grandes o cualquier ajuste en Supabase, RLS, Auth, datos sensibles, gastos, grupos, flujo, calendario, comprobantes o IA deben hacerse en una rama `codex/*` y abrir Pull Request hacia `main`.
- Después del primer deploy estable, preferir rama y Pull Request para cada cambio importante, aunque trabaje una sola persona.
- Antes de pushear a `main`, confirmar que no hay cambios no relacionados y que la validación esperada del sprint pasó.

## Áreas protegidas por defecto

Codex no debe tocar las siguientes áreas salvo que la tarea lo pida explícitamente:

- Supabase schema.
- RLS.
- Storage.
- Auth.
- Grupos.
- Miembros.
- Invitaciones.
- Gastos.
- Flujo.
- Calendario.
- IA.

Si una tarea menciona alguna de estas áreas, Codex debe hacer cambios mínimos y explicar el impacto sobre grupo activo, RLS y seguridad.

## Nombre del proyecto

SpendFlow Planner

## Objetivo

SpendFlow Planner es una aplicación web responsive para control de gastos familiares, tarjetas de crédito, cuotas y flujo mensual de pagos.

El sistema debe permitir registrar gastos de forma rápida, identificar quién gastó, con qué medio de pago, con qué cuenta de tarjeta y con qué tarjeta física/adicional. También debe proyectar cuánto dinero debe reservarse cada mes para pagar tarjetas y compromisos futuros.

## Stack técnico

- Next.js 14 o superior.
- TypeScript estricto.
- Tailwind CSS.
- Supabase PostgreSQL.
- Supabase Auth.
- Supabase Storage.
- OpenAI API.
- PWA.
- Deploy objetivo en Vercel.
- App móvil futura con Expo / React Native si se decide avanzar.

## Idioma del proyecto

El usuario habla español como idioma nativo.

Regla obligatoria:

- Nombres de tablas en español.
- Nombres de campos en español.
- Textos visibles de la app en español.
- Comentarios importantes en español.
- `id` puede quedar como `id`.

## Filosofía de desarrollo

- Una tarea = una funcionalidad o cambio claramente delimitado.
- No construir todo de una sola vez.
- Desarrollar por fases y sprints.
- Claridad antes que complejidad.
- No romper lo que ya funciona.
- Mantener código simple, mantenible y claro.
- Si hay ambigüedad, elegir la opción más simple y dejar comentario.

## Reglas críticas heredadas del modelo conceptual

El sistema debe separar:

- Persona.
- Cuenta de tarjeta / estado de cuenta.
- Tarjeta física / adicional.
- Gasto.
- Cuota.
- Resumen de tarjeta.
- Pago real.
- Saldo financiado.
- Interés / ajuste.

Ejemplo real:

Visa Galicia Manuel:

- Manuel titular.
- Paola adicional.
- Estado de cuenta llega a nombre de Manuel.

Visa Galicia Paola:

- Paola titular.
- Suegra adicional.
- Estado de cuenta llega a nombre de Paola.

Por eso el sistema debe tener:

- `cuentas_tarjeta`.
- `tarjetas_fisicas`.
- `personas`.

No tratar “Visa Galicia” como una sola tarjeta plana.

## Reglas de tarjetas

1. `cuentas_tarjeta` representa el estado de cuenta.
2. `tarjetas_fisicas` representa el plástico usado para gastar.
3. Un gasto con tarjeta debe guardar:
   - `cuenta_tarjeta_id`.
   - `tarjeta_fisica_id`.
   - `persona_id`.

## Reglas de calendario

Los cierres y vencimientos varían mes a mes.

Usar la tabla `calendario_tarjetas` como fuente principal.

Campos relevantes:

- `cuenta_tarjeta_id`.
- `periodo_resumen`.
- `fecha_cierre`.
- `fecha_vencimiento`.
- `estado_calendario`.
- `origen_fecha`.

La configuración habitual en `cuentas_tarjeta` solo sirve como respaldo estimado.

## Reglas de cuotas

Si un gasto con tarjeta tiene `cantidad_cuotas = 1`, generar una cuota 1/1.

Si tiene más de una cuota, generar N registros en `cuotas_tarjeta`.

Esto permite que el flujo mensual se calcule siempre desde `cuotas_tarjeta`.

## UX/UI

Diseño moderno, tipo fintech.

Reglas:

- Mobile-first.
- Debe funcionar bien desde iPhone en Safari.
- No usar formularios largos si se puede evitar.
- Usar cards, botones grandes e iconos.
- Monto debe ser el primer campo.
- Medio de pago debe seleccionarse con botones.
- Tarjetas deben mostrarse como cards.
- Categorías deben mostrarse como botones con iconos.
- Campos avanzados colapsados.
- Recordar últimas selecciones cuando sea posible.
- Tema default: `dark-modern`.
- Tema alternativo: `light-classic`.
- Mobile debe usar bottom nav: Inicio, Nuevo, Gastos, Flujo, Más.

## Flujo de nuevo gasto

Campos principales:

1. Monto.
2. Medio de pago.
3. Cuenta de tarjeta si aplica.
4. Tarjeta física si aplica.
5. Establecimiento.
6. Categoría.
7. Fecha.
8. Persona.
9. Cuotas si aplica.
10. Observaciones opcionales.

## Reglas de seguridad y datos

- Todas las pantallas operativas deben usar el grupo activo definido por `perfiles.grupo_id`.
- No hacer consultas globales sin `grupo_id`.
- No mostrar datos de otro grupo.
- No desactivar RLS.
- No crear migraciones salvo tarea explícita.
- No tocar base de datos salvo tarea explícita.
- No exponer `OPENAI_API_KEY` en frontend.
- No exponer una service role key de Supabase en frontend.
