import Link from "next/link";
import styles from "../styles/tour.module.css";
import Image from "next/image";

export default function Singletour({ resultado }) {
  const navLink = [
    {
      name: "Machu Picchu",
      link: "/machu-picchu",
      tag: "18",
    },
    {
      name: "Inca Trail",
      link: "/inca-trail",
      tag: "17",
    },
    {
      name: "Choquequirao Trek",
      link: "/choquequirao-trek",
      tag: "16",
    },
  ];
  return (
    <div>
      <section className={` bg-primary `}>
        <div className={`rounded-t-primary  bg-white`}>
          <div className={`container mx-auto px-4 sm:px-4 md:px-4 lg:px-0 bg-white py-5 flex gap-3`}>
            <Link href="/" className="text-primary hover:text-blue-700">
              Home
            </Link>
            /
            {navLink
              .filter((tags) => tags.tag == resultado[0].tags[0])
              .map((tag) => (
                <Link
                  key={tag.name}
                  href={tag.link}
                  className="text-primary hover:text-blue-700"
                >
                  {tag.name}
                </Link>
              ))}
            /<span>{resultado[0].title.rendered}</span>
          </div>
        </div>
      </section>
      <section className={`container mx-auto px-4 sm:px-4 md:px-4 lg:px-0`}>
        <main>
          <section className="flex flex-col md:flex-row gap-5">
            <div className="w-full sm:w-full md:w-1/2">
              <h1 className="font-bold text-3xl mb-5">
                {resultado[0].title.rendered}
              </h1>
              <div
                dangerouslySetInnerHTML={{
                  __html: resultado[0].excerpt.rendered,
                }}></div>
              <div className=" mt-5 grid grid-cols-3 gap-2">
                <ul className="bg-laight rounded-md p-3 border border-primary flex gap-y-1 flex-col">
                  <li className="flex">Duration: {resultado[0].acf.duracion}</li>
                  <li className="flex items-center">Difficulty: 
                  <div className="w-full h-1 flex bg-blue-100 ml-2">
                    <div className={`bg-primary h-1 text-sm text-primary pt-1`}>{resultado[0].acf.dificultad}</div>
                  </div>
                  </li>
                </ul>
                <ul className="bg-laight rounded-md p-3 border border-transparent hover:border-primary transition-all flex gap-y-1 flex-col">
                  <li>Group Size: {resultado[0].acf.grupo}</li>
                  <li>Location: {resultado[0].acf.locacion}</li>
                </ul>
                <ul className="bg-laight rounded-md p-3 border border-transparent hover:border-primary transition-all flex gap-y-1 flex-col">
                  <li>Type Trip: {resultado[0].acf.type_trip}</li>
                </ul>
              </div>
            </div>
            <div className="w-full sm:w-full md:w-1/2">
              <Image
                priority={true}
                src={
                  resultado[0]._embedded["wp:featuredmedia"][0].media_details
                    .sizes.medium_large.source_url
                }
                width={
                  resultado[0]._embedded["wp:featuredmedia"][0].media_details
                    .sizes.medium_large.width
                }
                height={
                  resultado[0]._embedded["wp:featuredmedia"][0].media_details
                    .sizes.medium_large.height
                }
                className="rounded-xl"
                alt={resultado[0]._embedded["wp:featuredmedia"][0].alt_text}
              />
            </div>
          </section>
          <section className={`flex flex-col md:flex-row gap-7 py-8 mb-10`}>
            <aside className={`${styles.w25} w-full sm:w-full`}>
              <div className={styles.sticky}>
                <span className="text-black">
                  {" "}
                  From <br />
                  <b className="text-lg text-black">
                    ${resultado[0].acf.precio}
                  </b>
                </span>
                <a
                  href={resultado[0].acf.link_pago}
                  className={`bg-primary text-white block py-2 text-center rounded-md 
                  pointer mt-3 hover:bg-blue-700 transition-all`}
                >
                  Book Now
                </a>
              </div>
            </aside>
            <div className={`${styles.w75} wp-content`}>
              <div
                dangerouslySetInnerHTML={{
                  __html: resultado[0].content.rendered,
                }}
              />
            </div>
          </section>
        </main>
      </section>
    </div>
  );
}
