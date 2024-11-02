/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { supabase } from "../supabaseClient";
function Video(props) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

  const handlePlayPause = () => {
    const video = videoRef.current;
    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  async function handleDelete() {
    const URL = videoRef.current.src;

    let newURL = URL.split(
      "https://wjnkpxfisyzyprfmvmxm.supabase.co/storage/v1/object/public/videos/"
    );
    const { data, error } = await supabase.storage
      .from("videos")
      .remove([newURL[1]]);
    if (data) {
      console.log("DID IT");
    }
    if (error) {
      console.log(error);
    }
  }

  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    setDuration(video.duration);
  };
  const handleVolumeChange = (event) => {
    const video = videoRef.current;
    video.volume = event.target.value;
    setVolume(event.target.value);
  };

  return (
    <div className='relative mt-36'>
      <div className='w-full h-full '>
        <video
          src={`https://wjnkpxfisyzyprfmvmxm.supabase.co/storage/v1/object/public/videos/${props.useridparm}/${props.srcUrl}`}
          ref={videoRef}
          playsInline={true}
          onLoadedMetadata={handleLoadedMetadata}
          className='h-[600px] w-fit rounded-md shadow-sm shadow-white'
          controls={false}
          muted={false}
        ></video>
        {props.isauthenticated && (
          <button
            onClick={handleDelete}
            className='bg-red-800 w-fit h-fit absolute bottom-0'
          >
            DELETE
          </button>
        )}
      </div>
      <div className='absolute bottom-64 left-36 right-0 flex items-center  rounded-full bg-black bg-opacity-50 w-fit p-4'>
        <button onClick={handlePlayPause} className='text-white'>
          {isPlaying ? "Pause" : "Play"}
        </button>
      </div>
      <span className='text-white'></span>
      <div className='absolute -rotate-90 bottom-52 left-80 right-0 flex items-center rounded-full  p-2'>
        <input
          type='range'
          className='mx-3'
          onChange={handleVolumeChange}
          min='0'
          max='1'
          step='0.1'
          value={volume}
        />
      </div>
    </div>
  );
}
function Showcase(props) {
  const [srcUrl, setSrcUrl] = useState([]);

  useEffect(() => {
    // Fetch the public URL from Supabase

    const fetchVideos = async () => {
      const { data, error } = await supabase.storage
        .from("videos")
        .list(props.useridparm);
      if (data) {
        for (let x in data) {
          if (data[x].name.includes("mp4")) {
            setSrcUrl((prevArray) => [...prevArray, data[x].name]);
          }
        }
      }

      if (error) {
        console.error("Error fetching profile picture:", error);
      }
    };
    fetchVideos(); // Call the async function to fetch the image URL
  }, [props.useridparm]);
  return (
    <>
      <div className='flex items-center justify-center text-3xl font-extrabold mt-10'>
        <h1>SHOWCASE</h1>
      </div>
      <div className='flex flew-row gap-11 ml-56 flex-wrap  -mt-28  '>
        {srcUrl.map((x) => (
          <Video
            key={uuidv4()}
            srcUrl={x}
            isauthenticated={props.isauthenticated}
            useridparm={props.useridparm}
          />
        ))}
      </div>
    </>
  );
}

export default Showcase;
