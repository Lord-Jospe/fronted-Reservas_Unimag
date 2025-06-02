import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./tableData.css";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

type Columna = {
  label: string; // Lo que se muestra en el encabezado
  field: string; // La clave del objeto
};

type TableDataProps<T> = {
  columnas: Columna[];
  datos: T[];
  onEditClick?: (item: T) => void;
  elementosPorPagina?: number;
  paginar?: boolean;
};

function TableData<T extends object>({
  columnas,
  datos,
  onEditClick,
  elementosPorPagina = 10,
  paginar = true,
}: TableDataProps<T>) {
  const [paginaActual, setPaginaActual] = useState(1);

  const totalPaginas = Math.ceil(datos.length / elementosPorPagina);

  const datosPaginados = paginar
    ? datos.slice(
        (paginaActual - 1) * elementosPorPagina,
        paginaActual * elementosPorPagina
      )
    : datos;

  const cambiarPagina = (pagina: number) => {
    if (pagina >= 1 && pagina <= totalPaginas) {
      setPaginaActual(pagina);
    }
  };

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
            {datosPaginados.map((fila, index) => (
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
      {paginar && totalPaginas > 1 && (
        <nav className="mt-3 d-flex justify-content-center">
          <ul className="pagination">
            <li className={`page-item ${paginaActual === 1 ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={() => cambiarPagina(paginaActual - 1)}
              >
                Anterior
              </button>
            </li>
            {Array.from({ length: totalPaginas }).map((_, idx) => {
              const numPagina = idx + 1;
              return (
                <li
                  key={numPagina}
                  className={`page-item ${
                    numPagina === paginaActual ? "active" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => cambiarPagina(numPagina)}
                  >
                    {numPagina}
                  </button>
                </li>
              );
            })}
            <li
              className={`page-item ${
                paginaActual === totalPaginas ? "disabled" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() => cambiarPagina(paginaActual + 1)}
              >
                Siguiente
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}

export default TableData;
