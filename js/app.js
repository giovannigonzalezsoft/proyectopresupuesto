//VARIABLES
var ingresos = [
    // new Ingreso("Salario", 20000),
    // new Ingreso("Venta Auto", 50000)
]; 
var egresos = [
    // new Egreso("Renta", 4000),
    // new Egreso("Ropa", 800)
];

const agregarDato = () => {
    let forma = document.getElementById("forma");
    let tipo = document.getElementById("tipo");
    let descripcion = document.getElementById("descripcion");
    let valor = document.getElementById("valor");
    if (descripcion.value !== "" && valor.value !== "") {
        if(tipo.value === "ingreso") {
            let ingreso = new Ingreso(descripcion.value, parseFloat(valor.value))
            ingresos.push(ingreso);
            cargarCabecero();
            cargarIngresos();
            descripcion.value = "";
            valor.value = "";
        }
        else if(tipo.value === "egreso") {
            let egreso = new Egreso(descripcion.value, parseFloat(valor.value))
            egresos.push(egreso);
            cargarCabecero();
            cargarEgresos();
            descripcion.value = "";
            valor.value = "";
        }

    }
    else {
        alert("DESCRIPCION y VALOR debe ser diferente de vacio");
    }
}

const eliminarEgreso = (id) => {
    let indiceEliminar = egresos.findIndex(indice => indice.id === id);
    egresos.splice(indiceEliminar, 1);
    cargarCabecero();
    cargarEgresos();
}

const eliminarIngreso = (id) => {
    let indiceEliminar = ingresos.findIndex(indice => indice.id === id);
    ingresos.splice(indiceEliminar, 1);
    cargarCabecero();
    cargarIngresos();
}

const crearIngresoHTML = (ingreso) => {
    let ingresoHTML = 
    `<div class="elemento limpiarEstilos">
        <div class="elemento_descripcion">${ingreso.descripcion}</div>
        <div class="derecha limpiarEstilos">
            <div class="elemento_valor">${formatoMoneda(ingreso.valor)}</div>
            <div class="elemento_eliminar">
                <button class="elemento_eliminar_btn">
                  <ion-icon class="close-circle-outline" onclick="eliminarIngreso(${ingreso.id})"></ion-icon>
                </button>
            </div>
        </div>
    </div>`;
    return ingresoHTML;
    // const elemento_limpiarEstilos = document.createElement("div");
    // elemento_limpiarEstilos.className = "elemento limpiarEstilos";
    // const elemento_descripcion = document.createElement("div");
    // elemento_descripcion.className = "elemento_descripcion";
    // elemento_descripcion.textContent = ingreso.descripcion;
    // elemento_limpiarEstilos.appendChild(elemento_descripcion);
    
    // const derecha_limpiarEstilos = document.createElement("div");
    // derecha_limpiarEstilos.className = "derecha limpiarEstilos";
    // const elemento_valor = document.createElement("div");
    // elemento_valor.className = "elemento_valor";
    // elemento_valor.textContent = ingreso.valor.toString();
    // derecha_limpiarEstilos.appendChild(elemento_valor);
    // elemento_limpiarEstilos.appendChild(derecha_limpiarEstilos);

    // const elemento_eliminar = document.createElement("div");
    // elemento_eliminar.className = "elemento_eliminar";
    
    // const elemento_eliminar_btn = document.createElement("button");
    // elemento_eliminar_btn.className = "elemento_eliminar_btn";
    
    // const ion_icon = document.createElement("ion-icon");
    // ion_icon.className = "close-circle-outline";

    // elemento_eliminar_btn.appendChild(ion_icon);
    // elemento_eliminar.appendChild(elemento_eliminar_btn);
    // derecha_limpiarEstilos.appendChild(elemento_eliminar);
    // return elemento_limpiarEstilos.innerHTML;
    // ingresoHTML.appendChild(elemento_limpiarEstilos);
    // return ingresoHTML;
}

const cargarIngresos = () => {
    var ingresosHTML = "";
    for (const ingreso of ingresos) {
        ingresosHTML += crearIngresoHTML(ingreso);
       //console.log(crearIngresoHTML(ingreso));
    }
    //let idListaIngresos = document.querySelector(".lista-ingresos");
    let idListaIngresos = document.getElementById("lista-ingresos");
    idListaIngresos.innerHTML = ingresosHTML;
}

const crearEgresoHTML = (egreso) => {
    let egresoHTML = 
    `<div class="elemento limpiarEstilos">
        <div class="elemento_descripcion">${egreso.descripcion}</div>
        <div class="derecha limpiarEstilos">
            <div class="elemento_valor">${formatoMoneda(egreso.valor)}</div>
            <div class="elemento_eliminar">
                <button class="elemento_eliminar_btn">
                  <ion-icon class="close-circle-outline" onclick="eliminarEgreso(${egreso.id})"></ion-icon>
                </button>
            </div>
        </div>
    </div>`;
    return egresoHTML;
}

const cargarEgresos = () => {
    var egresosHTML = "";
    for (const egreso of egresos) {
        egresosHTML += crearEgresoHTML(egreso);
    }
    //let idListaEgresos = document.querySelector(".lista-egresos");
    let idListaEgresos = document.getElementById("lista-egresos");
    idListaEgresos.innerHTML = egresosHTML;
}
const cargarApp = () => {
    cargarCabecero();
    cargarIngresos();
    cargarEgresos();
}

const cargarCabecero = () => {
    let presupuesto = totalIngresos() - totalEgresos(); 
    let porcentajeEgreso = totalEgresos() / totalIngresos();
    let idPresupuesto = document.getElementById("presupuesto");
    idPresupuesto.innerHTML = formatoMoneda(presupuesto);
    let idPorcentaje = document.getElementById("porcentaje");
    idPorcentaje.innerHTML = formatoPorcentaje(porcentajeEgreso);
    let idIngresos = document.getElementById("ingresos");
    idIngresos.innerHTML = formatoMoneda(totalIngresos());
    let idEgresos = document.getElementById("egresos");
    idEgresos.innerHTML = formatoMoneda(totalEgresos());
    // console.log(formatoMoneda(presupuesto));
    // console.log(formatoPorcentaje(porcentajeEgreso));
    // console.log(formatoMoneda(totalIngresos()));
    // console.log(formatoMoneda(totalEgresos()));
}

const totalIngresos = () => {   
    let total = 0;
    // ingresos.forEach(ingreso => {
    //     console.log(ingreso);
    // });
    for (const ingreso of ingresos) {

        total+=ingreso.valor;
    }
    return total;
}

const totalEgresos = () => {
    let total = 0;
    for (const egreso of egresos) {

        total+=egreso.valor;
    }
    return total;
}

const formatoMoneda = (valor) => {
    const formateado = valor.toLocaleString("en", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
    });
    return formateado;
}

const formatoPorcentaje = (valor) => {
    const formateado = valor.toLocaleString("en", {
        style: "percent",
        minimumFractionDigits: 2,
    });
    return formateado;
}