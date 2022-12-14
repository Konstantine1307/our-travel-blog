import Avatar from "./avatar";
import Date from "./date";
import CoverImage from "./cover-image";
import Link from "next/link";

export default function PostPreview({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}) {
  return (
    <div className='bg-slate-200 p-4 rounded-md shadow-lg hover:scale-105 duration-200'>
      <div className='mb-5'>
        <CoverImage
          slug={slug}
          title={title}
          responsiveImage={coverImage.responsiveImage}
        />
      </div>
      <h3 className='text-2xl lg:text-3xl mb-3 leading-snug bg-slate-300 p-1'>
        <Link
          href={`/posts/${slug}`}
          className='underline underline-offset-4'>
          {title}
        </Link>
      </h3>
      <div className='text-lg mb-4'>
        <Date dateString={date} />
      </div>
      <p className='text-lg leading-relaxed mb-4'>{excerpt}</p>
      <Avatar
        name={author.name}
        picture={author.picture}
      />
    </div>
  );
}
