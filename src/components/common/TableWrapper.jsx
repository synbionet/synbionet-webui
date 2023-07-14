import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'

export function TableWrapper({ rows = [], onClick }) {
  return (
    <TableContainer>
      <Table aria-labelledby="tableTitle" size={'medium'}>
        <TableBody>
          {rows.map((row, index) => {
            return (
              <TableRow
                hover
                onClick={() => (onClick ? onClick(index) : {})} // to avoid index 0 as false
                role="checkbox"
                tabIndex={-1}
                key={index}
                sx={{ cursor: onClick ? 'pointer' : 'normal' }}
              >
                {row?.customComponent ? (
                  <TableCell component="th" scope="row">
                    <row.customComponent />
                  </TableCell>
                ) : (
                  <TableCell component="th" scope="row">
                    <div className="font-semibold pb-2">{row.label}</div>
                    <div>{row.secondary}</div>
                  </TableCell>
                )}
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
