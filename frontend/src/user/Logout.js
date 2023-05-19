import {Navigate} from "react-router-dom";

function Logout({setToken}) {
    // unset token to log out
    setToken(null);
    return <Navigate to="/" replace={true} />;
}

export default Logout;