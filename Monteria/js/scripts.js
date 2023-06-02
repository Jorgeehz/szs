const title = document.querySelector("title");
document.addEventListener("DOMContentLoaded", () => {
  if (title.text == "Montería - Cultura") {
    crearGaleria();
  } else if (title.text == "Montería - Eventos") {
    actualizarContador();
  } else {
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("scroll", handleScrollUp);
  }
});

const btnArriba = document.querySelector(".btnArriba");
window.addEventListener("scroll", () => {
  if (window.pageYOffset > 100) {
    btnArriba.style.display = "block";
  } else {
    btnArriba.style.display = "none";
  }
});
btnArriba.addEventListener("click", e => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: "smooth" });
});

const enlaces = document.querySelectorAll(".navegacion__enlace");
enlaces.forEach(enlace => {
  enlace.addEventListener("mouseover", () => enlace.style.transform = "scale(1.2)");
  enlace.addEventListener("mouseout", () => enlace.style.transform = "none");
});

function actualizarContador() {
  const fechaObjetivo = new Date("June 25, 2023 00:00:00").getTime();
  let contador = setInterval(() => {
    let fechaActual = new Date().getTime();
    let diferencia = fechaObjetivo - fechaActual;
    let dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    let horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
    let segundos = Math.floor((diferencia % (1000 * 60)) / 1000);
    const cont = document.querySelector(".contador");
    cont.innerHTML = `
      ¡Faltan ${dias} dias ${horas} horas ${minutos} minutos ${segundos}s para el evento!
    `;
    if (diferencia < 0) {
      clearInterval(contador);
      cont.innerHTML = "¡El evento ha ocurrido!";
      cont.classList.remove("contador-animado");
    } else {
      cont.classList.add("contador-animado");
    }
  }, 1000);
}

function handleScroll() {
  const images = document.querySelectorAll(".img-i, .img-d");
  images.forEach(image => {
    const imagePosition = image.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    if (imagePosition < windowHeight) {
      image.classList.add("slide-in-animation");
    }
  });
}

let isScrollingUp = false;
function handleScrollUp() {
  const images = document.querySelectorAll(".img-i, .img-d");
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  if (scrollTop === 0) {
    isScrollingUp = true;
  } else {
    if (isScrollingUp) {
      images.forEach(image => image.classList.remove("slide-in-animation"));
      isScrollingUp = false;
    }
    images.forEach(image => {
      const imagePosition = image.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      if (imagePosition < windowHeight) {
        image.classList.add("slide-in-animation");
      }
    });
  }
}

function crearGaleria() {
  const galeriaComida = document.querySelector(".mosaico-comida");
  const galeriaMusica = document.querySelector(".mosaico-musica");
  for (let i = 1; i <= 4; i++) {
    const imagenComida = document.createElement("div");
    const imagenMusica = document.createElement("div");
    imagenComida.classList.add(`comida${i}`);
    imagenMusica.classList.add(`musica${i}`);
    imagenComida.onclick = () => {
      mostrarImagen(i);
    }
    imagenMusica.onclick = () => {
      mostrarImagen(i, "musica");
    }
    galeriaComida.appendChild(imagenComida);
    galeriaMusica.appendChild(imagenMusica);
  }
}

function mostrarImagen(img, gal) {
  const imagen = document.createElement("picture");
  if (gal == "musica") {
    imagen.innerHTML = `
      <img loading="lazy" src="img/musica-${img}.jpg" alt="Imagen Musica #${img}" />
    `;
  } else { 
    imagen.innerHTML = `
      <img loading="lazy"src="img/comida-${img}.jpg" alt="Imagen Comida #${img}" />
    `;
  }
  const overlay = document.createElement("div");
  overlay.appendChild(imagen);
  overlay.classList.add("overlay");
  overlay.onclick = () => {
    const body = document.querySelector("body");
    overlay.remove();
    body.classList.remove("fijar-body");
    btnArriba.style.display = "block";
  };
  const body = document.querySelector("body");
  body.appendChild(overlay);
  body.classList.add("fijar-body");
  btnArriba.style.display = "none";
}