const formulario = document.getElementById("form");
const nombre = document.getElementById("firstName");
const apellido = document.getElementById("lastName");
const email = document.getElementById("email");
const monto = document.getElementById("amount");
const cuotas = document.getElementById("fees");
const montoFinal = document.getElementById("finalAmount");
const cuotasFinales = document.getElementById("finalFees");
const intereses = document.getElementById("interests");
const montoTotalADevolver = document.getElementById("totalAmount");
const detallePrestamo = document.getElementById("detail");

const tasa = 0.015; //1.5%

//Formula calcuo de intereses
// tasa * monto / (1-(1+tasa)**-cantidad de cuotas)

//***CALCULAR MONTO FINAL PRESTAMO***/
//*Calcular cuota
//*Calcular total

// Obtenemos la cuota del préstamo
const CalcularPrestamo = () => {
  const cuotaPrestamo =
    (tasa * monto.value) / (1 - (1 + tasa) ** -cuotas.value);
  obtenerTotal(cuotaPrestamo);
};

// Obtener el total del préstamo
const obtenerTotal = (cuotaPrestamo) => {
  const total = Math.ceil(cuotaPrestamo) * cuotas.value;

  // Creamos nuestro objeto
  const prestamo = {
    monto: monto.value,
    cuotas: cuotas.value,
    intereses: total - monto.value,
    totalPrestamo: total,
  };

  pintarPrestamo(prestamo);
  guardarPrestamoStorage(prestamo);
};

//***Mostrar Detalle del préstamo***/

// Renderizando en el DOM
const pintarPrestamo = (prestamo) => {
  montoFinal.textContent = `$${prestamo.monto}`;
  cuotasFinales.textContent = `${prestamo.cuotas}`;
  intereses.textContent = `$${prestamo.intereses}`;
  montoTotalADevolver.textContent = `$${prestamo.totalPrestamo}`;
};

//***Escuchar el evento para ejecutar la funcion***/

formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  CalcularPrestamo();
});

//**Guardar los datos en Storage**/
const guardarPrestamoStorage = (prestamo) => {
  localStorage.setItem("prestamo", JSON.stringify(prestamo));
};

const obtenerPrestamoStorage = () => {
  const prestamoStorage = JSON.parse(localStorage.getItem("prestamo"));
  console.log(prestamoStorage);
  pintarPrestamo(prestamoStorage);
};

document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("prestamo")) {
    obtenerPrestamoStorage();
  }
});
