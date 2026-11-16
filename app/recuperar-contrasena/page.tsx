'use client';

import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { supabase } from '@/lib/supabase/client';

export default function RecuperarContrasenaPage() {
  const [email, setEmail] = useState('');
  const [mensaje, setMensaje] = useState('Ingresá el correo de tu cuenta de SpendFlow.');
  const [enviado, setEnviado] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  async function enviarRecuperacion(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError(false);
    setMensaje('Enviando instrucciones...');

    try {
      const urlConfigurada = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, '');
      const redirectTo = `${urlConfigurada || window.location.origin}/restablecer-contrasena`;
      const { error: errorRecuperacion } = await supabase.auth.resetPasswordForEmail(email.trim(), { redirectTo });
      if (errorRecuperacion) throw errorRecuperacion;

      setEnviado(true);
      setMensaje('Si el correo corresponde a una cuenta, vas a recibir un enlace para crear una nueva contraseña. Revisá también Spam o Correo no deseado.');
    } catch (errorRecuperacion) {
      console.error('Error solicitando recuperación de contraseña', errorRecuperacion);
      setError(true);
      setMensaje('No pudimos enviar el correo. Revisá la dirección e intentá nuevamente.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="sf-auth-card mx-auto mt-8">
      <p className="sf-kicker">SpendFlow Planner</p>
      <h1 className="mt-1 text-2xl font-bold">Recuperar contraseña</h1>
      <p className={`mt-4 rounded-xl border px-3 py-2.5 text-sm ${error ? 'border-rose-200 bg-rose-50 text-rose-700' : enviado ? 'border-emerald-200 bg-emerald-50 text-emerald-800' : 'border-[var(--border)] bg-[var(--surface-2)] text-slate-600'}`}>{mensaje}</p>

      {!enviado ? (
        <form onSubmit={enviarRecuperacion} className="mt-5 space-y-4" autoComplete="on">
          <label className="block text-sm font-semibold text-slate-700">
            Email de SpendFlow
            <input className="mt-1.5 w-full rounded-xl border px-3 py-2.5" placeholder="tu@email.com" type="email" name="username" autoComplete="username" inputMode="email" autoCapitalize="none" autoCorrect="off" value={email} onChange={(event) => setEmail(event.target.value)} required />
          </label>
          <button disabled={loading} className="w-full rounded-xl bg-emerald-600 px-4 py-3 font-semibold text-white shadow-sm disabled:cursor-not-allowed disabled:opacity-70">{loading ? 'Enviando...' : 'Enviar enlace de recuperación'}</button>
        </form>
      ) : null}

      <Link href="/login" className="mt-5 inline-block text-sm font-semibold text-emerald-700">Volver a iniciar sesión</Link>
    </section>
  );
}
