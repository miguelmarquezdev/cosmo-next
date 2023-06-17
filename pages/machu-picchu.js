import Tour from "@/components/tour";
import Layout from "../components/layout";
import styles from "../styles/grid.module.css";
import Header from "@/components/header";

export default function Machupicchu({ categories }) {
  console.log(categories);

  return (
    <Layout
      title={"Machu Picchu Tours - Cosmo Expeditions"}
      description={
        "Machu Picchu Tours From Cusco"
      }
    >
      <Header bgslate="bg-transparent absolute w-full z-10" />
      <div
        className={`bg-machu-picchu w-full h-96 relative bg-no-repeat bg-cover bg-center ${styles.bgfondo}`}
      >
        <div
          className={`container mx-auto flex items-center h-full relative justify-center`}
        >
          <h1 className={`text-white font-semibold text-4xl text-center`}>
            Machu Picchu <span className={`${styles.cirulo}`}></span>
          </h1>
        </div>
        <div className={styles.bannerHeader}></div>
      </div>
      <main>
        <section className={`rounded-t-primary bg-white`}>
          <div className={`container mx-auto px-4 sm:px-4 md:px-4 lg:px-0 bg-white pb-10`}>
            <h2 className={`font-black text-black text-3xl mt-5 mb-10`}>
              Main Tours
            </h2>
            <div className="max-w-5xl">
              <div
                className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10`}
              >
                {categories.map((tour) => (
                  <Tour key={tour.id} post={tour} />
                ))}
              </div>
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
  let categories = resultado.filter((post) => post.tags[0] == "18");
  //console.log(categories);

  return {
    props: {
      categories,
    },
  };
}
