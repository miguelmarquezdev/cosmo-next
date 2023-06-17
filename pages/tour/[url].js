import Layout from "../../components/layout";
import Singletour from "@/components/single-tour";
import Header from "@/components/header";
export default function Producto({ resultado }) {
  console.log(resultado);
  return (
    <Layout
      title={`${resultado[0].yoast_head_json.title}`}
      description={`${resultado[0].yoast_head_json.description}`}
      og_title={`${resultado[0].yoast_head_json.og_title}`}
      og_description={`${resultado[0].yoast_head_json.og_description}`}
      og_locale={`${resultado[0].yoast_head_json.og_description}`}
      og_url={`${resultado[0].yoast_head_json.og_url}`}
      og_sitename={`${resultado[0].yoast_head_json.og_site_name}`}
      og_image={`${resultado[0].yoast_head_json.og_image[0].url}`}
      og_width={`${resultado[0].yoast_head_json.og_image[0].width}`}
      og_height={`${resultado[0].yoast_head_json.og_image[0].height}`}
      og_image_type={`${resultado[0].yoast_head_json.og_image[0].type}`}
    >
      <Header bgslate="bg-primary" />
      {/* {resultado[0].categories_names[0] == "blog" ? (
        <Singleblog key={resultado[0].slug} resultado={resultado} />
      ) : (
        <Singletour key={resultado[0].slug} resultado={resultado} />
      )} */}
       <Singletour key={resultado[0].slug} resultado={resultado} />
    </Layout>
  );
}

export async function getStaticPaths() {
  const respuesta = await fetch(
    `${process.env.API_URL}/wp-json/wp/v2/posts?per_page=100`
  );
  const resultado = await respuesta.json();

  const paths = resultado.map((tour) => ({
    params: {
      url: tour.slug,
    },
  }));

  // console.log(paths);

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { url } }) {
  const respuesta = await fetch(
    `${process.env.API_URL}/wp-json/wp/v2/posts?slug=${url}&_embed=true`
  );
  const resultado = await respuesta.json();
  // console.log(resultado);
  return {
    props: {
      resultado,
    },
  };
}
