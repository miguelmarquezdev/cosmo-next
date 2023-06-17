import Image from "next/image";
import Link from "next/link";

export default function pages({ page }) {
  return (
    <article
      className={`transition-all overflow-hidden`}
    >
      <Link href={`/${page.slug}`} >
      <Image
          src={
            page._embedded["wp:featuredmedia"][0].media_details.sizes
              .full.source_url
          }
          width={
            page._embedded["wp:featuredmedia"][0].media_details.sizes
              .full.width
          }
          height={
            page._embedded["wp:featuredmedia"][0].media_details.sizes
              .full.height
          }
          alt={page._embedded["wp:featuredmedia"][0].alt_text
          }
          className="rounded-xl overflow-hidden object-cover w-full"
        />
      </Link>
      <div className={`px-3 py-4`}>
        <h3 className={`font-bold capitalize text-black text-2xl mb-2`}>{page.title.rendered}</h3>
      </div>
    </article>
  );
}
