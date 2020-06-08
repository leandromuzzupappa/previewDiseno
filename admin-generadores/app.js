const imagen = document.querySelector('#image');

// mostrar el tamaño de la pantalla
const screenRes = () => {
  let w = window.innerWidth;
  let h = window.innerHeight;
  let screen = document.querySelector('#screenRes');
  screen.innerHTML = `${w} x ${h}`;

  w > 1450 ? imagen.setAttribute('src', preview[0]) : '';
  w > 1000 && w < 1450 ? imagen.setAttribute('src', preview[1]) : '';
  w > 0 && w < 1000 ? imagen.setAttribute('src', preview[2]) : '';

}
window.addEventListener('load', () => screenRes());
window.addEventListener('resize', () => screenRes());