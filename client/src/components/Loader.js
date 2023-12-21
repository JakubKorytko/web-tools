import { Rings } from 'react-loader-spinner'

const Loader = () => {
        return (
            <div style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Rings
                    height="200"
                    width="200"
                    color='grey'
                    ariaLabel='loading'
                />
            </div>
        );
}

export default Loader;