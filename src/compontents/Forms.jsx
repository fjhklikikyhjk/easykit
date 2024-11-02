import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { supabase } from "../supabaseClient";

function Forms() {
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [tags, setTags] = useState([]);

  const [contact, setContact] = useState("");
  const [arrayoftags, setArrayoftags] = useState([]);
  const [instagram, setInstagram] = useState("");
  const [tiktok, setTiktok] = useState("");
  const [pinterest, setPinterest] = useState("");
  const [youtube, setYoutube] = useState("");
  const [userid, setUserid] = useState("");
  const [isuploading, setIsuploading] = useState(false);
  const [videoFilename, setvideoFilename] = useState("");

  useEffect(() => {
    async function userdata() {
      const { data, error } = await supabase
        .from("User")
        .select()
        .eq("user_id", userid);
      setPinterest(data[0].pinterest);

      setBio(data[0].bio);
      setContact(data[0].contact);
      setUsername(data[0].username);
      setTiktok(data[0].tiktok);
      setInstagram(data[0].instagram);
      console.log(data);
      console.log(error);
    }
    userdata();
  }, [userid]);
  useEffect(() => {
    supabase.auth
      .getUser()
      .then(({ data, error }) => {
        if (error) {
          console.error("Error fetching user data:", error.message);
          return;
        }

        const userId = data.user.id; // Access the user ID here
        setUserid(userId);
      })
      .catch((error) => {
        console.error("Promise error:", error.message);
      });
  }, []);

  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    // Fetch the public URL from Supabase
    const fetchProfilePic = async () => {
      const { data, error } = supabase.storage
        .from("profilepic")
        .getPublicUrl(userid + "/UserProfilePic.jpg");

      if (data) {
        setImageUrl(data.publicUrl); // Update the state with the fetched URL
      }

      if (error) {
        console.error("Error fetching profile picture:", error);
      }
    };

    fetchProfilePic(); // Call the async function to fetch the image URL
  }, [userid]);

  async function handleNewInfo(event) {
    event.preventDefault();

    // Create an object for the fields to update
    const updateFields = {
      username: username,
      bio: bio,
      tags: arrayoftags,
      contact: contact,
      instagram: instagram,
      tiktok: tiktok,
      pinterest: pinterest,
      youtube: youtube,
    };

    // Remove empty or null fields before submitting
    const filteredFields = Object.fromEntries(
      Object.entries(updateFields).filter(
        ([value]) => value !== "" && value !== null && value !== undefined
      )
    );

    // Submit only non-empty fields to Supabase
    const { data, error } = await supabase
      .from("User")
      .update(filteredFields)
      .eq("user_id", userid);

    if (error) {
      console.error("Error updating user info:", error.message);
      return;
    }

    console.log("User info updated successfully:", data);
  }

  function handleName(event) {
    setUsername(event.target.value);
  }
  function handleTags(event) {
    if (event.target.value === ",") {
      setTags("");
    } else {
      let tagggs = event.target.value;
      setTags(tagggs);
    }
  }
  function handleBio(event) {
    setBio(event.target.value);
  }

  function handleContact(event) {
    let x = event.target.value;
    setContact(x);
  }
  function handleComma(event) {
    if (event.key == ",") {
      setArrayoftags((prevArray) => [...prevArray, "#" + tags]);
      setTags("");
    }
  }

  async function handlePicUpload(event) {
    const newPic = event.target.files[0];
    const { data, error } = await supabase.storage
      .from("profilepic")
      .update(userid + "/UserProfilePic.jpg", newPic, {
        cacheControl: "5",
        upsert: true,
      });
    console.log(data);
    console.log(error);
  }

  async function handleVideoUpload(event) {
    const newVideo = event.target.files[0];
    setvideoFilename(newVideo.name);
    setIsuploading(true);
    const { data, error } = await supabase.storage
      .from("videos")
      .upload(userid + "/" + newVideo.name, newVideo);
    if (data !== null) {
      setIsuploading(false);
    }

    if (error) {
      setIsuploading(false);
    }
    console.log(data);
    console.log(error);
  }

  function handleInstagram(event) {
    const instalink = new URL(event.target.value);
    setInstagram(instalink.toString());
  }
  function handleTiktok(event) {
    const tiktoklink = new URL(event.target.value);
    setTiktok(tiktoklink.toString());
  }
  function handlePinterest(event) {
    const pinterestlink = new URL(event.target.value);
    setPinterest(pinterestlink.toString());
  }
  function handleYoutube(event) {
    const youtubelink = new URL(event.target.value);
    setYoutube(youtubelink.toString());
  }

  return (
    <>
      <div></div>

      <div className='flex justify-center items-center h-fit w-screen'>
        <div className='bg-slate-500 w-2/3 h-fit '>
          <form
            className='w-full h-full flex flex-col p-4'
            onSubmit={handleNewInfo}
          >
            <div className='flex flex-row gap-5 p-2'>
              <img src={imageUrl} alt='' className='w-20 h-20 rounded-md' />
              <label htmlFor='profilepic'> Profile Picture</label>
              <input
                type='file'
                name='profilepic'
                id='profilepic'
                onChange={handlePicUpload}
                tabIndex='-1'
                accept='image/png, image/jpeg'
              />
            </div>
            <label
              htmlFor='name'
              className='ml-4 font-medium text-xl text-slate-200'
            >
              Username
            </label>
            <input
              className='p-4 m-4 rounded-md   '
              type='text'
              name='name'
              id='name'
              onChange={handleName}
              value={username}
              tabIndex='-1'
            />{" "}
            <label
              htmlFor='bio'
              className='ml-4 font-medium text-xl text-slate-200'
            >
              Bio
            </label>
            <textarea
              className='p-4 m-4 rounded-md  text-wrap min-h-64 '
              type='text'
              name='bio'
              id='bio'
              value={bio}
              onChange={handleBio}
              tabIndex='-1'
            />{" "}
            <div className='flex flex-row gap-1 font-extrabold text-white'>
              {arrayoftags.map((tag) => (
                <p key={uuidv4()}>{tag.toUpperCase()}</p>
              ))}
            </div>
            <label
              htmlFor='tags'
              className='ml-4 font-medium text-xl text-slate-200'
            >
              Tags Press COMMA To Add
            </label>
            <input
              className='p-4 m-4 rounded-md font-bold'
              type='text'
              name='tags'
              id='tags'
              value={tags}
              onChange={handleTags}
              onKeyDown={handleComma}
              tabIndex='-1'
            />{" "}
            <h2 className='ml-4 font-medium text-2xl text-white'>Socials</h2>
            <div className='flex flex-col gap-1 '>
              <label
                htmlFor='instagram'
                className='ml-4 font-medium text-xl text-slate-200'
              >
                Instagram Url
              </label>
              <input
                className='p-4 m-4 rounded-md'
                type='url'
                name='instagram'
                id='instagram'
                value={instagram}
                onChange={handleInstagram}
                tabIndex='-1'
              />
              <label
                htmlFor='tiktok'
                className='ml-4 font-medium text-xl text-slate-200'
              >
                {" "}
                Tiktok Url
              </label>
              <input
                className='p-4 m-4 rounded-md'
                type='text'
                name='tiktok'
                id='tiktok'
                value={tiktok}
                onChange={handleTiktok}
                tabIndex='-1'
              />
              <label
                htmlFor='pinterest'
                className='ml-4 font-medium text-xl text-slate-200'
              >
                Pinterest Url
              </label>
              <input
                className='p-4 m-4 rounded-md'
                type='url'
                name='pinterest'
                id='pinterest'
                onChange={handlePinterest}
                value={pinterest}
                tabIndex='-1'
              />
              <label
                htmlFor='youtube'
                className='ml-4 font-medium text-xl text-slate-200'
              >
                Youtube Url
              </label>
              <input
                className='p-4 m-4 rounded-md'
                type='url'
                name='youtube'
                id='youtube'
                value={youtube}
                onChange={handleYoutube}
                tabIndex='-1'
              />
            </div>
            <label
              htmlFor='Contact'
              className='ml-4 font-medium text-xl text-slate-200'
            >
              Contact Info
            </label>
            <input
              className='p-4 m-4 rounded-md'
              type='email'
              name='Contact'
              id='Contact'
              value={contact}
              onChange={handleContact}
              tabIndex='-1'
            />{" "}
            {isuploading && <p>{"UPLOADING.....  " + videoFilename}</p>}
            <label
              htmlFor='videos'
              className='ml-4 font-medium text-4xl text-slate-200'
            >
              {" "}
              Showcase
            </label>
            <div className='w-full  flex justify-center items-center'>
              <input
                accept='video/*'
                type='file'
                name={"inputname"}
                id={"fgsf"}
                onChange={handleVideoUpload}
                tabIndex='-1'
                className='w-[700px] h-[200px] p-20 pl-52 border-white border-2 rounded-md'
              ></input>
            </div>
            <div className='flex flex-row gap-10 m-4 ml-8 flex-wrap'></div>{" "}
            <div className='w-screen justify-center items-center h-fit'>
              <input
                type='submit'
                className='ml-4 font-medium text-xl text-slate-200 w-fit mb-8 bg-slate-900 p-3 rounded-lg'
                tabIndex='-1'
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Forms;
