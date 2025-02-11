"use client";
import { Section } from "./components/Hero/Section";
import StarField from "./components/LightSpeed";
import { Slider } from "./components/SliderDouble";
import { Title } from "./components/Title";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className="container-full">
          <StarField />
        </div>
        <div className="container-full">
          <Section padding="150px 0 20px 0">
            <Title>Stacks</Title>
            <p>Lorem Ipsum dolor sit ammet</p>
            <div style={{ marginTop: '100px', width: '100%' }}>
              <Slider />
              <Slider reverse />
            </div>
          </Section>
        </div>

        <div className="container-full">
          <Section >
            <Title>Projetos</Title>
            <p>Lorem Ipsum dolor sit ammet</p>
          </Section>
        </div>

        <div className="container-full">
          <Section >
            <Title>Sobre</Title>
            <p>Lorem Ipsum dolor sit ammet</p>
          </Section>
        </div>

        <div className="container-full">
          <Section >
            <Title>Contato</Title>
            <p>Lorem Ipsum dolor sit ammet</p>
          </Section>
        </div>

      </main>
    </div>
  );
}
