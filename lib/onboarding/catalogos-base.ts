import type { SupabaseClient } from '@supabase/supabase-js';

type CategoriaBase = {
  nombre: string;
  icono: string;
  color: string;
  activo: true;
  orden: number;
};

type MedioPagoBase = {
  nombre: string;
  tipo: 'efectivo' | 'debito' | 'transferencia' | 'tarjeta_credito' | 'billetera_virtual';
  activo: true;
  orden: number;
};

const CATEGORIAS_BASE: CategoriaBase[] = [
  { nombre: 'Supermercado', icono: '🛒', color: '#10B981', activo: true, orden: 1 },
  { nombre: 'Combustible', icono: '⛽', color: '#F97316', activo: true, orden: 2 },
  { nombre: 'Farmacia', icono: '💊', color: '#EC4899', activo: true, orden: 3 },
  { nombre: 'Comida', icono: '🍽️', color: '#F59E0B', activo: true, orden: 4 },
  { nombre: 'Educación', icono: '🎓', color: '#6366F1', activo: true, orden: 5 },
  { nombre: 'Hogar', icono: '🏠', color: '#14B8A6', activo: true, orden: 6 },
  { nombre: 'Transporte', icono: '🚕', color: '#0EA5E9', activo: true, orden: 7 },
  { nombre: 'Entretenimiento', icono: '🎟️', color: '#8B5CF6', activo: true, orden: 8 },
  { nombre: 'Servicios', icono: '💡', color: '#EAB308', activo: true, orden: 9 },
  { nombre: 'Salud', icono: '🩺', color: '#EF4444', activo: true, orden: 10 },
  { nombre: 'Ropa', icono: '👕', color: '#06B6D4', activo: true, orden: 11 },
  { nombre: 'Otros', icono: '📌', color: '#64748B', activo: true, orden: 12 },
];

const MEDIOS_PAGO_BASE: MedioPagoBase[] = [
  { nombre: 'Efectivo', tipo: 'efectivo', activo: true, orden: 1 },
  { nombre: 'Débito', tipo: 'debito', activo: true, orden: 2 },
  { nombre: 'Transferencia', tipo: 'transferencia', activo: true, orden: 3 },
  { nombre: 'Tarjeta crédito', tipo: 'tarjeta_credito', activo: true, orden: 4 },
  { nombre: 'Mercado Pago', tipo: 'billetera_virtual', activo: true, orden: 5 },
];

function normalizarNombre(nombre: string | null | undefined) {
  return (nombre ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

async function asegurarCategoriasBase(supabase: SupabaseClient, grupoId: string) {
  const { data, error } = await supabase
    .from('categorias')
    .select('nombre')
    .eq('grupo_id', grupoId);

  if (error) throw new Error('No se pudieron consultar las categorías base del grupo.');

  const nombresExistentes = new Set((data ?? []).map((item) => normalizarNombre(item.nombre)));
  const faltantes = CATEGORIAS_BASE.filter((categoria) => !nombresExistentes.has(normalizarNombre(categoria.nombre)));

  if (faltantes.length === 0) return 0;

  const { error: errorInsert } = await supabase
    .from('categorias')
    .insert(faltantes.map((categoria) => ({ ...categoria, grupo_id: grupoId })));

  if (errorInsert) throw new Error('No se pudieron crear las categorías base del grupo.');
  return faltantes.length;
}

async function asegurarMediosPagoBase(supabase: SupabaseClient, grupoId: string) {
  const { data, error } = await supabase
    .from('medios_pago')
    .select('tipo')
    .eq('grupo_id', grupoId);

  if (error) throw new Error('No se pudieron consultar los medios de pago base del grupo.');

  const tiposExistentes = new Set((data ?? []).map((item) => item.tipo));
  const faltantes = MEDIOS_PAGO_BASE.filter((medio) => !tiposExistentes.has(medio.tipo));

  if (faltantes.length === 0) return 0;

  const { error: errorInsert } = await supabase
    .from('medios_pago')
    .insert(faltantes.map((medio) => ({ ...medio, grupo_id: grupoId })));

  if (errorInsert) throw new Error('No se pudieron crear los medios de pago base del grupo.');
  return faltantes.length;
}

export async function asegurarCatalogosBaseGrupo(supabase: SupabaseClient, grupoId: string | null | undefined) {
  if (!grupoId) throw new Error('No se pudo preparar el grupo activo para crear catálogos base.');

  const categoriasCreadas = await asegurarCategoriasBase(supabase, grupoId);
  const mediosPagoCreados = await asegurarMediosPagoBase(supabase, grupoId);

  return { categoriasCreadas, mediosPagoCreados };
}
