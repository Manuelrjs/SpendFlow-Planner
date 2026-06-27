'use client';

import { useEffect, useState } from 'react';

type FeedbackToastTipo = 'ok' | 'error' | 'warning' | 'info';

type FeedbackToastProps = {
  mensaje: string | null | undefined;
  tipo?: FeedbackToastTipo;
};

const estilosPorTipo: Record<FeedbackToastTipo, string> = {
  ok: 'border-emerald-300 bg-emerald-50 text-emerald-700',
  error: 'border-rose-300 bg-rose-50 text-rose-700',
  warning: 'border-amber-300 bg-amber-50 text-amber-700',
  info: 'border-sky-300 bg-sky-50 text-sky-700',
};

const etiquetaPorTipo: Record<FeedbackToastTipo, string> = {
  ok: 'Listo',
  error: 'Revisar',
  warning: 'Atencion',
  info: 'Info',
};

export function FeedbackToast({ mensaje, tipo = 'info' }: FeedbackToastProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!mensaje) {
      setVisible(false);
      return undefined;
    }

    setVisible(true);
    const duracion = tipo === 'error' ? 7000 : 4200;
    const timeoutId = window.setTimeout(() => setVisible(false), duracion);

    return () => window.clearTimeout(timeoutId);
  }, [mensaje, tipo]);

  if (!mensaje || !visible) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-[max(5.25rem,calc(4.25rem+env(safe-area-inset-bottom)))] z-[65] flex justify-center px-4 lg:bottom-6">
      <div
        role={tipo === 'error' ? 'alert' : 'status'}
        aria-live={tipo === 'error' ? 'assertive' : 'polite'}
        className={`pointer-events-auto flex w-full max-w-md items-start gap-3 rounded-2xl border px-4 py-3 text-sm font-medium shadow-2xl backdrop-blur ${estilosPorTipo[tipo]}`}
      >
        <span className="mt-0.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full border text-[10px] font-bold">
          {tipo === 'ok' ? 'OK' : tipo === 'error' ? '!' : tipo === 'warning' ? '!' : 'i'}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-xs font-bold uppercase tracking-wide">{etiquetaPorTipo[tipo]}</span>
          <span className="block leading-snug">{mensaje}</span>
        </span>
      </div>
    </div>
  );
}
