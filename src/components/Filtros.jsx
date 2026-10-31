import Buscador from "./Buscador";
import Selector from "./Selector";

export default function Filtros({filtros, valorAlCambiar, valorAlLimpiar, tripulaciones, tiposFruta}){
    return(
        <form className="controles" onSubmit={(evento) => evento.preventDefault()}>
            <fieldset>
                <Buscador valor = {filtros.nombre} valorAlCambiar = {(valor) => valorAlCambiar("nombre", valor)}/>

                <div className="controles__filtros">
                    <label className="filtro">
                        <span className="filtro__nombre">Tripulación</span>
                        <input
                            type="search"
                            list="tripulaciones"
                            placeholder="Escribe la tripulación…"
                            autoComplete="off"
                            value={filtros.tripulacion}
                            onChange={(evento) => valorAlCambiar("tripulacion", evento.target.value)}
                        />
                        <datalist id="tripulaciones">
                            {tripulaciones.map((t) => (<option key={t} value={t} />))}
                        </datalist>
                    </label>

                    <Selector etiqueta="Estado" valor={filtros.estado} valorAlCambiar={(valor) => valorAlCambiar("estado", valor)}>
                        <option value="todos">Todos</option>
                        <option value="Vivo">Vivos</option>
                        <option value="Fallecido">Fallecidos</option>
                        <option value="Desconocido">Desconocidos</option>
                    </Selector>

                    <Selector etiqueta="Recompensa" valor={filtros.recompensa} valorAlCambiar={(valor) => valorAlCambiar("recompensa", valor)}>
                        <option value="con">Con recompensa</option>
                        <option value="sin">Sin recompensa</option>
                        <option value="todos">Todos</option>
                    </Selector>

                    <Selector etiqueta="Fruta del diablo" valor={filtros.fruta} valorAlCambiar={(valor) => valorAlCambiar("fruta", valor)}>
                        <option value="todos">Todos</option>
                        <option value="con">Con fruta</option>
                        <option value="sin">Sin fruta</option>
                        <optgroup label="Tipo de fruta">
                            {tiposFruta.map((tipo) => (
                                <option key={tipo} value={tipo}>{tipo}</option>
                            ))}
                        </optgroup>
                    </Selector>

                    <Selector etiqueta="Ordenar por" valor={filtros.orden} valorAlCambiar={(valor) => valorAlCambiar("orden", valor)}>
                        <option value="recompensa">Mayor recompensa</option>
                        <option value="nombre">Nombre (A-Z)</option>
                        <option value="edad">Mayor edad</option>
                        <option value="altura">Mayor altura</option>
                    </Selector>
                </div>

                <button type="button" className="boton boton--secundario" onClick={valorAlLimpiar}>
                    Limpiar Filtros
                </button>
            </fieldset>
        </form>
    );
}