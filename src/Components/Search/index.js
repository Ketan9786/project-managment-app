import Input from '@mui/material/Input';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
export default () => {

    return (<div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
        <Input type="search" sx={{border:"1px solid",borderRadius:"8px"}} /> 
        <IconButton aria-label="delete">
        <SearchIcon  size ="large"/>
      </IconButton>
    </div>)
}