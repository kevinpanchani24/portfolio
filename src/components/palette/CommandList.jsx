function CommandItem({ cmd, i, header, active, onHover, onRun }) {
  return (
    <li role="presentation">
      {header && <p className="palette-group">{header}</p>}
      <button
        id={`cmd-${i}`}
        role="option"
        aria-selected={active}
        className={`palette-item ${active ? 'is-active' : ''}`}
        onMouseEnter={onHover}
        onClick={onRun}
        tabIndex={-1}
      >
        {cmd.label}
      </button>
    </li>
  );
}

export default function CommandList({ results, palette }) {
  if (!results.length) {
    return <ul id="palette-list" className="palette-list" role="listbox"><li className="palette-empty">No matches. Try “projects” or “contact”.</li></ul>;
  }
  return (
    <ul id="palette-list" className="palette-list" role="listbox">
      {results.map((c, i) => (
        <CommandItem
          key={c.label}
          cmd={c}
          i={i}
          header={i === 0 || results[i - 1].group !== c.group ? c.group : null}
          active={i === palette.active}
          onHover={() => palette.setActive(i)}
          onRun={() => palette.run(c)}
        />
      ))}
    </ul>
  );
}
