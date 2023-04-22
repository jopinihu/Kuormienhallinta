import React, { useState, useEffect } from "react";
import "../style.css";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
// import TableJquery from "./TableJquery";

const Table = () => {
  
  const [data, setData] = useState([]);
  
  const loadData = async () => {
    const response = await axios.get("http://localhost:3008/api/get/");
    setData(response.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const deleteLoad = (id) => {
  
    if (window.confirm("Haluatko varmasti poistaa kuorman?")) {
      axios.delete(`http://localhost:3008/api/delete/${id}`);
      setTimeout(() => loadData(), 400);
    }
  };

  return (
    <div class="container-fluid">
      {/* <form className="table-div"> */}

      <table class="table table-hover table-light table-bordered table-striped table-responsive-stack">
        <thead className="table-header">
          <tr>
            <th scope="col">Lähettäjä</th>
            <th scope="col">Vastaanottaja</th>
            <th scope="col">Tuote</th>
            <th scope="col">Auto</th>
            <th scope="col">Pvm</th>
            <th scope="col">Tilanne</th>
            <th scope="col">Muokkaus</th>
          </tr>
        </thead>
        <tbody className="table-body">
  
          {data.map((val) => {
            return (
              <tr key={val.id} className="table-container">
                <td> {val.sender}</td>

                <td>{val.recipient} </td>

                <td>{val.product}</td>

                <td>{val.vehicle}</td>

                <td>{val.number}</td>

                <td>{val.mass}</td>

                <td className="edit_td">
                  <Link to={`/update/${val.id}`}>
                    <Button>Edit</Button>
                  </Link>
                  <Button
                    type="button"
                    class="btn btn-secondary btn-lg"
                    onClick={() => {
                      deleteLoad(val.id);
                    }}
                  >
                    Poista
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* </form> */}
    </div>
  );
};

export default Table;
