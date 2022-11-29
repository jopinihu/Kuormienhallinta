import React, { useState, useEffect } from "react";
import "../style.css";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
// import TableJquery from "./TableJquery";

const AddingLoad = () => {
  // Define variable which used to place the data.
  const initialState = {
    sender: "",
    recipient: "",
    product: "",
    vehicle: "",
    number: "",
    mass: "",
  };
  // Using useState hook than we can place data in the desired variable.
  const [state, setState] = useState(initialState);
  const { sender, recipient, product, vehicle, number, mass } = state;
  // Create variable which use useNavigate hook and let us return in table.
  const history = useNavigate();
  // Create variable which use useParams and let us use id value.
  const { id } = useParams();
  // Gettin data from SQL database and make request using axios.
  useEffect(() => {
    axios
      .get(`http://localhost:3008/api/get/${id}`)
      .then((response) => setState({ ...response.data[0] }));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Using if else statements finding out is there enough data in user input.
    if (!sender || !recipient) {
      alert("Syötä lähettäjä ja vastaanottaja!");
    } else {
      // If there isn't id, the program adds a new row to the table.
      if (!id) {
        axios
          .post("http://localhost:3008/api/insert", {
            sender,
            recipient,
            product,
            vehicle,
            number,
            mass,
          })
          .then(() => {
            setState({
              sender: "",
              recipient: "",
              product: "",
              vehicle: "",
              number: "",
              mass: "",
            });
          })
          .catch((error) => error(error.response.data));
        // If there is id, program edit pointed row, where id is
      } else {
        axios
          .put(`http://localhost:3008/api/update/${id}`, {
            sender,
            recipient,
            product,
            vehicle,
            number,
            mass,
          })
          .then(() => {
            setState({
              sender: "",
              recipient: "",
              product: "",
              vehicle: "",
              number: "",
              mass: "",
            });
          })
          .catch((error) => alert(error.response.data));
      }
    }
    setTimeout(() => history("/Table"), 300);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  return (
    <div className="adding_load" class="table-light container-fluid px-0">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="sender"
          id="sender"
          placeholder="Lähettäjä"
          value={sender || ""}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="recipient"
          id="recipient"
          placeholder="Vastaanottaja"
          value={recipient || ""}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="product"
          id="product"
          placeholder="Tuote"
          value={product || ""}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="vehicle"
          id="vehicle"
          placeholder="Auto"
          value={vehicle || ""}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="number"
          id="number"
          placeholder="Pvm"
          value={number || ""}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="mass"
          id="mass"
          placeholder="Status"
          value={mass || ""}
          onChange={handleInputChange}
        />

        <input
          className="savebutton"
          type="submit"
          value={id ? "Muokkaa" : "Tallenna"}
        />
        <Link to="/Table">
          <input type="button" value="Takaisin" />
        </Link>
      </form>
    </div>
  );
};

export default AddingLoad;
