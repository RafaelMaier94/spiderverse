import { Quicksand } from "next/font/google";
import Image from "next/image";

import styles from "./heroDetails.module.scss";

import { spidermanFont } from "@/fonts";
import { Hero } from "@/interfaces/heroes";

const quicksand = Quicksand({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
});

interface Props {
  data: Hero;
}

const HeroDetails: React.FC<Props> = ({ data }) => {
  if (!data) return;
  const { id, name, universe, details } = data;
  return (
    <div className={quicksand.className}>
      <h1 className={`${spidermanFont.className} ${styles.title}`}>
        {name} (Universo-{universe})
      </h1>
      <div className={styles.details}>
        <h2 className={styles.subtitle}>Informações</h2>
        <table className={styles.table}>
          <tbody>
            <tr>
              <td className={styles.label}>Nome Completo:</td>
              <td>{details.fullName}</td>
            </tr>
            <tr>
              <td className={styles.label}>Data de Nascimento:</td>
              <td>{new Date(details.birthday).toLocaleDateString("pt-BR")}</td>
            </tr>
            <tr>
              <td className={styles.label}>Terra Natal:</td>
              <td>{details.homeland}</td>
            </tr>
            <tr>
              <td className={styles.label}>Altura:</td>
              <td>
                {details.height.toLocaleString("pt-BR", {
                  maximumFractionDigits: 2,
                })}
              </td>
            </tr>
            <tr>
              <td className={styles.label}>Peso:</td>
              <td>
                {details.weight.toLocaleString("pt-BR", {
                  maximumFractionDigits: 2,
                })}
                kg
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className={styles.details}>
        <h2 className={styles.subtitle}>Primeira Aparição</h2>
        <Image
          src={`/spiders/${id}-comic-book.png`}
          alt={`Primeira aparição nos quadrinhos de ${name} no universo ${universe}`}
          width={80}
          height={122}
        />
      </div>
    </div>
  );
};

export default HeroDetails;
