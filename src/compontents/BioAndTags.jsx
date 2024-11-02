/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { v4 as uuidv4 } from "uuid";

function BioAndTags(props) {
  const [tags, setTags] = useState([]);

  const [bio, setBio] = useState("");

  useEffect(() => {
    async function getUsername() {
      const { data, error } = await supabase
        .from("User")
        .select()
        .eq("user_id", props.useridparm);
      console.log(data);
      console.log(error);
      setBio(data[0].bio);
      setTags(data[0].tags);
    }

    getUsername();
  }, [props.useridparm]);

  function Tags(props) {
    return (
      <p
        key={2}
        className='text-white font-extrabold bg-black w-fit rounded-lg m-3 p-2'
      >
        {props.tag}
      </p>
    );
  }
  return (
    <>
      <div className='pl-44 pt-3 -m-6 '>
        <div className='flex flex-col bg-stone-900 h-fit w-[900px]  shadow-sm shadow-stone-300 rounded-lg'>
          <p className=' p-4 text-lg text-white font-medium '>{bio}</p>
          <div className='flex flex-row m-2'>
            {tags.map((tag) => (
              <Tags key={uuidv4()} tag={tag} />
            ))}{" "}
          </div>
        </div>
      </div>
    </>
  );
}

export default BioAndTags;
