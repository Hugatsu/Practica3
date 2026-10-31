import {formatearBerries} from "../transform.js"

const BANDERA_PIRATA = "\u{1F3F4}\u200D\u2620\uFE0F"

const iniciales = (nombre) =>
  nombre
    .split("/")[0]
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((palabra) => palabra[0].toUpperCase())
    .join("");

export default function Cartel({cartel}){
    const {nombre, recompensa, estado, tripulacion, fruta, tipoFruta, edad, altura} = cartel;

    return(
        <article className="cartel">
        <p className="cartel__titulo">SE BUSCA</p>
        <div className="cartel__retrato">{iniciales(nombre)}</div>
        <h2 className="cartel__nombre">{nombre}</h2>
        <p className="cartel__recompensa">{formatearBerries(recompensa)}</p>
        <span className={`cartel__estado cartel__estado--${estado.toLowerCase()}`}>{estado}</span>

        <ul className="cartel__datos">
            {tripulacion && <li>{BANDERA_PIRATA} {tripulacion}</li>}
            {fruta && <li>🍎 {fruta}{tipoFruta && ` (${tipoFruta})`}</li>}
            {edad !== null && <li>{edad} años</li>}
            {altura !== null && <li>{altura} cm</li>}
        </ul>
        </article>
    );
}


