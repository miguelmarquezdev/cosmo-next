import Image from "next/image"
import Link from "next/link"
import styles from '../styles/guitarras.module.css'
export default function Guitarra({ guitarra }) {
  const { descripcion, imagen, nombre, precio, url } = guitarra
  // console.log(guitarra)
  return (
    <div className={styles.guitarra}>
      <Image src={imagen.data.attributes.url} width={245} height={500} alt={`Imagen guitarra ${nombre}`} />
      <div className={styles.contenido}>
        <h3>{nombre}</h3>
        <p className={styles.descripcion}>{descripcion}</p>
        <p className={styles.precio}>${precio}</p>
        <Link href={`/guitarras/${url}`}  className={styles.enlace}>
          Ver Producto
        </Link>
      </div>
    </div>
  )
}
