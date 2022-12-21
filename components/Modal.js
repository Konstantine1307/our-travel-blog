import Image from "next/image";
const Modal = ({
  clickedImg,
  setClickedImg,
  handelRotationRight,
  handelRotationLeft,
}) => {
  const handleClick = (e) => {
    if (e.target.classList.contains('dismiss')) {
      setClickedImg("");
    }
  };

  return (
    <>
      <div
        className='fixed top-0 left-0 right-0 w-auto  h-full dismiss mx-auto bg-slate-800 bg-opacity-50 flex justify-center items-center wrapper z-10'
        onClick={handleClick}>
     
          <Image
            className='mx-auto shadow-slate-900  shadow-lg'
            width={1000}
            height={675}
            src={clickedImg}
            alt='bigger pic'
          />
  
        <span
          className='absolute top-0 right-5 text-4xl text-gray-100 bg-slate-900 p-3 cursor-pointer dismiss'
          onClick={handleClick}>
          X
        </span>
        <div
          onClick={handelRotationLeft}
          className='flex justify-between items-center absolute md:w-20 md:h-12 left-0 z-10 bg-slate-900 text-gray-100 overlay-arrows_left p-3 md:p-0'>
          <div>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-8 w-8 md:h-12 md:w-20'
              viewBox='0 0 20 20'
              fill='currentColor'>
              <path
                fillRule='evenodd'
                d='M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z'
                clipRule='evenodd'
              />
            </svg>
          </div>
        </div>
        <div
          onClick={handelRotationRight}
          className='flex justify-between items-center absolute right-0  md:w-20 md:h-12 z-10  bg-slate-900  text-gray-100 overlay-arrows_right p-3 md:p-0'>
          <div>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-8 w-8 md:h-12 md:w-20'
              viewBox='0 0 20 20'
              fill='currentColor'>
              <path
                fillRule='evenodd'
                d='M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z'
                clipRule='evenodd'
              />
            </svg>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
