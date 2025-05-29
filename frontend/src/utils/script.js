
// setup del modal de imagen (TiendaFisica.jsx)
export default function initializeModal() {
  // busca cada imagen dentro de .producto-card
  document.querySelectorAll('.producto-card img').forEach((img) => {
    const modal = document.getElementById('miModal');
    const modalImg = document.getElementById('imagenGrande');
    const btnCerrar = document.getElementById('cerrarModal');

    img.addEventListener('click', () => {
      modal.style.display = 'flex';
      modalImg.src = img.src;
    });

    btnCerrar.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  });
}
