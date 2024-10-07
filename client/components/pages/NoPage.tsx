import { Link } from "react-router-dom";

export default function NoPage({})
{
    return <>
        <br />
        <section style={{ fontSize: ".75rem" }}>            
            <div className="card">
                <h1>¡Ups! Parece que hay un error en la url.</h1>
                <br />
                <p><strong>Esta sección del sitio no existe.</strong></p>
                <br />
                <p>Intenta volver al inicio haciendo click <Link to="/">aquí</Link>.</p>
            </div>
        </section>
    </>
}