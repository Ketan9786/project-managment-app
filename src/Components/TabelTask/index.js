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

export default ({pData}) => {
  const [rows, setRows] = React.useState([]);
  const [editingRow, setEditingRow] = React.useState(null);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  //data from redux store
  const dispatch = useDispatch();
  const data = useSelector((state) => state.projectData);


  React.useEffect(() => {
    console.log(pData.tasks)
    dispatch(fetchProject())
  }, [])

  const handleEditClick = (key) => {
    setRows(pData.tasks)
    setEditingRow(key);
  };

  const handleSaveClick = (key) => {
    console.log(rows);
    setEditingRow(null);
  };

  const handleEditChange = (e, key, field) => {
    setRows(data.data)
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
            <TableCell>Title</TableCell>
            <TableCell align="right">id</TableCell>
            <TableCell align="right">Assignee</TableCell>
            <TableCell align="right">Deadline</TableCell>
            <TableCell align="right">priority</TableCell>
            <TableCell align="right">status</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {pData.tasks

            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row,idx) => (

              <TableRow
                key={row.title + idx}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {editingRow === row.title + idx ? (
                    <input
                      type="text"
                      defaultValue={row.title}
                      onChange={(e) => handleEditChange(e, row.title + idx, 'title')}
                    />
                  ) : (
                    row.title
                  )}
                </TableCell>
                <TableCell component="th" scope="row">
                 
                    {row.id}
                 
                </TableCell>
                <TableCell align="right">  {editingRow === row.title + idx ? (
                  <input
                    type="text"
                    defaultValue={row.assignee
                    }
                    onChange={(e) => handleEditChange(e, row.title + idx, 'assignee')}
                  />
                ) : (
                  row.assignee

                )}</TableCell>
                <TableCell align="right">{editingRow === row.title + idx ? (
                  <input
                    type="text"
                    defaultValue={row.deadline}
                    onChange={(e) => handleEditChange(e, row.title + idx, 'deadline')}
                  />
                ) : (
                  row.deadline
                )}</TableCell>
                <TableCell align="right">{editingRow === row.title + idx ? (
                  <input
                    type="text"
                    defaultValue={row.priority}
                    onChange={(e) => handleEditChange(e, row.title + idx, 'priority')}
                  />
                ) : (
                  row.priority
                )}</TableCell>

                <TableCell align="right">
                  {editingRow === row.title + idx ? (
                    <select
                      // value={row.status}
                      onChange={(e) => handleEditChange(e, row.title + idx, 'status')}
                    >
                     <option value="open">Open</option>
                      <option value="inProgress">In Progress</option>
                      <option value="pending">Pending</option>
                      <option value="resolved">Resolved</option>
                    </select>
                  ) : (
                    row.status
                  )}
                </TableCell>

                <TableCell align="right">
                  {editingRow === row.title + idx ? (
                    <Button onClick={() => handleSaveClick(row.title + idx)}>Save</Button>
                  ) : (
                    <Button onClick={() => handleEditClick(row.title + idx)}>Edit</Button>
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
      count={pData.tasks.length}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  </div>
  );
};
