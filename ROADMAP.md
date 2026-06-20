# ROADMAP.md — SpendFlow Planner

Este roadmap organiza el trabajo por fases y sprints. Debe actualizarse cuando cambie el objetivo de una fase o se complete un sprint relevante.

## Fase actual: QA funcional

Objetivo general: validar que la versión desplegada en Vercel funcione de punta a punta, manteniendo la separación por grupo, la seguridad RLS y la experiencia PWA como prioridades.

## Sprint 1 — Build y Vercel

**Estado:** completado.

### Objetivo

Lograr que el proyecto compile correctamente y quede listo para el primer deploy estable en Vercel.

### Tareas

- Corregir el error actual de `npm run build` en `app/manifest.ts` cerca de `share_target`.
- Ejecutar build limpio local.
- Confirmar variables de entorno requeridas para Vercel.
- Configurar proyecto en Vercel.
- Configurar Supabase Auth Redirect URLs con la URL real de Vercel.
- Probar login básico en producción.

### Criterio de terminado

- `rm -rf .next && npm run build` finaliza con exit code `0`.
- El deploy de Vercel termina correctamente.
- La app abre en la URL pública.
- Login/registro funcionan con las Redirect URLs configuradas.

## Sprint 2 — QA funcional completo

**Estado:** activo.

### Objetivo

Validar que el flujo principal funcione de punta a punta con datos separados por grupo.

### Tareas

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

### Criterio de terminado

- Checklist funcional completado sin errores bloqueantes.
- No hay fugas visibles de datos entre grupos.
- Los errores encontrados quedan registrados como tareas priorizadas.

## Sprint 3 — Mobile/PWA

### Objetivo

Refinar la experiencia mobile-first y PWA, especialmente en iPhone/Safari.

### Tareas

- Instalar la PWA en iPhone desde Safari.
- Verificar navegación bottom nav: Inicio, Nuevo, Gastos, Flujo, Más.
- Confirmar que no haya contenido tapado por safe areas.
- Probar carga de comprobantes desde galería/archivos.
- Revisar comportamiento del manifest y share target cuando aplique.
- Ajustar textos de instalación y fallback si iOS no muestra SpendFlow como destino de compartir.

### Criterio de terminado

- La app es usable desde iPhone como PWA.
- La navegación mobile cubre los flujos principales.
- No hay dependencia funcional del sidebar en mobile.

## Sprint 4 — Diseño final

### Objetivo

Pulir la identidad visual y preparar una experiencia consistente para uso diario.

### Tareas

- Revisar tema oscuro moderno como default.
- Revisar tema claro clásico como alternativa.
- Eliminar inconsistencias visuales en cards, formularios y estados vacíos.
- Definir o integrar ícono/logo final.
- Revisar nombre visible: SpendFlow Planner / SpendFlow.
- Validar contraste, legibilidad y estados de error.

### Criterio de terminado

- UI consistente en pantallas principales.
- Ícono/logo listo para PWA.
- Tema oscuro sin bloques blancos dentro de cards oscuras.

## Sprint 5 — Conciliación con IA

### Objetivo

Avanzar hacia conciliación de resúmenes bancarios/tarjeta con IA, sin reemplazar la validación del usuario.

### Tareas

- Definir alcance de conciliación de resúmenes.
- Diseñar flujo de carga de PDF de resumen.
- Extraer movimientos con IA.
- Comparar movimientos contra gastos/cuotas existentes.
- Proponer conciliación para validación manual.
- Registrar diferencias y ajustes de forma trazable.

### Criterio de terminado

- El usuario puede cargar un resumen y revisar propuestas de conciliación.
- Ninguna conciliación se aplica sin confirmación del usuario.
- Las diferencias quedan explicadas y auditables.

## Sprint 6 — App Store / distribución futura

### Objetivo

Evaluar si conviene mantener PWA, crear wrapper iOS o avanzar hacia una app nativa futura.

### Tareas

- Evaluar limitaciones reales de PWA en iOS.
- Analizar necesidad de notificaciones, share target y acceso a archivos.
- Evaluar wrapper iOS o Expo/React Native.
- Definir requisitos de publicación en App Store.
- Estimar mantenimiento adicional.

### Criterio de terminado

- Decisión documentada sobre canal de distribución futuro.
- Si aplica, backlog inicial para wrapper iOS o app nativa.
