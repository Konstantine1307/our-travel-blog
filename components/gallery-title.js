export default function GalleryTitle({ children }) {
  return (
    <h4 className='text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter leading-tight md:leading-none mb-12 text-center md:text-left'>
      {children}
    </h4>
  );
}
