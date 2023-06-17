import Tour from "@/components/tour";
import Layout from "../components/layout";
import styles from "../styles/grid.module.css";
import Header from "@/components/header";

export default function Incatrail({ categories }) {
  console.log(categories);

  return (
    <Layout
      title={"Inca Trail Tours - Cosmo Expeditions"}
      description={
        "The Choquequirao Trek is a popular hiking trail in Peru that takes you to the ancient Inca ruins of Choquequirao. Similar to the more famous Inca Trail to Machu Picchu"
      }
    >
      <Header bgslate="bg-transparent absolute w-full z-10" />
      <div
        className={`bg-inca-trail w-full h-96 relative bg-no-repeat bg-cover ${styles.bgfondo}`}
      >
        <div
          className={`container mx-auto flex items-center h-full relative justify-center`}
        >
          <h1 className={`text-white font-semibold text-4xl text-center`}>
            Inca Trail to Machu Picchu <span className={`${styles.cirulo}`}></span>
          </h1>
        </div>
        <div className={styles.bannerHeader}></div>
      </div>
      <main>
        <section className={`rounded-t-primary bg-white`}>
          <div className={`container mx-auto bg-white pb-10`}>
            <h2 className={`font-black text-black text-2xl mb-5`}>
              Main Tours
            </h2>
            <div
              className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4`}
            >
              {categories.map((tour) => (
                <Tour key={tour.id} post={tour} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}

export async function getStaticProps() {
  const res = await fetch(
    `${process.env.API_URL}/wp-json/wp/v2/posts?_embed=true&per_page=100`
  );
  const resultado = await res.json();
  let categories = resultado.filter((post) => post.tags[0] == "17");
  //console.log(categories);

  return {
    props: {
      categories,
    },
  };
}
