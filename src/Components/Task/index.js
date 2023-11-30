import { useSelector } from 'react-redux';
import LogIn from '../LogIn';

export default ()=>{
    const data = useSelector((state) => state.userLogin);
    return (<>{data.isLoggedIn? (<>This is task Page</>):(<LogIn/>)}</>)
}