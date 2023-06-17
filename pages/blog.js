import Post from "@/components/post";
import Layout from "../components/layout";
import Header from "@/components/header";

export default function Incatrail({ categories }) {

  return (
    <Layout title={"Blog - Enjoy Peru"} description={"Our Blog"}>
      <Header bgslate="bg-primary" />
      <main className="bg-primary">
        <section className={`rounded-t-primary bg-white`}>
          <div className={`max-w-5xl px-4 sm:px-4 md:px-4 lg:px-0 mx-auto bg-white pb-10`}>
            <h1 className="font-black text-black  text-3xl  py-5">Blog</h1>
            <hr className="mb-10" />
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
  let categories = resultado.filter((blog) => blog.categories[0] == "14");

  return {
    props: {
      categories,
    },
  };
}
