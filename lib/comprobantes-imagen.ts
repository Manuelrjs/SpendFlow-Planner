const ANCHO_MAXIMO_IMAGEN_COMPROBANTE = 1600;
const ALTO_MAXIMO_IMAGEN_COMPROBANTE = 1600;
const CALIDAD_JPEG_COMPROBANTE = 0.72;
const TIPOS_IMAGEN_COMPRESIBLES = new Set(['image/jpeg', 'image/png', 'image/webp']);

export type ResultadoCompresionComprobante = {
  archivo: File;
  comprimido: boolean;
  tamanoOriginal: number;
};

function crearNombreJpeg(nombreOriginal: string) {
  const nombreBase = nombreOriginal.replace(/\.[^.]+$/, '').trim() || 'comprobante';
  return `${nombreBase}.jpg`;
}

function cargarImagen(archivo: File) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const url = URL.createObjectURL(archivo);
    const imagen = new Image();
    imagen.onload = () => {
      URL.revokeObjectURL(url);
      resolve(imagen);
    };
    imagen.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('No se pudo leer la imagen del comprobante.'));
    };
    imagen.src = url;
  });
}

function calcularDimensiones(ancho: number, alto: number) {
  const escala = Math.min(1, ANCHO_MAXIMO_IMAGEN_COMPROBANTE / ancho, ALTO_MAXIMO_IMAGEN_COMPROBANTE / alto);
  return {
    ancho: Math.max(1, Math.round(ancho * escala)),
    alto: Math.max(1, Math.round(alto * escala)),
  };
}

function canvasABlob(canvas: HTMLCanvasElement) {
  return new Promise<Blob | null>((resolve) => {
    canvas.toBlob(resolve, 'image/jpeg', CALIDAD_JPEG_COMPROBANTE);
  });
}

export async function comprimirImagenComprobante(archivo: File): Promise<ResultadoCompresionComprobante> {
  if (!TIPOS_IMAGEN_COMPRESIBLES.has(archivo.type)) {
    return { archivo, comprimido: false, tamanoOriginal: archivo.size };
  }

  try {
    const imagen = await cargarImagen(archivo);
    const anchoOriginal = imagen.naturalWidth || imagen.width;
    const altoOriginal = imagen.naturalHeight || imagen.height;
    if (!anchoOriginal || !altoOriginal) {
      return { archivo, comprimido: false, tamanoOriginal: archivo.size };
    }

    const { ancho, alto } = calcularDimensiones(anchoOriginal, altoOriginal);
    const canvas = document.createElement('canvas');
    canvas.width = ancho;
    canvas.height = alto;
    const contexto = canvas.getContext('2d');
    if (!contexto) return { archivo, comprimido: false, tamanoOriginal: archivo.size };

    contexto.drawImage(imagen, 0, 0, ancho, alto);
    const blob = await canvasABlob(canvas);
    if (!blob || blob.size >= archivo.size) {
      return { archivo, comprimido: false, tamanoOriginal: archivo.size };
    }

    return {
      archivo: new File([blob], crearNombreJpeg(archivo.name), { type: 'image/jpeg', lastModified: Date.now() }),
      comprimido: true,
      tamanoOriginal: archivo.size,
    };
  } catch (error) {
    console.warn('No se pudo comprimir la imagen del comprobante. Se usará el archivo original.', error);
    return { archivo, comprimido: false, tamanoOriginal: archivo.size };
  }
}
