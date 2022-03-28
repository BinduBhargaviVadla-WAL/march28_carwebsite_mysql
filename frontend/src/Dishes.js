import { useState, useEffect } from "react";
import axios from "axios";
const Dishes = () => {
  let [state, setState] = useState(false);
  let [data, setData] = useState({});
  let [dishes, setDishes] = useState([]);
  let [category, setCategory] = useState([]);
  let [name, setName] = useState();
  let [description, setDescription] = useState();
  let [price, setPrice] = useState();
  useEffect(() => {
    getDishes();
  }, []);
  const getDishes = () => {
    console.log("get Dishes");
    axios
      .get("/dishes")
      .then((res) => {
        console.log(res.data);
        setDishes(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get("/category")
      .then((res) => {
        console.log(res.data);
        setCategory(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    setName("");
    setDescription("");
    setPrice("");
  };
  let addDishes = (event) => {
    event.preventDefault();
    let dishesObject = {
      name: event.target.name.value,
      description: event.target.description.value,
      price: event.target.price.value,
      CategoryId: event.target.category.value,
    };
    console.log(dishesObject);
    axios
      .post("/dishes", dishesObject)
      .then((res) => {
        getDishes();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  let deleteDishes = (index) => {
    console.log(index);
    axios
      .delete("/dishes/" + index)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    getDishes();
  };
  const deleteAll = () => {
    axios
      .delete("/dishes")
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    getDishes();
  };

  const editDishes = (value) => {
    console.log(value);
    setState(true);
    setData(value);
    setName(value.name);
    setDescription(value.description);
    setPrice(value.price);
  };
  const updateDishes = (event) => {
    event.preventDefault();
    let dishesObject = {
      name: event.target.name.value,
      description: event.target.description.value,
      price: event.target.price.value,
      CategoryId: event.target.category.value,
    };
    axios.put(`/dishes/${data.DishId}`, dishesObject).then((res) => {
      getDishes();
      setState(false);
      console.log(res.data);
    });
    getDishes();
  };
  return (
    <div className='container'>
      <h1>Dishes</h1>
      {state ? (
        <form onSubmit={updateDishes}>
          <input
            type='text'
            name='name'
            placeholder={data.name}
            id='nameInput'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type='text'
            name='price'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <br />
          <select name='category' id='categoryUpdate'>
            <option value='Select'>Select</option>
            {category.map((val) => {
              return (
                <>
                  {val.CategoryId === data.CategoryId ? (
                    <option value={val.CategoryId} selected>
                      {val.Name}
                    </option>
                  ) : (
                    <option value={val.CategoryId}>{val.Name}</option>
                  )}
                </>
              );
            })}
          </select>
          <textarea
            name='description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <button>Update</button>
        </form>
      ) : (
        <form onSubmit={addDishes}>
          <input type='text' name='name' placeholder='Enter Category Name' />
          <input type='text' name='price' placeholder='Enter Price' />
          <br />
          <select name='category' id='category'>
            <option value='Select'>Select</option>
            {category.map((val) => {
              return <option value={val.CategoryId}>{val.Name}</option>;
            })}
          </select>
          <textarea
            name='description'
            placeholder='Enter Description'
          ></textarea>
          <button>Add</button>
        </form>
      )}

      <h5>
        Delete All Dishes, Click Here...
        <button onClick={deleteAll} className='delAll'>
          DeleteAll
        </button>
      </h5>

      <table>
        <tr>
          <th>S.No</th>
          <th>Name</th>
          <th>Description</th>
          <th>Price</th>
          <th></th>
          <th></th>
        </tr>

        {dishes !== undefined ? (
          dishes.map(function (val, index) {
            return (
              <tr>
                <td>{index + 1}</td>
                <td>{val.name}</td>
                <td>{val.description}</td>
                <td>{val.price}</td>
                <td>
                  <button
                    onClick={() => deleteDishes(val.DishId)}
                    className='delBtn'
                  >
                    Delete
                  </button>
                </td>
                <td>
                  <button onClick={() => editDishes(val)} className='delBtn'>
                    Update
                  </button>
                </td>
              </tr>
            );
          })
        ) : (
          <tr>
            <td>No Data Available</td>
          </tr>
        )}
      </table>
    </div>
  );
};
export default Dishes;
