import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./tableData.css";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

type Columna = {
  label: string; // Lo que se muestra en el encabezado
  field: string; // La clave del objeto
};

type TableDataProps<T> = {
  columnas: Columna[];
  datos: T[];
  onEditClick?: (item: T) => void
};

function TableData<T extends object>({ columnas, datos, onEditClick }: TableDataProps<T>) {
  return (
    <div className="table-container container-fluid mt-4">
      <div className="table-responsive shadow rounded">
        <table className="table table-hover table-striped align-middle mb-0">
          <thead className="table-dark">
            <tr>
              {columnas.map((col, idx) => (
                <th key={idx} scope="col">
                  {col.label}
                </th>
              ))}
              <th scope="col">Editar</th>
            </tr>
          </thead>
          <tbody>
            {datos.map((fila, index) => (
              <tr key={index}>
                {columnas.map((col, idx) => (
                  <td key={idx}>{String((fila as any)[col.field] ?? "N/A")}</td>
                ))}
                <td>
                  <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => onEditClick?.(fila)}
                    title="Editar"
                  >
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TableData;
