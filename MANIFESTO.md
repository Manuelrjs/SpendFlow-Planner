# MANIFESTO.md — SpendFlow Planner

Este manifiesto es la fuente de verdad del producto. Antes de tocar código o documentación operativa, Codex debe leer este archivo junto con `AGENTS.md`, `README.md`, `ROADMAP.md` y `SPRINTS.md` si existen.

## 1. Nombre del producto

- **Nombre comercial:** SpendFlow Planner
- **Nombre corto:** SpendFlow
- **Tagline:** Gastos, cuotas y compromisos futuros.

## 2. Visión del producto

SpendFlow Planner no es solo una app para registrar gastos del mes. El objetivo final es permitir que una persona, familia o grupo pueda entender su flujo financiero futuro:

- gastos actuales;
- gastos con tarjeta;
- cuotas;
- cierres de tarjeta;
- vencimientos;
- compromisos futuros;
- pagos esperados;
- comprobantes;
- resúmenes bancarios/tarjeta;
- conciliación futura con IA.

La idea central es: **“Ver no solo lo que gasté, sino lo que ya comprometí pagar en el tiempo.”**

## 3. Problema que resuelve

Las apps tradicionales muestran gastos históricos o presupuestos simples. SpendFlow Planner debe ayudar a anticipar el flujo de pagos futuros, especialmente cuando hay tarjetas, cuotas y varios miembros del grupo.

## 4. Usuarios objetivo

### Inicial

- Uso personal/familiar.
- Parejas o familias que comparten gastos.
- Usuarios con varias tarjetas y cuotas.
- Usuarios que quieren saber cuánto tienen comprometido en meses futuros.

### Futuro

- Grupos pequeños.
- Roommates.
- Microempresas o profesionales independientes, si aplica.

## 5. Principios del producto

- Claridad antes que complejidad.
- Flujo futuro como diferencial principal.
- Mobile-first.
- Seguridad por grupo.
- Datos separados por grupo.
- IA como asistente, no como requisito.
- No romper lo que ya funciona.
- Todo gasto debe tener trazabilidad.
- Todo compromiso futuro debe poder explicarse.

## 6. Funcionalidades ya implementadas

- Login con Supabase Auth.
- Grupos.
- Multi-grupo.
- Selector de grupo activo.
- Invitaciones por link.
- Administración de miembros.
- Roles admin / miembro.
- RLS por grupo.
- Gastos.
- Nuevo gasto.
- Reportes.
- Tarjetas.
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
- Rebranding a SpendFlow Planner.

## 7. Stack actual

- Next.js.
- Supabase Auth.
- Supabase Database.
- Supabase Storage.
- OpenAI API.
- PWA.
- Deploy objetivo: Vercel.

## 8. Reglas críticas de arquitectura

### Grupo activo

- El grupo activo se define por `perfiles.grupo_id`.
- El usuario puede pertenecer a varios grupos mediante `miembros_grupo`.
- El selector de grupo activo actualiza `perfiles.grupo_id`.
- Todas las pantallas operativas deben usar el grupo activo.

### RLS

- Las tablas operativas están protegidas por RLS.
- No desactivar RLS.
- No hacer consultas globales sin `grupo_id`.
- No mostrar datos de otro grupo.

### Tablas importantes

- `grupos`
- `perfiles`
- `miembros_grupo`
- `invitaciones_grupo`
- `gastos`
- `cuotas_tarjeta`
- `calendario_tarjetas`
- `compras_cuotas_iniciales`
- `comprobantes`
- `cuentas_tarjeta`
- `tarjetas_fisicas`
- `personas`
- `categorias`
- `medios_pago`

### Comprobantes

- Usar columnas reales en español.
- `tipo_archivo` debe guardar MIME real:
  - `image/jpeg`
  - `image/png`
  - `image/webp`
  - `application/pdf`
- No guardar `imagen`, `pdf` u `otro` en `tipo_archivo`.
- Ruta nueva de Storage: `{grupo_id}/{año}/{mes}/{gasto_id}/{archivo}`.
- No borrar rutas antiguas.

### Invitaciones

- La app genera el token.
- No usar `gen_random_bytes` en triggers o funciones de Supabase para invitaciones.
- `preparar_invitacion_grupo` debe aceptar el token enviado por la app.

### Diseño

- Tema default: `dark-modern`.
- Tema alternativo: `light-classic`.
- En tema oscuro no debe haber bloques blancos dentro de cards oscuras.
- Mobile no debe depender del sidebar.
- Mobile debe usar bottom nav: Inicio, Nuevo, Gastos, Flujo, Más.

## 9. Variables de entorno

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
OPENAI_API_KEY=
NEXT_PUBLIC_APP_URL=
NEXT_PUBLIC_APP_NAME=SpendFlow Planner
```

Aclaraciones:

- `OPENAI_API_KEY` no debe exponerse en frontend.
- La service role key de Supabase no debe exponerse en frontend.

## 10. Estado actual

La app está desplegada en Vercel:

```text
https://spend-flow-planner.vercel.app
```

El build y el deploy inicial ya fueron validados.

Objetivo inmediato:

- Ejecutar QA funcional completo en producción.
- Confirmar login, grupo activo, invitaciones, gastos, tarjetas, flujo, comprobantes e IA.
- Verificar que no haya fugas visibles de datos entre grupos.

## 11. Objetivo final de la fase actual

Llegar a una versión estable desplegada en Vercel, usable desde iPhone como PWA, con:

- login estable;
- datos separados por grupo;
- multi-grupo funcionando;
- invitaciones funcionando;
- gastos funcionando;
- tarjetas/calendario/flujo funcionando;
- comprobantes funcionando;
- IA funcionando;
- diseño mobile usable;
- build exitoso.

## 12. Roadmap resumido

- **Fase 1:** Build y deploy en Vercel.
- **Fase 2:** QA funcional completo.
- **Fase 3:** Mobile/PWA refinado.
- **Fase 4:** Diseño final e ícono/logo.
- **Fase 5:** Conciliación de resumen con IA.
- **Fase 6:** Evaluación App Store / wrapper iOS.

## 13. Reglas para Codex

Codex debe:

- leer `MANIFESTO.md` antes de tocar código;
- leer `AGENTS.md` y `README.md`;
- leer `ROADMAP.md` y `SPRINTS.md` si existen;
- proponer plan corto antes de modificar;
- hacer cambios mínimos y seguros;
- ejecutar validaciones cuando aplique;
- explicar qué cambió y cómo probar;
- actualizar `SPRINTS.md` o `ROADMAP.md` si corresponde;
- no romper lógica funcional;
- no desactivar RLS;
- no tocar base de datos salvo tarea explícita;
- no crear migraciones salvo tarea explícita.
