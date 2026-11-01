import Cartel from "./Cartel";

export default function Rejilla({carteles}){
    return(
        <section className="rejilla">
            {carteles.map((c) => (
                <Cartel key={c.id} cartel={c}/>
            ))}
        </section>
    );
}