import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from '../MainComponent/Title';


export default function Orders({rows, labels, col_keys, title, actionElement=null}) {
  return (
    <React.Fragment>
      <Title>{title}</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            {labels.map((label, i) => <TableCell key={i}>{label}</TableCell>)}
            {actionElement && <TableCell align={"right"}>Action</TableCell>}

          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              {col_keys.map((key, index) => <TableCell key={index}>{row[key]}</TableCell>)}
              {actionElement && (
                <TableCell align={"right"}>
                  {actionElement}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}