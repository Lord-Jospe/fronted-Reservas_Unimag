import "./tableReservation.css";
import React from "react";

type TableReservationProps = {
  columna: Array<string>;
  datos: Array<Array<string | number>>;
};

function TableReservation({ columna, datos }: TableReservationProps) {
  return (
    <div>
      <table className="table table-striped table-sm">
        <thead>
          <tr>
            <th scope="col">#</th>
            {columna.map((col, idx) => (
              <th scope="col" key={idx}>
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {datos.map((fila, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              {fila.map((dato, i) => (
                <td key={i}>{dato}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableReservation;
