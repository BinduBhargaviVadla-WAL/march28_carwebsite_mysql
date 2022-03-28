// import React from 'react'

// export default function NameValueTime() {
//   return (
//     <div></div>
//   )
// }
import axios from "axios";
const NameValueTime = () => {
  let addCookie = (event) => {
    event.preventDefault();
    let name = event.target.name.value;
    let name_value = event.target.name_value.value;
    let time = event.target.time.value;
    axios
      .get("/cookie/setNameValueTime/" + name + "/" + name_value + "/" + time)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className='container'>
      <h1>Provide Name Value and Time</h1>
      <form onSubmit={addCookie}>
        <input type='text' name='name' placeholder='Enter Name' />
        <input type='text' name='name_value' placeholder='Enter Value' />
        <input type='number' name='time' placeholder='Enter Time' />
        <button>Submit</button>
      </form>
    </div>
  );
};
export default NameValueTime;
