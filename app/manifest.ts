import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  const appManifest = {
    name: 'SpendFlow Planner',
    short_name: 'SpendFlow',
    description: 'Gastos, cuotas y compromisos futuros',
    start_url: '/',
    display: 'standalone',
    background_color: '#0B0F14',
    theme_color: '#0B0F14',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    share_target: {
      action: '/compartir',
      method: 'POST',
      enctype: 'multipart/form-data',
      params: {
        title: 'title',
        text: 'text',
        url: 'url',
        files: [
          {
            name: 'files',
            accept: ['image/*', 'application/pdf'],
          },
        ],
      },
    },
  };

  return appManifest as unknown as MetadataRoute.Manifest;
}
