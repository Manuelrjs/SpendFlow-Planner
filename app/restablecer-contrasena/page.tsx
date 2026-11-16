'use client';

import Link from 'next/link';
import { FormEvent, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';

export default function RestablecerContrasenaPage() {
  const [password, setPassword] = useState('');
  const [confirmacion, setConfirmacion] = useState('');
  const [sesionLista, setSesionLista] = useState(false);
  const [verificando, setVerificando] = useState(true);
  const [loading, setLoading] = useState(false);
  const [completado, setCompletado] = useState(false);
  const [mensaje, setMensaje] = useState('Validando el enlace de recuperación...');
  const [error, setError] = useState(false);

  useEffect(() => {
    let montado = true;

    async function verificarSesion() {
      const { data, error: errorSesion } = await supabase.auth.getSession();
      if (!montado) return;
      const disponible = Boolean(data.session);
      setSesionLista(disponible);
      setVerificando(false);
      setError(Boolean(errorSesion) || !disponible);
      setMensaje(disponible ? 'Creá una contraseña nueva para tu cuenta de SpendFlow.' : 'El enlace venció, ya fue utilizado o no es válido. Solicitá uno nuevo.');
    }

    void verificarSesion();
    const { data: listener } = supabase.auth.onAuthStateChange((evento, session) => {
      if (!montado || (evento !== 'PASSWORD_RECOVERY' && evento !== 'SIGNED_IN')) return;
      setSesionLista(Boolean(session));
      setVerificando(false);
      setError(!session);
      setMensaje(session ? 'Creá una contraseña nueva para tu cuenta de SpendFlow.' : 'No pudimos validar el enlace de recuperación.');
    });

    return () => {
      montado = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  async function guardarContrasena(event: FormEvent) {
    event.preventDefault();
    setError(false);

    if (password.length < 8) {
      setError(true);
      return setMensaje('La contraseña debe tener al menos 8 caracteres.');
    }
    if (password !== confirmacion) {
      setError(true);
      return setMensaje('Las contraseñas no coinciden.');
    }

    setLoading(true);
    setMensaje('Guardando la nueva contraseña...');
    try {
      const { error: errorActualizacion } = await supabase.auth.updateUser({ password });
      if (errorActualizacion) throw errorActualizacion;
      await supabase.auth.signOut();
      setCompletado(true);
      setSesionLista(false);
      setMensaje('Contraseña actualizada. Ya podés iniciar sesión y guardar la credencial de SpendFlow.');
    } catch (errorActualizacion) {
      console.error('Error actualizando contraseña', errorActualizacion);
      setError(true);
      setMensaje('No pudimos actualizar la contraseña. Solicitá un nuevo enlace e intentá nuevamente.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="sf-auth-card mx-auto mt-8">
      <p className="sf-kicker">SpendFlow Planner</p>
      <h1 className="mt-1 text-2xl font-bold">Crear nueva contraseña</h1>
      <p className={`mt-4 rounded-xl border px-3 py-2.5 text-sm ${error ? 'border-rose-200 bg-rose-50 text-rose-700' : completado ? 'border-emerald-200 bg-emerald-50 text-emerald-800' : 'border-[var(--border)] bg-[var(--surface-2)] text-slate-600'}`}>{mensaje}</p>

      {!verificando && sesionLista && !completado ? (
        <form onSubmit={guardarContrasena} className="mt-5 space-y-4" autoComplete="on">
          <label className="block text-sm font-semibold text-slate-700">Nueva contraseña<input className="mt-1.5 w-full rounded-xl border px-3 py-2.5" type="password" name="new-password" autoComplete="new-password" minLength={8} value={password} onChange={(event) => setPassword(event.target.value)} required /></label>
          <label className="block text-sm font-semibold text-slate-700">Repetir contraseña<input className="mt-1.5 w-full rounded-xl border px-3 py-2.5" type="password" name="confirm-password" autoComplete="new-password" minLength={8} value={confirmacion} onChange={(event) => setConfirmacion(event.target.value)} required /></label>
          <button disabled={loading} className="w-full rounded-xl bg-emerald-600 px-4 py-3 font-semibold text-white shadow-sm disabled:cursor-not-allowed disabled:opacity-70">{loading ? 'Guardando...' : 'Guardar nueva contraseña'}</button>
        </form>
      ) : null}

      {!verificando && !sesionLista && !completado ? <Link href="/recuperar-contrasena" className="mt-5 inline-block text-sm font-semibold text-emerald-700">Solicitar otro enlace</Link> : null}
      {completado ? <Link href="/login" className="mt-5 inline-block rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white">Iniciar sesión</Link> : null}
    </section>
  );
}
