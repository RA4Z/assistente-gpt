import Head from "next/head";
import { useState } from "react";
import SpeechButton from '../services/SpeechButton'
import 'normalize.css';
import styles from "./index.module.css";

export default function Home() {
  const [animalInput, setAnimalInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ animal: animalInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }
      
      setResult(data.result);
      console.log(data.result)
      setAnimalInput("");
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div className={styles.geral}>
      <Head>
        <title>Assistente</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <main className={styles.main}>
      <iframe src="https://embed.lottiefiles.com/animation/84336" className={styles.icon}></iframe>
        <h3>Pergunte ao assistente</h3>
        <form onSubmit={onSubmit}>
          <input
            id="ValorInserido"
            type="text"
            name="animal"
            placeholder="Pergunte aqui"
            value={animalInput}
            onChange={(e) => setAnimalInput(e.target.value)}
          />
          <SpeechButton />
          <input type="submit" value="Perguntar" />
        </form>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}
