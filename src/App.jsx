import { useEffect, useState } from "react";
import Cabecera from "./components/Cabecera";
import Rejilla from "./components/Rejilla";
import Filtros from "./components/Filtros";
import Aviso from "./components/Aviso";
import { obtenerPersonajes } from "./api";
import { prepararCarteles, aplicarFiltros, ordenarCarteles, valoresUnicos, recompensaTotal, formatearBerries } from "./transform";

const FILTROS_INICIALES = {nombre: "", tripulacion: "", estado: "todos", recompensa: "con", fruta: "todos", orden: "recompensa"};

export default function App() {

  const [carteles, setCarteles] = useState(null);
  const [error, setError] = useState(null);
  const [intento, setIntento] = useState(0);
  const [filtros, setFiltros] = useState(FILTROS_INICIALES);

  // EFECTO: pedir los piratas a la API al empezar y en cada reintento
  useEffect(() => {
    const controlador = new AbortController();

    async function cargar() {
      try {
        const personajes = await obtenerPersonajes(controlador.signal);
        if(controlador.signal.aborted) return;
        setCarteles(prepararCarteles(personajes));
      } catch (e) {
        if (!controlador.signal.aborted) setError(e.message);
      }
    }

    cargar();
    return () => controlador.abort(); // Cancela la petición si ya no hace falta
  }, [intento]);

  function reintentar() {
    setError(null);
    setIntento((n) => n + 1);
  }

  function cambiarFiltro(campo, valor){
    setFiltros((anteriores) => ({...anteriores, [campo]: valor}));
  }

  const cargando = carteles === null && error === null;
  const todos = carteles ?? [];
  const tripulaciones = valoresUnicos(todos, "tripulacion");
  const tiposFruta = valoresUnicos(todos, "tipoFruta")
  const visibles = ordenarCarteles(aplicarFiltros(todos, filtros), filtros.orden)
  const resumen = `${visibles.length} personajes ///// Recompensa de: ${formatearBerries(recompensaTotal(visibles))}`;

   // RENDERIZADO CONDICIONAL: decidimos qué va en <main>
  let contenido;
  if (error) {
    contenido = <Aviso mensaje={`⚠ No se pudo contactar con la Marina (${error})`} alReintentar={reintentar} />;
  } else if (cargando) {
    contenido = <Aviso mensaje="⏳ Buscando piratas por la Grand Line…" />;
  } else if (visibles.length === 0) {
    contenido = <Aviso mensaje="🧭 Ningún pirata coincide con la búsqueda y los filtros." />;
  } else {
    contenido = (
      <>
        <p className="resumen">{resumen}</p>
        <Rejilla carteles={visibles} />
      </>
    );
  }


  return (
    <>
      <Cabecera />
      <Filtros
        filtros={filtros}
        valorAlCambiar={cambiarFiltro}
        valorAlLimpiar={() => setFiltros(FILTROS_INICIALES)}
        tripulaciones={tripulaciones}
        tiposFruta={tiposFruta}
        desactivado={cargando || error != null}
      />

      <main>
        {contenido}
      </main>
    </>
  );
}
