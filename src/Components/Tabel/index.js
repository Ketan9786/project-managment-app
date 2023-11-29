import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

function createData(project, key, projectHead, tasks, pendingtask, completedtask) {
  return { project, key, projectHead, tasks, pendingtask, completedtask };
}

const initialRows = [
  createData('Frozen yoghurt', 'FYO', 6.0, 24, 4.0, 2),
  createData('Ice cream sandwich', 'ICS', 9.0, 37, 4.3, 2),
  createData('Eclair Eclair', 'EEC', 16.0, 24, 6.0, 2),
  createData('Cupcake Cupcake', 'CUP', 3.7, 67, 4.3, 3),
  createData('Gingerbread', 'GIN', 16.0, 49, 3.9, 1),
  createData('Gingerbread', 'GIN', 16.0, 49, 3.9, 1),
  createData('Gingerbread', 'GIN', 16.0, 49, 3.9, 1),
];

export default () => {
  const [rows, setRows] = React.useState(initialRows);
  const [editingRow, setEditingRow] = React.useState(null);

  const handleEditClick = (key) => {
    console.log(key)
    setEditingRow(key);
  };

  const handleSaveClick = (key) => {
   
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.key === key
          ? {
              ...row,
              
            }
          : row
      )
    );
    setEditingRow(null);
  };

  const handleEditChange = (e, key, field) => {
    const value = e.target.value;
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.key === key ? { ...row, [field]: value } : row
      )
    );
  };

  return (
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
          {rows.map((row) => (
            <TableRow
              key={row.key}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {editingRow === row.key ? (
                  <input
                    type="text"
                    value={row.project}
                    onChange={(e) => handleEditChange(e, row.key, 'project')}
                  />
                ) : (
                  row.project
                )}
              </TableCell>
              <TableCell align="right">
                {row.key}
               </TableCell>
              <TableCell align="right">  {editingRow === row.key ? (
                  <input
                    type="text"
                    value={row.projectHead}
                    onChange={(e) => handleEditChange(e, row.key, 'projectHead')}
                  />
                ) : (
                  row.projectHead
                )}</TableCell>
              <TableCell align="right">{editingRow === row.key ? (
                  <input
                    type="text"
                    value={row.tasks}
                    onChange={(e) => handleEditChange(e, row.key, 'tasks')}
                  />
                ) : (
                  row.tasks
                )}</TableCell>
              <TableCell align="right">{editingRow === row.key ? (
                  <input
                    type="text"
                    value={row.pendingtask}
                    onChange={(e) => handleEditChange(e, row.key, 'pendingtask')}
                  />
                ) : (
                  row.pendingtask
                )}</TableCell>
              <TableCell align="right">{editingRow === row.key ? (
                  <input
                    type="text"
                    value={row.completedtask}
                    onChange={(e) => handleEditChange(e, row.key, 'pendingtask')}
                  />
                ) : (
                  row.completedtask
                )}</TableCell>
              <TableCell align="right">
                {editingRow === row.key ? (
                  <Button onClick={() => handleSaveClick(row.key)}>Save</Button>
                ) : (
                  <Button onClick={() => handleEditClick(row.key)}>Edit</Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
