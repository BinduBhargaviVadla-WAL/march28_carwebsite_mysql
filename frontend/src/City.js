import axios from "axios";
const City = () => {
  let addCookie = (event) => {
    event.preventDefault();
    let city = event.target.city.value;
    console.log(city);
    axios
      .get("/cookie/setcookiewithcity/city/" + city)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className='container'>
      <h1>City</h1>
      <form onSubmit={addCookie}>
        <input type='text' name='city' placeholder='Enter City' />
        <button>Submit</button>
      </form>
    </div>
  );
};
export default City;
