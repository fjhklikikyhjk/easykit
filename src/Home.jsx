import { useEffect, useState } from "react";
import BioAndTags from "./compontents/BioAndTags";
import LinkandContact from "./compontents/LinkandContact";
import ProfilePic from "./compontents/ProfilePic";
import Showcase from "./compontents/Showcase";
import Username from "./compontents/Username";
import { useParams } from "react-router-dom";
import { supabase } from "./supabaseClient";

import getmyuser from "./utils.js";

function Home() {
  const [isauthenticated, setIsauthenticated] = useState(false);
  const [useridparm, setUseridparm] = useState("");
  useEffect(() => {
    const checkAuth = async () => {
      let aud = await getmyuser();
      setIsauthenticated(aud);
    };

    checkAuth();
  }, []);

  let { username } = useParams();

  useEffect(() => {
    async function getParams() {
      const { data, error } = await supabase
        .from("User")
        .select()
        .eq("username", username);

      console.log(error);
      setUseridparm(data[0].user_id);
    }

    getParams();
  }, [username]);
  return (
    <>
      <div className='no-scrollbar w-fit '>
        <div className='flex flex-row ml-20  '>
          <ProfilePic useridparm={useridparm} />
          <div className='flex flex-col mt-14  '>
            <div className='flex flex-row'>
              {" "}
              <Username useridparm={useridparm} />{" "}
            </div>
            <BioAndTags useridparm={useridparm} />
          </div>
        </div>

        <LinkandContact useridparm={useridparm} />
        <Showcase useridparm={useridparm} isauthenticated={isauthenticated} />
      </div>
    </>
  );
}

export default Home;
