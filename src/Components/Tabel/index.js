import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TablePagination from '@mui/material/TablePagination';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProject } from "../../redux/slice/projectData";
import { fetchUsers } from "../../redux/slice/userData";
export default () => {
  const [rows, setRows] = React.useState([]);
  const [editingRow, setEditingRow] = React.useState(null);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  //data from redux store
  const dispatch = useDispatch();
  const data = useSelector((state) => state.projectData);
 

  React.useEffect(()=>{
    dispatch(fetchProject())
  },[])

  const handleEditClick = (key) => {
    console.log(key)
    setEditingRow(key);
  };

  const handleSaveClick = (key) => {
    
    setEditingRow(null);
  };

  const handleEditChange = (e, key, field) => {
    const value = e.target.value;
    setRows((prevRows) =>
      prevRows.map((row) =>
        row._id === key ? { ...row, [field]: value } : row
      )
    );
  };
  const handleChangePage = (event, newPage) => {
    console.log(newPage);
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (data.isLoading) {
    
    return <h1>isLoading ...</h1>
  }

  return (<div style={{ display: "flex", alignItems: 'center', flexDirection: "column" }}>

    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Project</TableCell>
            <TableCell align="right">key</TableCell>
            <TableCell align="right">Project Head</TableCell>
            <TableCell align="right">Tasks</TableCell>
            <TableCell align="right">Pending Task</TableCell>
            <TableCell align="right">Completed Task</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.data

            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row) => (

              <TableRow
                key={row._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {editingRow === row._id ? (
                    <input
                      type="text"
                      defaultValue={row.title}
                      onChange={(e) => handleEditChange(e, row._id, 'title')}
                    />
                  ) : (
                    row.title
                  )}
                </TableCell>
                <TableCell component="th" scope="row">
                  {editingRow === row._id ? (
                    <input
                      type="text"
                      defaultValue={row.id}
                      onChange={(e) => handleEditChange(e, row._id, 'title')}
                    />
                  ) : (
                    row.id
                  )}
                </TableCell>
                <TableCell align="right">  {editingRow === row._id ? (
                  <input
                    type="text"
                    defaultValue={row.projectLead
                    }
                    onChange={(e) => handleEditChange(e, row._id, 'projectLead')}
                  />
                ) : (
                  row.projectLead

                )}</TableCell>
                <TableCell align="right">{editingRow === row._id ? (
                  <input
                    type="text"
                    defaultValue={row.taskInProject}
                    onChange={(e) => handleEditChange(e, row._id, 'taskInProject')}
                  />
                ) : (
                  row.taskInProject
                )}</TableCell>
                <TableCell align="right">{editingRow === row._id ? (
                  <input
                    type="text"
                    defaultValue={row.pendingTask}
                    onChange={(e) => handleEditChange(e, row._id, 'pendingTask')}
                  />
                ) : (
                  row.pendingTask
                )}</TableCell>

                <TableCell align="right">{editingRow === row._id ? (
                  <input
                    type="text"
                    defaultValue={row.pendingTask}
                    onChange={(e) => handleEditChange(e, row._id, 'pendingTask')}
                  />
                ) : (
                  row.pendingTask
                )}</TableCell>
                <TableCell align="right">{editingRow === row._id ? (
                  <input
                    type="text"
                    defaultValue={row.status}
                    onChange={(e) => handleEditChange(e, row._id, 'pendingTask')}
                  />
                ) : (
                  row.status
                )}</TableCell>
                <TableCell align="right">
                  {editingRow === row._id ? (
                    <Button onClick={() => handleSaveClick(row._id)}>Save</Button>
                  ) : (
                    <Button onClick={() => handleEditClick(row._id)}>Edit</Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>

    <TablePagination
      rowsPerPageOptions={[5, 10, 25]}
      component="div"
      count={rows.length}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  </div>
  );
};
