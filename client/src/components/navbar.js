import Token from './token';

const Navbar = (props) => {

    const logout = (ev) => {
        ev.preventDefault();
        Token.remove();
        window.open("/", "_self");
    }

    const BackButton = (back) => {
        if (back.back) {
            return <a className="navbar-brand backButton" href="./boxes">&lt;</a>
        } else {
            return null
        }
    }

    return (
        <nav className="navbar fixed-top navbar-light bg-light" style={{ textAlign: "right" }}>
            <div className="container-fluid justify-content-between">
                <div>
                    <BackButton back={props.back} />
                    <span className="navbar-brand">{props.title}</span>
                </div>
                <a className="navbar-brand" onClick={logout} href="/">Logout</a>
            </div>
        </nav>
    );

}

export default Navbar;