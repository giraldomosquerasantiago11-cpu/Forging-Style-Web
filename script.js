const botones = document.querySelectorAll(".boton-whatsapp");

botones.forEach((boton) => {
    const producto = boton.closest(".producto");
    const nombre = producto.querySelector("h3").textContent.trim();

    let precio;

    if (producto.querySelector(".precio-oferta")) {
        precio = producto.querySelector(".precio-oferta").textContent.trim();
    } else {
        precio = producto.querySelector("p").textContent.replace("Precio:", "").trim();
    }

    const mensaje = `Hola, estoy interesado en el producto ${nombre} con precio de ${precio}. ¿Sigue disponible? Me gustaría recibir más información.`;

    boton.href = `https://api.whatsapp.com/send?phone=573227335612&text=${encodeURIComponent(mensaje)}`;
});
const imagenesProducto = document.querySelectorAll(".producto img");
const modalImagen = document.getElementById("modalImagen");
const imagenGrande = document.getElementById("imagenGrande");
const cerrarModal = document.querySelector(".cerrar-modal");

imagenesProducto.forEach((imagen) => {
    imagen.addEventListener("click", () => {
        imagenGrande.src = imagen.src;
        modalImagen.style.display = "flex";
    });
});

cerrarModal.addEventListener("click", () => {
    modalImagen.style.display = "none";
});

modalImagen.addEventListener("click", (e) => {
    if (e.target === modalImagen) {
        modalImagen.style.display = "none";
    }
});
const botonArriba = document.getElementById("botonArriba");

window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
        botonArriba.style.display = "flex";
    } else {
        botonArriba.style.display = "none";
    }
});
const botonesOrdenar = document.querySelectorAll(".ordenar-precio");

botonesOrdenar.forEach((boton) => {
    boton.addEventListener("click", () => {
        const categoria = boton.closest(".categoria");
        const contenedor = categoria.querySelector(".contenedor-productos");
        const productos = Array.from(contenedor.querySelectorAll(".producto"));

        productos.sort((a, b) => {
            const precioA = obtenerPrecio(a);
            const precioB = obtenerPrecio(b);

            return precioA - precioB;
        });

        productos.forEach((producto) => {
            contenedor.appendChild(producto);
        });
    });
});

function obtenerPrecio(producto) {
    const precioOferta = producto.querySelector(".precio-oferta");

    let textoPrecio;

    if (precioOferta) {
        textoPrecio = precioOferta.textContent;
    } else {
        textoPrecio = producto.querySelector("p").textContent;
    }

    return Number(textoPrecio.replace("Precio:", "").replace("$", "").replace(".", "").trim());
}