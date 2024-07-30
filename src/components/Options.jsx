import { useEffect, useState } from "react";
import Input from "./Input";

function Options({ options, onSelect, showSearch = true }) {
  const [render, setRender] = useState([...options]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (search)
      setRender(
        options.filter((o) =>
          o.title.toLowerCase().includes(search.toLowerCase())
        )
      );
    else setRender(options);
  }, [search, options]);

  return (
    <div className="options">
      {showSearch && (
        <Input value={search} onChange={setSearch} placeholder="Search" />
      )}
      {render.map((o, idx) => (
        <button
          disabled={o.disabled}
          onClick={() =>
            typeof onSelect === "function" ? onSelect(o.value) : null
          }
          className="btn-rm"
          key={idx}
        >
          {o.imageUrl && <img src={o.imageUrl} alt={o.title} />}
          <span className="f600">{o.title}</span>
        </button>
      ))}
    </div>
  );
}

export default Options;
