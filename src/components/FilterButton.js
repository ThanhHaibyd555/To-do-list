function FilterButton({ name, isPressed, setFilter }) {
  return (
    <button className="btn btn_toggle" type="button" aria-pressed={isPressed} onClick={()=>setFilter(name)}>
      <span className="visually_hidden">Show</span> {name}
      <span className="visually_hidden"> tasks</span>
    </button>
  );
}

export default FilterButton;
