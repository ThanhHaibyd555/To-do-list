import { useState } from "react"

function Form({addTask}) {
    const [name,setName] = useState("Use hooks!")

    function handleChange(e) {
        setName(e.target.value);
        console.log("type")
      }
    
      function handleSubmit(e) {
        e.preventDefault();
        addTask(name);
        setName("");
      }
    return (
        <form className="form" onSubmit={handleSubmit}>
        <h3 className="text_primary">What needs to be done ?</h3>
        <div className="center_input_add">
          <div className="input_add">
            <input className="input_field" type="text" onChange={handleChange }  />
            <button type="submit" className="btn_add" >
              Add
            </button>
          </div>
        </div>
      </form>
    )
}

export default Form
