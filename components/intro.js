import Link from "next/link";

export default function Intro() {
  return (
    <section>    
      <div className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">

          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter leading-tight md:pr-8 sm:mb-4 md:mb-0">
            Johnny & Leslie Travel Blog.
          </h1>
        <div className="text-2xl font-semibold underline underline-offset-4 md:mr-8">
          <Link href="mailto:info@tgcottage.com">Get in touch</Link>
        </div>
      </div>
  
      <div>
        <h3 className="text-xl font-normal  md: pr-8">Follow our adventures, places and people we have visited and met in our trips. Click on the main image or the title of each post to start reading.</h3>
      
      <p className="my-8 text-xl font-bold">OUR LATEST POST  😀 :</p>
      </div>
      
    </section>
  );
}
