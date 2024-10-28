import React from "react";
import { TableRow, TableCell } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";

const TableRowsLoader = ({ rowsNum, cellsNum }) => {
    const rows = Array.from({length: rowsNum});
    const cells = Array.from({length: cellsNum});

    return(
        <>
            {
                rows.map((row, index) => (
                    <TableRow key={`row-loader-${index}`}>
                        {
                            cells.map((cell, indexCell) => (
                                <TableCell key={`cell-loader-${index}-${indexCell}`}>
                                    <Skeleton animation="wave" variant="text" />
                                </TableCell>
                            ))
                        }
                    </TableRow>
                ))
            }
        </>   
    );

  };
  
export default TableRowsLoader;