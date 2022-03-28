import { useState, useEffect } from "react";
import axios from "axios";
const Users = () => {
  let [users, setUsers] = useState([]);
  useEffect(() => {
    getUsers();
  }, []);
  const getUsers = () => {
    axios
      .get("/users")
      .then((res) => {
        console.log(res.data.results);
        setUsers(res.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  let addUser = (event) => {
    event.preventDefault();
    let userObject = {
      email: event.target.email.value,
      password: event.target.password.value,
      userInfo: event.target.userInfo.value,
      dob: event.target.dob.value,
    };
    console.log(userObject);
    axios
      .post("/users", userObject)
      .then((res) => {
        getUsers();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  let deleteUser = (index) => {
    console.log(index);
    axios
      .delete("/users/" + index)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    getUsers();
  };
  const deleteAll = () => {
    axios
      .delete("/users")
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    getUsers();
  };
  return (
    <div>
      <h1>Users Form</h1>
      <form onSubmit={addUser}>
        <label>Email:</label>
        <input type='email' name='email' placeholder='Enter Email' />
        <br />
        <label>Password</label>
        <input type='password' name='password' placeholder='Enter Password' />
        <br />
        <label>Date of Birth:</label>
        <input type='date' name='dob' />
        <br />
        <textarea name='userInfo' placeholder='Enter User Info...'></textarea>
        <br />
        <button>Add</button>
      </form>
      <h5>
        Delete all Users Details , Click Here...
        <button onClick={deleteAll} className='delAll'>
          DeleteAll
        </button>
      </h5>

      <table>
        <tr>
          <th>S.No</th>
          <th>Email</th>
          <th>Password</th>
          <th>Dob</th>
          <th>UserInfo</th>
          <th></th>
        </tr>

        {users.length != 0 ? (
          users.map(function (val, index) {
            return (
              <tr>
                <td>{index + 1}</td>
                <td>{val.email}</td>
                <td>{val.password}</td>
                <td>{val.dob}</td>
                <td>{val.userInfo}</td>
                <td>
                  <button
                    onClick={() => {
                      deleteUser(val.id);
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
export default Users;
