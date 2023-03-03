//Variables
const carrito = document.querySelector('#carrito'); //Este DIV es el que contiene la tabla en HTML.
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarrito = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos') ; //Serían el listado de productos.
let articulosCarrito = [];

cargarEventos();
function cargarEventos() {
  //Cuando agregas un producto presionando en el botón "Agregar al carrito"
  listaCursos.addEventListener('click', agregarCurso); 

  //Elimina productos del carrito
  carrito.addEventListener('click', eliminarProducto);

  //Vaciar todo el carrito
  vaciarCarrito.addEventListener('click', () => {
    articulosCarrito = []; //Reseteamos el carrito y volvemos al array vacío

    limpiarHtml(); //Elimar todo el HTML
  })
}


//Funciones
function agregarCurso(e) {
  e.preventDefault();

  if (e.target.classList.contains('agregar-carrito')) {
    const productoSeleccionado = e.target.parentElement.parentElement;

    leerDatosCursos(productoSeleccionado);
  }
}


//Funcion que elimina productos del carrito
function eliminarProducto(e) {
  if (e.target.classList.contains('borrar-curso')) {
    const productoID = e.target.getAttribute('data-id');

    //Elimina del arreglo de articulosCarrito por el data-id
    articulosCarrito = articulosCarrito.filter(producto => producto.id !== productoID);

    carritoHtml();//Itera sobre el carrito y muestra su HTML 
  }
}


//Lee el contenido HTML al que le dimos click y extrae información del producto.
function leerDatosCursos(producto) {

  console.log(producto);

  //Objeto con el contenido del producto actual
  const infoProducto = {
    imagen: producto.querySelector('img').src,
                        //TextContent para extraer el texto
    titulo: producto.querySelector('h4').textContent,
    precio: producto.querySelector('.precio span').textContent,
                      //getAttribute, para extraer el id 
    id: producto.querySelector('a').getAttribute('data-id'),
    cantidad: 1
  }

  //Revisa un elemento ya existe en el carrito
   const existe = articulosCarrito.some( producto => producto.id === infoProducto.id );
   if (existe) {
    //Se actualiza la cantidad
    const productos = articulosCarrito.map( producto => {
      if (producto.id === infoProducto.id) { //Si encuentra un producto igual al actual, sigue que lo sume.
        producto.cantidad++; //El incremento es para que sume los duplicados.
        return producto;//retorna el objeto actualizado duplicado
      } else {
        return producto;//retorna los objetos que no son duplicados
      }
    });
    articulosCarrito = [...productos];

   } else { //Agregamos el producto al carrito
    //Agrega elementos al arreglo carrito - Asignamos al array el objeto del carrito.
    articulosCarrito = [...articulosCarrito, infoProducto];

   }

  console.log(articulosCarrito);

  carritoHtml();

}


//Muestra el carrito de compras en el HTML
function carritoHtml() {

  //Limpiar el HTML
  limpiarHtml();

  //Recorre el carrito y genera el HTML
  articulosCarrito.forEach ( (producto) => {
    const row = document.createElement('tr');
    row.innerHTML = `
    <td>
      <img src = '${producto.imagen}' width = "100"</td>
    </td>
    <td>
      ${producto.titulo}
    </td>
    <td>
      ${producto.precio}
    </td>
    <td>
      ${producto.cantidad}
    </td>
    <td>
      <a href = '#' class = 'borrar-curso' data-id = ${producto.id}> x <a/>
    </td>
    `

    //Agregael HTML del carrito en el tbody
    contenedorCarrito.appendChild(row);

  })
}


//Funcion que limpia el HTML del carrito
function limpiarHtml() {
  //Forma Lenta
  //contenedorCarrito.innerHTML = '';

  //Forma recomendada
  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild)
  }
}


