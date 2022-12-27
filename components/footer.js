import Container from "./container";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className='bg-accent-1 border-t border-accent-2'>
      <Container>
        <div className='py-16 flex flex-col lg:flex-row items-center'>
          <h3 className='text-2xl lg:text-3xl font-bold tracking-tighter leading-tight text-center lg:text-left mb-10 lg:mb-0 lg:pr-4 lg:w-1/2'>
            A Travel Blog by Leslie and Johnny
          </h3>
          <div className='flex flex-col lg:flex-row-reverse justify-center items-center lg:pl-4 lg:w-2/3'>
            <Link
              href='https://www.tresowesgreencottage.com'
              className='mx-3 bg-black hover:bg-white hover:text-black border border-black text-white font-bold py-3 px-12 lg:px-8 duration-200 transition-colors mb-6 lg:mb-0'>
              Tresowes Green Cottage
            </Link>
           
             <p className='mx-3 font-bold hover:underline'>
              We run two Holiday Rentals in Cornwall.<br /> 
              Come and visit us in one of your trips.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}

