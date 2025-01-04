
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import loadingLottie from '../assets/loading-animation.json'
import Lottie from "lottie-react";


const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);

    const location = useLocation();


    if (loading) {
        return <Lottie style={{ width: '100px', marginLeft: 'auto', marginRight: 'auto' }} animationData={loadingLottie} />
    }

    if (user) {
        return children;
    }

    return (
        <Navigate to='/login' state={{ from: location }} replace></Navigate>
    );
};

PrivateRoute.propTypes = {
    children: PropTypes.node
}

export default PrivateRoute;