const Alert = (props) => {

    return (<div className={`alert alert-${props.variant}`} style={{position: "fixed", top: 0, left: 0}}>
            {props.children}
    </div>);
}

export default Alert;