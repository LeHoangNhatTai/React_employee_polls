import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const CheckLogin = ({ children }) => {
    const authedUser = useSelector(state => !state.authedUser);
    const redirectUrl = window.location.href.toString().split(window.location.host)[1];

    return authedUser ? <Navigate to={'/login?redirectTo=' + redirectUrl} /> : children;
}

export default CheckLogin;
