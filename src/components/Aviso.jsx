export default function Aviso({ mensaje, alReintentar }) {
  return (
    <div className={alReintentar ? "estado estado--error" : "estado"}>
      <p>{mensaje}</p>
      {alReintentar && (
        <button type="button" className="boton" onClick={alReintentar}>
          Reintentar
        </button>
      )}
    </div>
  );
}