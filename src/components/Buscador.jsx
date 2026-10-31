export default function Buscador({valor, valorAlCambiar}){
    return(
        <input
            type="search"
            className="controles_busqueda"
            placeholder="Buscar personaje..."
            aria-label="Buscar personaje"
            autoComplete="on"
            value={valor}
            onChange={(evento) => valorAlCambiar(evento.target.value)}
        />
    );
}