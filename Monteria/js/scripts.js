window.addEventListener('scroll', function () {
    var botonVolverArriba = document.getElementById('btnVolverArriba');
    if (window.pageYOffset > 100) {
        botonVolverArriba.style.display = 'block';
    } else {
        botonVolverArriba.style.display = 'none';
    }
});

document.getElementById('btnVolverArriba').addEventListener('click', function (e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
var enlaces = document.querySelectorAll(".navegacion__enlace");

enlaces.forEach(function (enlace) {
  enlace.addEventListener("mouseover", function () {
    enlace.style.transform = "scale(1.2)";
  });

  enlace.addEventListener("mouseout", function () {
    enlace.style.transform = "none";
  });
});


// Fecha objetivo (25 de junio de 2023)
var fechaObjetivo = new Date("June 25, 2023 00:00:00").getTime();

// Actualizar el contador cada segundo
var contador = setInterval(function() {
  // Obtener la fecha y hora actual
  var fechaActual = new Date().getTime();

  // Calcular la diferencia entre la fecha actual y la fecha objetivo
  var diferencia = fechaObjetivo - fechaActual;

  // Calcular los días, horas, minutos y segundos restantes
  var dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
  var horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
  var segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

  // Mostrar el contador en el elemento con el ID "contador"
  document.getElementById("contador").innerHTML = "Faltan " + dias + "d " + horas + "h " + minutos + "m " + segundos + "s" + " Para el evento!!";

  // Si la fecha objetivo ha pasado, mostrar un mensaje de finalización
  if (diferencia < 0) {
    clearInterval(contador);
    document.getElementById("contador").innerHTML = "¡El evento ha ocurrido!";
  }
}, 1000);



function handleScroll() {
  const images = document.querySelectorAll('.img-i, .img-d');
  
  images.forEach(image => {
    const imagePosition = image.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (imagePosition < windowHeight) {
      image.classList.add('slide-in-animation');
    }
  });
}

window.addEventListener('scroll', handleScroll);


let isScrollingUp = false;

function handleScroll() {
  const images = document.querySelectorAll('.img-i, .img-d');
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  if (scrollTop === 0) {
    // El usuario está en la parte superior de la página
    isScrollingUp = true;
  } else {
    // El usuario está haciendo scroll hacia abajo
    if (isScrollingUp) {
      // Reiniciar la animación al volver a bajar
      images.forEach(image => image.classList.remove('slide-in-animation'));
      isScrollingUp = false;
    }
    
    images.forEach(image => {
      const imagePosition = image.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (imagePosition < windowHeight) {
        image.classList.add('slide-in-animation');
      }
    });
  }
}

window.addEventListener('scroll', handleScroll);

