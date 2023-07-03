const title = document.querySelector("title");
document.addEventListener("DOMContentLoaded", () => {
  if (title.text == "Montería") {
    lugaresJSON();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("scroll", handleScrollUp);
  } else if (title.text == "Montería - Cultura") {
    crearGaleria();
  } else if (title.text == "Montería - Eventos") {
    eventosJSON();
  } else if (title.text == "Montería - Historia") {
    historiasJSON();
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

async function lugaresJSON() {
  let lugares;
  try {
    const archivo = await fetch("/data/lugares.json");
    lugares = await archivo.json();
  } catch (error) {
    console.error("No se pudo obtener el archivo de la eventos de Montería");
    lugares = [];
  }
  const main = document.querySelector("main");
  if (lugares.length === 0) {
    const h2 = document.createElement("h2");
    h2.textContent = "No hay lugares turisticos registrados";
    h2.classList.add("centrar-text");
    main.appendChild(h2);
  } else {
    const h2 = document.createElement("h2");
    h2.textContent = "Lugares Turisticos";
    h2.classList.add("centrar-text");
    main.appendChild(h2);
    lugares.forEach((elem, i) => {
      const tarjeta = document.createElement("div");
      tarjeta.classList.add("tarjeta");
      const divImg = document.createElement("div");
      const img = document.createElement("img");
      img.src = elem.img;
      img.alt = `Imagen ${elem.lugar}`;
      divImg.appendChild(img);
      if (i % 2 === 0) {
        tarjeta.classList.add("img-i");
      } else {
        tarjeta.classList.add("img-d");
        divImg.classList.add("mover-img");
      }
      const divText = document.createElement("div");
      const h3 = document.createElement("h3");
      h3.textContent = elem.lugar;
      divText.appendChild(h3);
      const p = document.createElement("p");
      p.textContent = elem.descripcion;
      divText.appendChild(p);
      tarjeta.appendChild(divImg);
      tarjeta.appendChild(divText);
      main.appendChild(tarjeta);
    });
  }
}

async function historiasJSON() {
  let historias;
  try {
    const archivo = await fetch("/data/historia.json");
    historias = await archivo.json();
  } catch (error) {
    console.error("No se pudo obtener el archivo de la historia de Montería");
    historias = [];
  }
  const main = document.querySelector("main");
  if (historias.length == 0) {
    const h2 = document.createElement("h2");
    h2.textContent = "No hay historias en el documento json";
    h2.classList.add("centrar-text");
    main.appendChild(h2);
  } else {
    const h2 = document.createElement("h2");
    h2.textContent = "Historia de Montería";
    h2.classList.add("centrar-text");
    main.appendChild(h2);
    historias.forEach(elem => {
      const tarjeta = document.createElement("article");
      tarjeta.classList.add("tarjeta", "img-i");
      const divImg = document.createElement("div");
      const img = document.createElement("img");
      img.src = elem.img;
      img.alt = `Imagen ${elem.historia}`;
      divImg.appendChild(img);
      const divText = document.createElement("div");
      const p = document.createElement("p");
      const h3 = document.createElement("h3");
      h3.textContent = elem.historia;
      p.textContent = elem.descripcion;
      divText.appendChild(h3);
      divText.appendChild(p);
      const leerMas = document.createElement("a");
      leerMas.href = "#";
      leerMas.classList.add("boton");
      leerMas.textContent = "Leer Mas";
      divText.appendChild(leerMas);
      tarjeta.appendChild(divImg);
      tarjeta.appendChild(divText);
      main.appendChild(tarjeta);
    });
  }
}

async function eventosJSON() {
  let eventos;
  try {
    const archivo = await fetch("/data/eventos.json");
    eventos = await archivo.json();
  } catch (error) {
    console.error("No se pudo obtener el archivo de la eventos de Montería");
    eventos = [];
  }
  const main = document.querySelector("main");
  if (eventos.length == 0) {
    const h2 = document.createElement("h2");
    h2.textContent = "No hay eventos proximos";
    h2.classList.add("centrar-text");
    main.appendChild(h2);
  } else {
    const h2 = document.createElement("h2");
    h2.textContent = "Proximos Eventos";
    h2.classList.add("centrar-text");
    main.appendChild(h2);
    eventos.forEach((elem, i) => {
      const evento = document.createElement("div");
      evento.classList.add("evento");
      const h3 = document.createElement("h3");
      h3.textContent = elem.evento;
      const img = document.createElement("img");
      img.src = elem.img;
      img.alt = `Imagen ${elem.evento}`;
      const contador = document.createElement("div");
      contador.classList.add("contador");
      contador.dataset.fecha = elem.fecha;
      actualizarContador(contador);
      const p = document.createElement("p");
      p.innerHTML = elem.descripcion;
      const btn = document.createElement("a");
      btn.classList.add("boton");
      btn.textContent = "Saber más sobre el evento";
      btn.href = "#";
      evento.appendChild(h3);
      evento.appendChild(img);
      evento.appendChild(contador);
      evento.appendChild(p);
      main.appendChild(evento);
      main.appendChild(btn);
    });
  }
}

function actualizarContador(contador) {
  const fechaObjetivo = new Date(contador.dataset.fecha);
  let cont = setInterval(() => {
    let fechaActual = new Date().getTime();
    let diferencia = fechaObjetivo - fechaActual;
    let dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    let horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
    let segundos = Math.floor((diferencia % (1000 * 60)) / 1000);
    contador.innerHTML = `
      ¡Faltan ${dias} dias ${horas} horas ${minutos} minutos ${segundos}s para el evento!
    `;
    if (diferencia < 0) {
      clearInterval(contador);
      contador.innerHTML = "¡El evento ha ocurrido!";
      contador.classList.remove("contador-animado");
    } else {
      contador.classList.add("contador-animado");
    }
  }, 1000);
}