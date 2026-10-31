import Cabecera from "./components/Cabecera";
import Rejilla from "./components/Rejilla";
import { CARTELES_PRUEBA } from "./datosDePrueba";

export default function App() {
  return (
    <>
      <Cabecera />
      <main>
        <Rejilla carteles={CARTELES_PRUEBA}/>
      </main>
    </>
  );
}



 