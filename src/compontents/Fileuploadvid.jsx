/* eslint-disable react/prop-types */

function Fileuploadvid(props) {
  return (
    <>
      {" "}
      <div className='w-48 h-80 bg-black flex items-center justify-center'>
        <video
          className='w-full h-full '
          src={`https://wjnkpxfisyzyprfmvmxm.supabase.co/storage/v1/object/public/videos/${props.srcUrl}`}
          alt=''
        />
        <div className='absolute'>UPLOADED</div>
      </div>
    </>
  );
}

export default Fileuploadvid;
