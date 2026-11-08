import { createElement } from 'react';

// Builds the <input> or <textarea> for a field.
function control(config, form, errorId) {
  const { name, as = 'input', type = 'text', autoComplete, placeholder } = config;
  return createElement(as, {
    id: `f-${name}`,
    name,
    type: as === 'input' ? type : undefined,
    rows: as === 'textarea' ? 5 : undefined,
    value: form.values[name],
    onChange: form.onChange,
    autoComplete,
    placeholder,
    required: true,
    'aria-invalid': Boolean(errorId),
    'aria-describedby': errorId,
  });
}

// One labelled form field. `config` describes the field; `form` holds values, errors and onChange.
export default function Field({ config, form }) {
  const id = `f-${config.name}`;
  const error = form.errors[config.name];
  const errorId = error ? `${id}-err` : undefined;
  return (
    <div className={`field ${error ? 'has-error' : ''}`}>
      <label htmlFor={id}><span aria-hidden="true">$ </span>{config.label}</label>
      {control(config, form, errorId)}
      {error && <p className="field-error" id={errorId}>{error}</p>}
    </div>
  );
}
