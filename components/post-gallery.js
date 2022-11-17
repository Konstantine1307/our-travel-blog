import Image from "next/image";

import { useState } from "react";

import Modal from "./Modal";



export default function PostGallery({imageGallery}) {
 const [clickedImg, setClickedImg] = useState("");
 const [currentIndex, setCurrentIndex] = useState("");

 const handleClick = (item, index) => {
   setCurrentIndex(index);
   setClickedImg(item.url);
 };

 const handelRotationRight = () => {
   const totalLength = imageGallery.length;
   if (currentIndex + 1 >= totalLength) {
     setCurrentIndex(0);
     const newUrl = imageGallery[0].url;
     setClickedImg(newUrl);
     return;
   }
   const newIndex = currentIndex + 1;
   const newUrl = imageGallery.filter((item) => {
     return imageGallery.indexOf(item) === newIndex;
   });
   const newItem = newUrl[0].url;
   setClickedImg(newItem);
   setCurrentIndex(newIndex);
 };

 const handelRotationLeft = () => {
   const totalLength = imageGallery.length;
   if (currentIndex === 0) {
     setCurrentIndex(totalLength - 1);
     const newUrl = imageGallery[totalLength - 1].url;
     setClickedImg(newUrl);
     return;
   }
   const newIndex = currentIndex - 1;
   const newUrl = imageGallery.filter((item) => {
     return imageGallery.indexOf(item) === newIndex;
   });
   const newItem = newUrl[0].url;
   setClickedImg(newItem);
   setCurrentIndex(newIndex);
 };

  
  return (
      <div className='flex flex-1 flex-wrap justify-center items-center bg-slate-200 p-2 space-x-0 md:space-x-8 md:gap-y-8 space-y-8 md:space-y-0'>
        
        {imageGallery.map((item, index) => (
          <div
            className='shadow-slate-500 shadow-xl hover:scale-110 transition duration-200 md:first-of-type:ml-8'
            key={index}>
            <Image
              className="cursor-pointer"
              width={250}
              height={250}
              src={item.url}
              alt={item.title}
              onClick={() => handleClick(item, index)}
            />
            
          </div>
        ))}
        <div>
          {clickedImg && (
            <Modal
              clickedImg={clickedImg}
              handelRotationRight={handelRotationRight}
              setClickedImg={setClickedImg}
              handelRotationLeft={handelRotationLeft}
            />
          )}
        </div>
      </div>
  )

}