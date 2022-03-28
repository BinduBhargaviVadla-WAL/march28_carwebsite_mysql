import { useState, useEffect } from "react";
import axios from "axios";
const Car = () => {
  let [car, setCar] = useState([]);
  useEffect(() => {
    getCar();
  }, []);
  const getCar = () => {
    axios
      .get("/car")
      .then((res) => {
        console.log(res.data);
        setCar(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  let addCar = (event) => {
    event.preventDefault();
    let Stock = 0;
    let x = event.target.inStock.checked;
    if (x === true) {
      Stock = 1;
    }
    let carObject = {
      CarName: event.target.CarName.value,
      Price: event.target.Price.value,
      Color: event.target.Color.value,
      inStock: Stock,
    };

    console.log(carObject);
    axios
      .post("/car", carObject)
      .then((res) => {
        getCar();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  let deleteCar = (index) => {
    axios
      .delete("/car/" + index)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    getCar();
  };
  const deleteAll = () => {
    axios
      .delete("/car")
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    getCar();
  };
  const updateCar = (item) => {};
  return (
    <div>
      <h1>Car Form</h1>
      <form onSubmit={addCar}>
        <label>Car Name:</label>

        <input type='text' name='CarName' placeholder='Enter Car Name' />
        <br />
        <label>Price</label>

        <input type='number' name='Price' />
        <br />
        <label>Color:</label>

        <select name='Color'>
          <option value='black'>Black</option>
          <option value='blue'>Blue</option>
          <option value='gray'>Gray</option>
        </select>
        <br />
        <label>InStock</label>
        <input type='checkbox' class='switch' name='inStock' id='checkId' />
        <br />
        <button>Add</button>
      </form>
      <h5>
        Delete all Cars Details , Click Here...
        <button onClick={deleteAll} className='delAll'>
          DeleteAll
        </button>
      </h5>

      <table>
        <tr>
          <th>S.No</th>
          <th>Car Name</th>
          <th>Price</th>
          <th>Color</th>
          <th></th>
        </tr>

        {car.length != 0 ? (
          car.map(function (val, index) {
            return (
              <tr>
                <td>{index + 1}</td>
                <td>{val.CarName}</td>
                <td>{val.Price}</td>
                <td>{val.Color}</td>
                <td>
                  <button
                    onClick={() => {
                      deleteCar(val.CarId);
                    }}
                    className='delBtn'
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })
        ) : (
          <h5>No Data Available</h5>
        )}
      </table>
    </div>
  );
};
export default Car;
