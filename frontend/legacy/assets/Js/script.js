document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("miModal");
  const imagen = document.querySelector(".imagen-pequena");
  const modalImg = document.getElementById("imagenGrande");
  const cerrar = document.querySelector(".cerrar");

  imagen.onclick = function () {
    modal.style.display = "block";
    modalImg.src = this.src;
  };

  cerrar.onclick = function () {
    modal.style.display = "none";
  };

  window.onclick = function (e) {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  };
});