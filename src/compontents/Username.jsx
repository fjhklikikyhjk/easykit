/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

function Username(props) {
  const [username, setUsername] = useState();
  useEffect(() => {
    async function getUsername() {
      const { data, error } = await supabase
        .from("User")
        .select()
        .eq("user_id", props.useridparm);

      console.log(error);
      setUsername(data[0].username);
    }

    getUsername();
  }, [props.useridparm]);

  return (
    <>
      <div className=''>
        <div className='flex flex-row  w-[470px]  pl-44 pt-5  '>
          <p className='text-white font-semibold text-3xl -mt-16'>
            @{username}
          </p>
          <p className='text-white font-semibold text-3xl -mt-16'>-</p>
          <p className='text-white font-semibold text-3xl -mt-16'>Realname</p>
        </div>
      </div>
    </>
  );
}

export default Username;
