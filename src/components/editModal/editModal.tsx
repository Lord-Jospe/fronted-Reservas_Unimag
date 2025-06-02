// src/components/EditModal.ts
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import ReactDOMServer from 'react-dom/server';

const MySwal = withReactContent(Swal);

type EditModalProps<T> = {
  title?: string;
  fields: { label: string; field: keyof T; type?: string }[];
  item: T;
  onConfirm: (updatedItem: T) => void;
};

function EditModal<T extends object>({ title = "Editar", fields, item, onConfirm }: EditModalProps<T>) {
  const formHtml = ReactDOMServer.renderToString(
    <form id="edit-form">
      {fields.map((f, idx) => (
        <div key={idx} className="mb-2 text-start">
          <label className="form-label fw-bold">{f.label}</label>
          <input
            className="form-control"
            type={f.type || "text"}
            id={`field-${String(f.field)}`}
            defaultValue={String(item[f.field])}
          />
        </div>
      ))}
    </form>
  );

  MySwal.fire({
    title: <p>{title}</p>,
    html: formHtml,
    showCancelButton: true,
    confirmButtonText: 'Guardar',
    cancelButtonText: 'Cancelar',
    preConfirm: () => {
      const updatedItem = { ...item };
      fields.forEach(f => {
        const input = document.getElementById(`field-${String(f.field)}`) as HTMLInputElement;
        if (input) updatedItem[f.field] = input.value as any;
      });
      return updatedItem;
    }
  }).then(result => {
    if (result.isConfirmed && result.value) {
      onConfirm(result.value);
    }
  });

  return null; // Este componente no renderiza nada directamente
}

export default EditModal;
