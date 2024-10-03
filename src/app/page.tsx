
import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <h1>
        Faça seu cadastro aqui!
      </h1>
      <Link className={styles.btn}  href="/cadastro">Cadastro</Link>
    </div>
  );
}
