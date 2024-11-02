import { supabase } from "./supabaseClient";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserProfilePic from "./assets/UserProfilePic.jpg";

function Logginforms(props) {
  return (
    <div>
      <h1>Log In</h1>
      <form action='submit' onSubmit={props.handleLoggin}>
        <label className='input input-bordered flex items-center gap-2'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 16 16'
            fill='currentColor'
            className='h-4 w-4 opacity-70'
          >
            <path d='M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z' />
            <path d='M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z' />
          </svg>
          <input
            type='text'
            className='grow'
            placeholder='Email'
            value={props.email}
            onChange={props.handleEmail}
          />
        </label>
        <label className='input input-bordered flex items-center gap-2'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 16 16'
            fill='currentColor'
            className='h-4 w-4 opacity-70'
          >
            <path d='M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z' />
          </svg>
          <input
            type='text'
            className='grow'
            placeholder='Username'
            value={props.username}
            onChange={props.handleUsername}
          />
        </label>
        <label className='input input-bordered flex items-center gap-2'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 16 16'
            fill='currentColor'
            className='h-4 w-4 opacity-70'
          >
            <path
              fillRule='evenodd'
              d='M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z'
              clipRule='evenodd'
            />
          </svg>
          <input
            type='password'
            className='grow'
            placeholder='Password'
            value={props.password}
            onChange={props.handlePassword}
          />
        </label>
        <div className='gap-28 flex flex-row'>
          <input type='submit' name='' id='' className=' w-fit h-11' />
          <button className='w-fit ' onClick={() => props.setIslogged(false)}>
            SignUp?
          </button>
        </div>
      </form>
    </div>
  );
}
function Signupforms(props) {
  return (
    <div>
      <h1>Sign up</h1>
      <form action='submit' onSubmit={props.newuserdata}>
        <label className='input input-bordered flex items-center gap-2'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 16 16'
            fill='currentColor'
            className='h-4 w-4 opacity-70'
          >
            <path d='M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z' />
            <path d='M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z' />
          </svg>
          <input
            type='text'
            className='grow'
            placeholder='Email'
            value={props.email}
            onChange={props.handleEmail}
          />
        </label>
        <label className='input input-bordered flex items-center gap-2'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 16 16'
            fill='currentColor'
            className='h-4 w-4 opacity-70'
          >
            <path d='M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z' />
          </svg>
          <input
            type='text'
            className='grow'
            placeholder='Username'
            value={props.username}
            onChange={props.handleUsername}
          />
        </label>
        <label className='input input-bordered flex items-center gap-2'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 16 16'
            fill='currentColor'
            className='h-4 w-4 opacity-70'
          >
            <path
              fillRule='evenodd'
              d='M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z'
              clipRule='evenodd'
            />
          </svg>
          <input
            type='password'
            className='grow'
            placeholder='Password'
            value={props.password}
            onChange={props.handlePassword}
          />
        </label>
        <div className='flex flex-col'>
          <input type='submit' className='w-fit h-11 bg-slate-800' />
          <button onClick={() => props.setIslogged(true)} className='w-fit'>
            If You Already SignUp Click Here
          </button>
        </div>
      </form>
    </div>
  );
}

function NewUser() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [islogged, setIslogged] = useState(false);
  const [userdata, setUserdata] = useState({});
  const [usersession, setUsersession] = useState();
  const navigate = useNavigate();

  async function newuserdata(event) {
    event.preventDefault();
    if (email !== "" && password !== "") {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });

      console.log(data);
      console.log(error);
      handleInsert(data);
      setUserdata(data);
      createFileFolder(data);
      navigate("/info");
    }
  }

  async function handleInsert(data) {
    const { error } = await supabase
      .from("User")
      .insert([
        { user_id: data.user.id, username: username, bio: "Hello world!" },
      ]);
    console.log(error);
  }
  async function createFileFolder(data) {
    const response = await fetch(UserProfilePic);
    const blob = await response.blob();
    const { data2, error2 } = await supabase.storage
      .from("profilepic")
      .upload(data.user.id + "/UserProfilePic.jpg", blob, {
        cacheControl: "3600",
        upsert: false,
      });
    console.log(data2, "data2");
    console.log(error2);
  }
  async function handleLoggin(event) {
    event.preventDefault();
    if (email !== "" && password !== "") {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      setUsersession(data);
      console.log(error);
      console.log(data);
      navigate("/" + username);
    }
  }
  function handlePassword(event) {
    setPassword(event.target.value);
  }
  function handleEmail(event) {
    setEmail(event.target.value);
  }
  function handleUsername(event) {
    setUsername(event.target.value);
    console.log(username);
  }

  return (
    <>
      <div className='flex justify-center items-center w-screen h-screen'>
        {islogged ? (
          <Logginforms
            password={password}
            handlePassword={handlePassword}
            email={email}
            handleEmail={handleEmail}
            username={username}
            handleUsername={handleUsername}
            handleLoggin={handleLoggin}
            setIslogged={setIslogged}
          />
        ) : (
          <Signupforms
            password={password}
            handlePassword={handlePassword}
            email={email}
            handleEmail={handleEmail}
            username={username}
            handleUsername={handleUsername}
            newuserdata={newuserdata}
            setIslogged={setIslogged}
          />
        )}
      </div>
    </>
  );
}

export default NewUser;
