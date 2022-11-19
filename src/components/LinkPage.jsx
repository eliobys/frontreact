import { Link } from "react-router-dom"

const LinkPage = () => {
    return (
        <section>
            <h1>Links</h1>
            <br />
            <h2>Public</h2>
            <Link to="/login">Login</Link>
            <Link to="/register_hacedor">Register cliente</Link>
            <Link to="/register_cliente">Register hacedor</Link>
            <br />
            <h2>Private</h2>
            <Link to="/solicitar_servicio">Go to the solicitar servicio</Link>
            <br />
            <Link to="/consultar_hacedor">Go to the consultar hacedor</Link>
            <br />
            <Link to="/consultar_servicio">Go to the consultar servicio</Link>
        </section>
    )
}

export default LinkPage