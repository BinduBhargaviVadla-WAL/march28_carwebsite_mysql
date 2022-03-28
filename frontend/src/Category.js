import { useState, useEffect } from "react";
import axios from "axios";
const Category = () => {
  let [state, setState] = useState(false);
  let [data, setData] = useState({});
  let [category, setCategory] = useState([]);
  let [name, setName] = useState();
  let [description, setDescription] = useState();
  useEffect(() => {
    getCategory();
  }, []);
  const getCategory = () => {
    console.log("get Category");
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
  };
  let addCategory = (event) => {
    event.preventDefault();
    let categoryObject = {
      Name: event.target.name.value,
      description: event.target.description.value,
    };
    console.log(categoryObject);
    axios
      .post("/category", categoryObject)
      .then((res) => {
        getCategory();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  let deleteCategory = (index) => {
    console.log(index);
    axios
      .delete("/category/" + index)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    getCategory();
  };
  const deleteAll = () => {
    axios
      .delete("/category")
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    getCategory();
  };

  const editCategory = (value) => {
    console.log(value);
    setState(true);
    setData(value);
    setName(value.Name);
    setDescription(value.description);
  };
  const updateCategory = (event) => {
    event.preventDefault();
    let categoryObject = {
      Name: event.target.name.value,
      description: event.target.description.value,
    };
    axios.put(`/category/${data.CategoryId}`, categoryObject).then((res) => {
      getCategory();
      setState(false);
      console.log(res.data);
    });
    getCategory();
  };
  return (
    <div className='container'>
      <h1>Category</h1>
      {state ? (
        <form onSubmit={updateCategory}>
          <input
            type='text'
            name='name'
            id='nameInput'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <textarea
            name='description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <button>Update</button>
        </form>
      ) : (
        <form onSubmit={addCategory}>
          <input type='text' name='name' placeholder='Enter Category Name' />
          <textarea
            name='description'
            placeholder='Enter Description'
          ></textarea>
          <button>Add</button>
        </form>
      )}

      <h5>
        Delete All Categories, Click Here...
        <button onClick={deleteAll} className='delAll'>
          DeleteAll
        </button>
      </h5>

      <table>
        <tr>
          <th>S.No</th>
          <th>Name</th>
          <th>Description</th>
          <th></th>
          <th></th>
        </tr>

        {category !== undefined ? (
          category.map(function (val, index) {
            return (
              <tr>
                <td>{index + 1}</td>
                <td>{val.Name}</td>
                <td>{val.description}</td>
                <td>
                  <button
                    onClick={() => deleteCategory(val.CategoryId)}
                    className='delBtn'
                  >
                    Delete
                  </button>
                </td>
                <td>
                  <button onClick={() => editCategory(val)} className='delBtn'>
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
export default Category;
