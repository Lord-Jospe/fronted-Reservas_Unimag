import "./tableData.css";

type Columna = {
  label: string;     // Lo que se muestra en el encabezado
  field: string;     // La clave del objeto
};

type TableDataProps<T> = {
  columnas: Columna[];
  datos: T[];
};

function TableData<T extends object>({ columnas, datos }: TableDataProps<T>) {
  return (
    <div>
      <table className="table table-striped table-sm">
        <thead>
          <tr>
            {columnas.map((col, idx) => (
              <th key={idx}>{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {datos.map((fila, index) => (
            <tr key={index}>
              {columnas.map((col, idx) => (
                <td key={idx}>
                  {String((fila as any)[col.field]?? "N/A")}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableData;
