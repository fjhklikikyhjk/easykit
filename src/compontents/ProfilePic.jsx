/* eslint-disable react/prop-types */
import { supabase } from "../supabaseClient";
import { useEffect, useState } from "react";

function ProfilePic(props) {
  // Use useState to store the image URL and trigger re-render when it's fetched
  const [imageUrl, setImageUrl] = useState(null);
  const [userID, setUserID] = useState("");
  useEffect(() => {
    setUserID(props.useridparm);
  }, [props.useridparm]);

  useEffect(() => {
    // Fetch the public URL from Supabase
    const fetchProfilePic = async () => {
      const { data, error } = supabase.storage
        .from("profilepic")
        .getPublicUrl(props.useridparm + "/UserProfilePic.jpg");

      if (data) {
        setImageUrl(data.publicUrl); // Update the state with the fetched URL
      }

      if (error) {
        console.error("Error fetching profile picture:", error);
      }
    };

    fetchProfilePic(); // Call the async function to fetch the image URL
  }, [props.useridparm]);
  console.log(imageUrl);
  return (
    <div className='h-72 min-w-96 max-w-96 ml-20 '>
      <div className='p-5'>
        {/* Conditionally render the img tag only when the imageUrl is available */}
        {imageUrl ? (
          <img
            className='object-cover h-96 min-w-96 rounded-lg  shadow-sm shadow-stone-300'
            src={imageUrl}
            alt='Profile Pic'
          />
        ) : (
          <p>Loading...</p> // Display a fallback while the image is being fetched
        )}
      </div>
    </div>
  );
}

export default ProfilePic;
