import { useState } from "react";
import Cabecera from "./components/Cabecera";
import Rejilla from "./components/Rejilla";
import Filtros from "./components/Filtros";
import { CARTELES_PRUEBA } from "./datosDePrueba";
import { aplicarFiltros, ordenarCarteles, valoresUnicos, recompensaTotal, formatearBerries } from "./transform";

const FILTROS_INICIALES = {nombre: "", tripulacion: "", estado: "todos", recompensa: "con", fruta: "todos", orden: "recompensa"};

export default function App() {
  const [filtros, setFiltros] = useState(FILTROS_INICIALES);

  function cambiarFiltro(campo, valor){
    setFiltros((anteriores) => ({...anteriores, [campo]: valor}));
  }

  const tripulaciones = valoresUnicos(CARTELES_PRUEBA, "tripulacion");
  const tiposFruta = valoresUnicos(CARTELES_PRUEBA, "tipoFruta")
  const visibles = ordenarCarteles(aplicarFiltros(CARTELES_PRUEBA, filtros), filtros.orden)
  const resumen = `${visibles.length} personajes ///// Recompensa de: ${formatearBerries(recompensaTotal(visibles))}`;

  return (
    <>
      <Cabecera />
      <Filtros
        filtros={filtros}
        valorAlCambiar={cambiarFiltro}
        valorAlLimpiar={() => setFiltros(FILTROS_INICIALES)}
        tripulaciones={tripulaciones}
        tiposFruta={tiposFruta}
      />

      <main>
        <p className="resumen">{resumen}</p>
        <Rejilla carteles={visibles}/>
      </main>
    </>
  );
}



 