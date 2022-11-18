import { Gallery } from 'react-photoswipe-gallery';
import 'photoswipe/dist/photoswipe.css';
import { Item } from 'react-photoswipe-gallery';

function GalleryImgCard(props) {
  const smallItemStyles = {
    cursor: 'pointer',
    objectFit: 'cover',
    width: '250px',
    height: '150px',
    borderRadius: '10px',
    boxShadow: '0 .5rem 1rem rgba(0, 0, 0, 0.5)',
  };

  return (
    <Item
      cropped
      original={props.url}
      thumbnail={props.url}
      width={1000}
      height={675}
      alt={props.alt}
      caption={props.title}>

      {({ ref, open }) => (
        <img
          style={smallItemStyles}
          src={props.url}
          alt={props.alt}
          ref={ref}
          onClick={open}
          className='md:hover:opacity-50 md:hover:scale-110 duration-300 '
        />
      )}
    </Item>
  );
}

function PostGallery({imageGallery}) {
  const imgCards = imageGallery.map((item, index) => {
    return (

      <GalleryImgCard
        key={index}
        {...item}
      />
    
    );
  });

  return (
    <Gallery withCaption>
      <div className='flex flex-1 flex-wrap justify-center items-center bg-slate-200 p-2 space-x-0 md:space-x-8 md:gap-y-8 space-y-8 md:space-y-0 max-w-5xl mx-auto'>
        {imgCards}
      </div>
    </Gallery>
  );
}

export default PostGallery