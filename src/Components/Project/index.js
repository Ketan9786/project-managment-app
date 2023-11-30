import { Button, Container, Stack, Typography } from "@mui/material"
import TabelTask from "../TabelTask";
import LogIn from "../LogIn";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
export default () => {
    const data = useSelector((state) => state.userLogin);
    return (<>
        {data.isLoggedIn ? (<Container>
            <Stack>
                <Stack direction="row" justifyContent="space-between">
                    <Typography variant="h5" component="div">
                        Ketan Co Ltd
                    </Typography>
                    <Button variant="contained">Edit</Button>
                </Stack>
                <Typography variant="p" component="p">
                    is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a

                </Typography>
                <Stack direction="row" justifyContent="space-between">
                    <Typography variant="h5" component="div">
                        Task in Tasks :22
                    </Typography>
                    <Link to="/taskform"><Button variant="contained">New Task
                    </Button></Link>

                </Stack>
                <TabelTask />
            </Stack>
        </Container>) : (<LogIn />)}
    </>)
}