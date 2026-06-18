# SPRINTS.md — SpendFlow Planner

Este archivo indica el sprint activo y la tarea inmediata. Codex debe consultarlo antes de proponer o ejecutar el siguiente cambio.

## Sprint activo

**Sprint 1 — Build y Vercel**

## Tarea actual

Corregir `npm run build` en `app/manifest.ts`.

## Error actual

El build falla cerca de `share_target`.

## Validación

```bash
rm -rf .next
npm run build
echo $?
```

## Resultado esperado

```text
0
```

## Siguiente tarea después de build

Deploy en Vercel.
