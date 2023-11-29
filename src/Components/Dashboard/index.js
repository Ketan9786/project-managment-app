import { Button, Container, Stack, Typography } from "@mui/material";
import Search from "../Search";
import { Link } from "react-router-dom";
import Tabel from "../Tabel";
export default ()=>{

    return (<Container>
        <Stack direction="column">
        <Typography variant="h5" component="h5">
            Total project : 22
        </Typography>
        <Stack  direction="row" justifyContent="space-between">
            <Search/>
           <Link to="/projectform"> <Button variant="contained">Create Project</Button></Link>

        
        </Stack>
        <Typography component="div" sx={{marginTop:"30px"}}></Typography>
        <Tabel/>
        </Stack>
        
    </Container>)
}