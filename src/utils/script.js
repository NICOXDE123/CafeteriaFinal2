// src/utils/script.js

/**
 * initializeModal - configura el modal para ampliar imágenes en Tienda Física
 */
export default function initializeModal() {
    const img = document.getElementById('miImagen');
    const modal = document.getElementById('miModal');
    const modalImg = document.getElementById('imagenGrande');
    const cerrar = document.getElementById('cerrarModal');
  
    if (img && modal && modalImg && cerrar) {
      img.addEventListener('click', () => {
        modal.style.display = 'block';
        modalImg.src = img.src;
      });
      cerrar.addEventListener('click', () => {
        modal.style.display = 'none';
      });
    }
  }
  
  /*
    Pasos:
    1. Crea la carpeta 'src/utils' dentro de 'frontend/src'.
    2. Copia este contenido en un archivo llamado 'script.js'.
    3. El componente TiendaFisica.jsx importará y ejecutará esta función en useEffect.
  */
  