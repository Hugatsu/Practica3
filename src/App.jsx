import Cabecera from "./components/Cabecera";
import Cartel from "./components/Cartel";

const LUFFY = {
  id: 1, nombre: "Monkey D Luffy", recompensa: 3000000000, estado: "Vivo",
  tripulacion: "Straw Hat Pirates", fruta: "Gomu Gomu no Mi", tipoFruta: "Paramecia",
  edad: 19, altura: 174,
};

const CHOPPER = {
  id: 2, nombre: "Tony Tony Chopper", recompensa: 1000, estado: "Vivo",
  tripulación: "Straw Hat Pirates", fruta: "Hito Hito no Mi", tipoFruta: "Zoan",
  edad: 17, altura: 90,
};


export default function App() {
  return (
    <>
      <Cabecera />
      <main>
        <section className="rejilla">
          <Cartel cartel={LUFFY}/>
          <Cartel cartel={CHOPPER}/>
        </section>
      </main>
    </>
  );
}