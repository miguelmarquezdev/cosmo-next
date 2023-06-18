import Layout from "../components/layout";
import Header from "@/components/header";
import styles from "../styles/grid.module.css";
import Page from "@/components/page";
import Post from "@/components/post";


export default function Home({ pages,categories }) {
  
  return (
    <Layout
      title={"Machu Picchu Tours - Cosmo Expeditions"}
      description={
        "Machu Picchu Tours From Cusco"
      }
    >
      <Header bgslate="bg-transparent absolute w-full z-10" />
      <div
        className={`bg-celular sm:bg-celular md:bg-cosmo w-full h-mitad relative bg-no-repeat bg-cover bg-center ${styles.bgfondo}`}
      >
        <div
          className={`container mx-auto flex items-center h-full relative justify-center`}
        >
          <h1 className={`text-white font-semibold text-4xl text-center`}>
            Discover the world with us and create memories <br /> that will last a lifetime <span className={`${styles.cirulo}`}></span>
          </h1>
        </div>
        <div className={styles.bannerHeader}></div>
      </div>
      <main>
        <section className={`rounded-t-primary bg-white`}>
          <div className={`container px-4 sm:px-4 md:px-4 lg:mx-auto  bg-white pb-10`}>
            
            <div className="max-w-5xl mx-auto">
            <h2 className={`font-black text-black text-3xl mt-5 mb-5`}>
              Main Destinations
            </h2>
            <hr className="mb-10"/>
              <div
                className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 md:gap-5 lg:gap-10`}
              >
                {pages.map((page) => (
                  <Page key={page.id} page={page} />
                ))}
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className={`max-w-5xl px-4 sm:px-4 md:px-4 lg:px-0 mx-auto bg-white pb-10`}>
              <h2 className="font-black text-black  text-3xl  py-5">Latest Posts</h2>
              <hr className="mb-10"/>
              <div>
                {categories.map((tour) => (
                  <Post key={tour.id} post={tour} />
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
  let pages = resultado.filter((page) => page.tags[0] == "20" || page.tags[1] == "20");
  let categories = resultado.filter((blog) => blog.categories[0] == "14");

  return {
    props: {
      pages,
      categories
    },
  };
}

