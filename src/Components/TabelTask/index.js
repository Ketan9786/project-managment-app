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
function createData(title, id, assignee, deadline, priority, status) {
  return { title, id, assignee, deadline, priority, status };
}

const initialRows = [
  createData('Frozen yoghurt', 'FYO01', "Ketan Kulkarni", "30/11/2023", "p1", "In Progress"),
  createData('Ice cream sandwich', 'ICS02', "Ketan Kulkarni", "30/11/2023", "p1", "In Progress"),
  createData('Eclair Eclair', 'EEC02', "Ketan Kulkarni", "30/11/2023", "p2", "In Progress"),
  createData('Cupcake Cupcake', 'CUP01', "Ketan Kulkarni", "30/11/2023", "p2", "In Progress"),
  createData('Gingerbread', 'GIN01', "Ketan Kulkarni", "30/11/2023", "p2", "In Progress"),
  createData('ketab Kulk', 'KKU01', "Ketan Kulkarni", "30/11/2023", "p3", "In Progress"),
  createData('SUNIL KUL', 'SKU01', "Ketan Kulkarni", "30/11/2023", "p2", "In Progress"),
];

export default () => {
  const [rows, setRows] = React.useState(initialRows);
  const [editingRow, setEditingRow] = React.useState(null);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const handleEditClick = (id) => {
    console.log(id)
    setEditingRow(id);
  };

  const handleSaveClick = (id) => {

    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === id
          ? {
            ...row,

          }
          : row
      )
    );
    setEditingRow(null);
  };

  const handleEditChange = (e, id, field) => {
    const value = e.target.value;
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === id ? { ...row, [field]: value } : row
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
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {rows
              
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
        
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {editingRow === row.id ? (
                  <input
                    type="text"
                    value={row.title}
                    onChange={(e) => handleEditChange(e, row.id, 'project')}
                  />
                ) : (
                  row.title
                )}
              </TableCell>
              <TableCell align="right">
                {row.id}
              </TableCell>
              <TableCell align="right">  {editingRow === row.id ? (
                <input
                  type="text"
                  value={row.assignee}
                  onChange={(e) => handleEditChange(e, row.id, 'projectHead')}
                />
              ) : (
                row.assignee
              )}</TableCell>
              <TableCell align="right">{editingRow === row.id ? (
                <input
                  type="text"
                  value={row.deadline}
                  onChange={(e) => handleEditChange(e, row.id, 'tasks')}
                />
              ) : (
                row.deadline
              )}</TableCell>
              <TableCell align="right">{editingRow === row.id ? (
                <input
                  type="text"
                  value={row.priority}
                  onChange={(e) => handleEditChange(e, row.id, 'pendingtask')}
                />
              ) : (
                row.priority
              )}</TableCell>
              <TableCell align="right">{editingRow === row.id ? (
                <input
                  type="text"
                  value={row.status}
                  onChange={(e) => handleEditChange(e, row.id, 'pendingtask')}
                />
              ) : (
                row.status
              )}</TableCell>
              <TableCell align="right">
                {editingRow === row.id ? (
                  <Button onClick={() => handleSaveClick(row.id)}>Save</Button>
                ) : (
                  <Button onClick={() => handleEditClick(row.id)}>Edit</Button>
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
