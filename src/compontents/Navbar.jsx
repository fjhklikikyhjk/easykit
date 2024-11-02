import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import getmyuser from "../utils";

import pen_to_square from "../assets/pen-to-square-solid.svg";
import Easy_kit from "../assets/Easy-Kit.png";
import { supabase } from "../supabaseClient";

function Navbar() {
  const [isauthenticated, setIsauthenticated] = useState(false);
  const [userid, setUserid] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    const checkAuth = async () => {
      let user = await getmyuser();
      setUserid(user.id);
      console.log(user.id);
      if (user.aud === "authenticated") {
        setIsauthenticated(true);
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    async function getUsername() {
      const { data, error } = await supabase
        .from("User")
        .select()
        .eq("user_id", userid);

      console.log(error);
      setUsername(data[0].username);
    }

    getUsername();
  }, [userid]);

  return (
    <>
      <div className='w-fullh-14  flex  flex-row justify-between'>
        <Link to={"astounding-croissant-2449b7.netlify.app/" + username}>
          {" "}
          <div className='w-20 h-20 -mt-3 ml-8'>
            <img src={Easy_kit} alt='' />
          </div>
        </Link>
        {isauthenticated && (
          <div className='w-8 h-8 mt-3 mr-4'>
            <Link to={"/info"}>
              <img src={pen_to_square} className='w-fit h-fit' alt='' />
            </Link>
          </div>
        )}
      </div>
    </>
  );
}

export default Navbar;
