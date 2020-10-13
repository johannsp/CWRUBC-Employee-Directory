import React from "react";

function FilterForm(props) {
  return (
    <form>
      <div className="form-group">
        <label htmlFor="name_filter">Name filter:</label>
        <input
          onChange={props.handleInputChange}
          value={props.value}
          name="name_filter"
          type="text"
          className="form-control"
          placeholder="Name filter"
          id="name_filter"
        />
        <br />
        <button onClick={props.handleFormSubmit} className="btn btn-primary">
          Filter
        </button>
      </div>
    </form>
  );
}

export default FilterForm;
