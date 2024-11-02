/* eslint-disable react/prop-types */

import { supabase } from "../supabaseClient";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
function Himg(props) {
  return (
    <a href={props.objectValue} target='_blank'>
      <img src={props.objectKey} alt='' className='w-16 h-16 rounded-xl ' />
    </a>
  );
}

function LinkandContact(props) {
  const [socialObject, setSocialOBject] = useState([]);

  useEffect(() => {
    async function makeObjectArray() {
      const { data, error } = await supabase
        .from("User")
        .select()
        .eq("user_id", props.useridparm);
      console.log(data);
      console.log(error);

      if (data[0].pinterest !== "") {
        setSocialOBject((prevArray) => [
          ...prevArray,
          {
            "https://www.logologo.com/freelogos/Pinterest-P-white-on-red.png": `${data[0].pinterest}`,
          },
        ]);
      }
      if (data[0].instagram !== "") {
        setSocialOBject((prevArray) => [
          ...prevArray,
          {
            "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/2048px-Instagram_logo_2016.svg.png": `${data[0].instagram}`,
          },
        ]);
      }
      if (data[0].tiktok !== "") {
        setSocialOBject((prevArray) => [
          ...prevArray,
          {
            "https://cdn.pixabay.com/photo/2021/01/30/06/42/tiktok-5962992_1280.png": `${data[0].tiktok}`,
          },
        ]);
      }
      if (data[0].youtube !== "") {
        setSocialOBject((prevArray) => [
          ...prevArray,
          {
            "https://aoi.mediaplacepartners.com/wp-content/uploads/2021/06/Youtube-Square-Icon-1.jpg": `${data[0].youtube}`,
          },
        ]);
      }
    }

    makeObjectArray();
  }, [props.useridparm]);
  console.log(socialObject);
  return (
    <>
      <div className='flex flex-row pl-5 ml-52 m-3 mt-7 gap-2'>
        {socialObject.map((x) => (
          <Himg
            key={uuidv4}
            objectKey={Object.keys(x)}
            objectValue={Object.values(x)}
          />
        ))}
      </div>
    </>
  );
}

export default LinkandContact;
