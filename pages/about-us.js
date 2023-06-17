import Image from "next/image";
import Layout from "../components/layout";
import Header from "@/components/header";

export default function Aboutus() {
  return (
    <main>
      <Layout
        title={"Nosotros"}
        description={"Sobre Nosotros, guitarLA Tienda de Música"}
      >
        <Header bgslate="bg-primary" />
        <section className={` bg-primary `}>
          <div className={`rounded-t-primary  bg-white`}>
            <div className={`max-w-5xl mx-auto bg-white py-5 flex gap-3`}>

            </div>
          </div>
        </section>
        <section className="max-w-5xl mx-auto mb-20 px-4 sm:px-4 md:px-4 lg:px-0">
          <h1 className="text-center font-black text-3xl text-primary">About Us</h1>
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mt-10">
            <div>
              <Image src="/img/banners/mission.jpg" width={800} height={200} alt="mission" className="rounded-xl" />
              <h2 className="font-bold text-2xl py-5">Mission</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat odio molestiae cum cumque exercitationem expedita pariatur aspernatur laborum, culpa quis modi, quos soluta suscipit, voluptatibus laboriosam iusto tempora. Nesciunt rerum molestias ea fugit maiores illum doloribus error officia, eligendi aut quod, voluptatem ratione, hic corporis veritatis! Cumque laboriosam magnam necessitatibus in facilis quo et. Sequi laborum delectus enim repudiandae, excepturi voluptate quos veritatis sed. Id tenetur nobis doloribus blanditiis aspernatur commodi quas eos inventore, repellat, dolores dolorem impedit repellendus? Explicabo.</p>
            </div>
            <div>
              <Image src="/img/banners/vision.jpg" width={800} height={200} alt="vision" className="rounded-xl" />
              <h2 className="font-bold text-2xl py-5">Vision</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat odio molestiae cum cumque exercitationem expedita pariatur aspernatur laborum, culpa quis modi, quos soluta suscipit, voluptatibus laboriosam iusto tempora. Nesciunt rerum molestias ea fugit maiores illum doloribus error officia, eligendi aut quod, voluptatem ratione, hic corporis veritatis! Cumque laboriosam magnam necessitatibus in facilis quo et. Sequi laborum delectus enim repudiandae, excepturi voluptate quos veritatis sed. Id tenetur nobis doloribus blanditiis aspernatur commodi quas eos inventore, repellat, dolores dolorem impedit repellendus? Explicabo.</p>
            </div>
          </div>
          <div className="bg-blue-50 p-10 rounded-xl my-20 max-w-5xl mx-auto">
            <p className="first-line:uppercase first-line:tracking-widest   first-letter:text-7xl first-letter:font-bold first-letter:text-black   first-letter:mr-3 first-letter:float-left">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga ad sed ex nam inventore, pariatur molestiae tempore illum dicta quia deleniti vero voluptas illo dolores aut ipsam! Non consequatur provident ea veritatis, quod reiciendis fugiat repellat. Sint voluptatum officia, et, aliquam esse voluptate explicabo ipsum aliquid minima, consectetur in earum!</p>
          </div>
          <div>
            <h2 className="text-center font-black text-3xl text-primary">Our Team</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
              <div>
                <Image src="/img/banners/designer.jpg" width={800} height={200} alt="mission" className="rounded-xl" />
                <h2 className="font-bold text-2xl py-5 text-center">Designer</h2>
              </div>
              <div>
                <Image src="/img/banners/coach.jpg" width={800} height={200} alt="vision" className="rounded-xl" />
                <h2 className="font-bold text-2xl py-5 text-center">Coach</h2>
              </div>
              <div>
                <Image src="/img/banners/seo.jpg" width={800} height={200} alt="vision" className="rounded-xl" />
                <h2 className="font-bold text-2xl py-5 text-center">Seo</h2>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </main>
  );
}
