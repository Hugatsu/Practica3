export default function Selector({etiqueta, valor, valorAlCambiar, children}){
    return(
        <label className="filtro">
            <span className="filtro__nombre">{etiqueta}</span>
            <select value={valor} onChange={(evento) => valorAlCambiar(evento.target.value)}>
                {children}
            </select>
        </label>
    );
}