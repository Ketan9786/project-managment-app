import { Button, Container, Stack, Typography } from "@mui/material"
import Tabel from "../Tabel";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import LogIn from '../LogIn';
export default () => {
    const data = useSelector((state) => state.userLogin);
    return (<>{data.isLoggedIn ? (<Container>
        <Stack>
            <Stack direction="row" justifyContent="space-between">
                <Stack >
                    <Typography variant="h5" component="div">
                        Ketan Kulkarni
                    </Typography>
                    <Typography variant="h5" component="div">
                        kketan482@gmail.com
                    </Typography>
                    <Typography variant="h5" component="div">
                        Reopring to Sunil Kulkarni
                    </Typography>
                </Stack>
                <Button variant="contained" sx={{height:"30px"}}>Edit</Button>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
            <Typography variant="h5" component="div">
                        Total Project : 22
                    </Typography>
                <Link to="/taskform"><Button variant="contained">New Task
                </Button></Link>
            </Stack>
            <Tabel />
        </Stack>
    </Container>):(<LogIn/>)}</>)
}