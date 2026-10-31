import { useState } from "react";
import Cabecera from "./components/Cabecera";
import Rejilla from "./components/Rejilla";
import Buscador from "./components/Buscador";
import { CARTELES_PRUEBA } from "./datosDePrueba";
import { recompensaTotal, formatearBerries } from "./transform";

export default function App() {
  const [busqueda, setBusqueda] = useState("");

  const texto = busqueda.trim().toLowerCase();
  const visibles = CARTELES_PRUEBA.filter((c) => c.nombre.toLowerCase().includes(texto));
  const resumen = `${visibles.length} personajes ///// Recompensa de: ${formatearBerries(recompensaTotal(visibles))}`;

  return (
    <>
      <Cabecera />

      <form className="controles" onSubmit={(evento) => evento.preventDefault()}>
        <fieldset>
          <Buscador valor = {busqueda} valorAlCambiar={setBusqueda}/>
        </fieldset>
      </form>

      <main>
        <p className="resumen">{resumen}</p>
        <Rejilla carteles={visibles}/>
      </main>
    </>
  );
}



 