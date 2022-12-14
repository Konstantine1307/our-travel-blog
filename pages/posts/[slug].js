import Head from "next/head";
import { renderMetaTags, useQuerySubscription } from "react-datocms";
import Container from "@/components/container";
import Header from "@/components/header";
import Layout from "@/components/layout";
import MoreStories from "@/components/more-stories";
import PostBody from "@/components/post-body";
import PostHeader from "@/components/post-header";
import Map from '@/components/Map';
import Date from '@/components/date';
import SectionSeparator from "@/components/section-separator";
import { request } from "@/lib/datocms";
import { metaTagsFragment, responsiveImageFragment } from "@/lib/fragments";
import GalleryTitle from "@/components/gallery-title";
import PostGallery from "@/components/post-gallery";
import LanguageBar from "@/components/language-bar";
// import CommentsBox from "@/components/comments";
import { DiscussionEmbed } from "disqus-react";



export async function getStaticPaths({ locales }) {
  const data = await request({ query: `{ allPosts { slug } }` });
  const pathsArray = [];
  // return {
  //   paths: data.allPosts.map((post) => `/posts/${post.slug}`),
  //   fallback: false,
  // };
  data.allPosts.map((post) => {
    locales.map((language) => {
      pathsArray.push({ params: { slug: post.slug }, locale: language });
    });
  });

  return {
    paths: pathsArray,
    fallback: false,
  };
}

export async function getStaticProps({ params, preview = false, locale }) {
  const formattedLocale = locale.split("-")[0];
  const graphqlRequest = {
    query: `
      query PostBySlug($slug: String) {
        site: _site {
          favicon: faviconMetaTags {
            ...metaTagsFragment
          }
        }
        post(locale: ${formattedLocale}, filter: {slug: {eq: $slug}}) {
          seo: _seoMetaTags {
            ...metaTagsFragment
          }
          title
          slug
          content {
            value
            blocks {
              __typename
              ...on ImageBlockRecord {
                id
                image {
                  responsiveImage(imgixParams: {fm: jpg, fit: crop, w: 2000, h: 1000 }) {
                    ...responsiveImageFragment
                  }
                }
              }
            }
          }
          headline
          postLocation {
            latitude
            longitude
          }
          galleryTitle
          imageGallery {
            alt
            title
            url
            responsiveImage(imgixParams: {fm: jpg, fit: crop, w: 1000, h: 0.675 }) {
                    ...responsiveImageFragment
                  }
          }
          date
          ogImage: coverImage{
            url(imgixParams: {fm: jpg, fit: crop, w: 2000, h: 1000 })
          }
          coverImage {
            responsiveImage(imgixParams: {fm: jpg, fit: crop, w: 2000, h: 1000 }) {
              ...responsiveImageFragment
            }
          }
          author {
            name
            picture {
              responsiveImage(imgixParams: {fm: jpg, fit: crop, w: 100, h: 100, sat: -100}) {
                ...responsiveImageFragment
              }
            }
          }
        }

        morePosts: allPosts(locale: ${formattedLocale}, orderBy: date_DESC, filter: {slug: {neq: $slug}}) {
          title
          slug
          excerpt
          date
          coverImage {
            responsiveImage(imgixParams: {fm: jpg, fit: crop, w: 2000, h: 1000 }) {
              ...responsiveImageFragment
            }
          }
          author {
            name
            picture {
              responsiveImage(imgixParams: {fm: jpg, fit: crop, w: 100, h: 100, sat: -100}) {
                ...responsiveImageFragment
              }
            }
          }
        }
      }

      ${responsiveImageFragment}
      ${metaTagsFragment}
    `,
    preview,
    variables: {
      slug: params.slug,
    },
  };

  return {
    props: {
      subscription: preview
        ? {
            ...graphqlRequest,
            initialData: await request(graphqlRequest),
            token: process.env.NEXT_EXAMPLE_CMS_DATOCMS_API_TOKEN,
          }
        : {
            enabled: false,
            initialData: await request(graphqlRequest),
          },
      preview,
    },
  };
}

export default function Post({ subscription, preview }) {
  const {
    data: { site, post, morePosts, title },
  } = useQuerySubscription(subscription);

  const metaTags = post.seo.concat(site.favicon);

  const disqusConfig = {
    shortname: "https-johnnyleslie-com",
    config: { identifier: `${post.slug} ${post.title}` },
  }

  return (
    <Layout preview={preview}>
      <Head>{renderMetaTags(metaTags)}</Head>
      <Container>
        <LanguageBar />
        <Header />
        <article>
          <PostHeader
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            author={post.author}
          />
          <div className='w-full flex flex-col md:flex-row space-y-8 md:space-y-0 justify-evenly bg-slate-200 pt-4 pb-2 px-2 md:px-4 overscroll-auto'>
            <div className='flex flex-col md:basis-1/4 space-y-6 md:space-y-10'>
              <div className='text-xl pl-3'>
                <Date dateString={post.date} />
              </div>
              <div className='max-w-sm'>
                <p className='text-normal px-3'>{post.headline}</p>
              </div>
            </div>
            <div className='md:basis-1/2'>
              <Map
                geopoint={post.postLocation}
                latitude={post.postLocation.latitude}
                longitude={post.postLocation.longitude}
              />
            </div>
          </div>
          <SectionSeparator />
          <PostBody content={post.content} />
          <div className='relative py-6 mx-auto'>
            <GalleryTitle>{post.galleryTitle}</GalleryTitle>
            <PostGallery imageGallery={post.imageGallery} />
          </div>      
            <DiscussionEmbed {...disqusConfig} />         
        </article>
        <SectionSeparator />
        {morePosts.length > 0 && <MoreStories posts={morePosts} />}
      </Container>
    </Layout>
  );
}
