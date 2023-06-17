import Image from "next/image";
import Layout from "../components/layout";
import styles from '../styles/nosotros.module.css'
import Header from "@/components/header";

export default function Nosotros() {
  return (
    <div>
      <Layout
        title={"Nosotros"}
        description={"Sobre Nosotros, guitarLA Tienda de Música"}
      >
        <Header bgslate="bg-primary"/>
        <main>
          <h1 className="heading">Nosotros</h1>
          <div className={styles.contenido}>
            <Image src="/img/sobre-nosotros.jpg" width={1000} height={800}  alt="Imagen sobre nosotros"/>
            <div>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa
                at reiciendis sint delectus illum impedit odio voluptatum.
                Corporis quae est consectetur architecto labore nisi voluptatum
                blanditiis ?
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa
                at reiciendis sint delectus illum impedit odio voluptatum.
                Corporis quae est consectetur  
              </p>
            </div>
          </div>
        </main>
      </Layout>
    </div>
  );
}
