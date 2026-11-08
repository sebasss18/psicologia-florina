import Image from "next/image";
import Hero from "@/components/home/Hero";
import Reveal from "@/components/shared/Reveal";
import {
  Branch,
  Dots,
  Glow,
  Grain,
  Leaf,
  Rings,
  SoftArch,
  Wave,
} from "@/components/shared/Decor";
import Chips from "@/components/home/Chips";
import FocusList from "@/components/home/FocusList";
import FocusPanels from "@/components/home/FocusPanels";
import Steps from "@/components/home/Steps";
import ScrollWords from "@/components/home/ScrollWords";

const credenciales = [
  "Psicóloga clínica",
  "Enfoque integrativo",
  "Especialista en Psicotrauma",
  "Certificada en EMDR",
  "Diplomado en Neuropsicología",
  "Adolescentes y adultos",
];

const problematicas = [
  "Ansiedad persistente",
  "Hipervigilancia",
  "Miedo",
  "Inseguridad",
  "Baja autoestima",
  "Dificultades para establecer vínculos",
  "Culpa",
  "Vergüenza",
  "Desregulación emocional",
  "Patrones de comportamiento",
];

const enfoque = [
  {
    title: "Integral",
    description:
      "Consideramos todas las dimensiones de tu vida: emocional, cognitiva, corporal y relacional. Integro distintas herramientas y modelos terapeuticos, como EMDR y conocimientos de neuropsicología, para comprender el trauma desde su origen y acompañar tu proceso de manera completa. ",
  },
  {
    title: "Individualizada",
    description:
      "Cada historia es única, por eso no existen fórmulas generales. El tratamiento se adapta a tus necesidades, tu ritmo y tus objetivos, respetando siempre tu proceso personal y tus tiempos de recuperación.",
  },
  {
    title: "Centrada en la persona",
    description:
      "Tú eres el centro de la terapia. Te ofrezco un espacio seguro, libre de juicios, donde puedas expresarte con confianza, sentirte escuchado(a) y ser protagonista de tu propio proceso de sanación.",
  },
];

const objetivo = [
  "Comprender lo que estás viviendo",
  "Identificar las raíces de tu malestar",
  "Desarrollar herramientas que favorezcan tus conductas",
  "Cambiar mecanismos y procesos cognitivos, que favorezcan tus conductas",
];

const eyebrow = "font-serif text-lg italic tracking-wide text-accent";

export default function Home() {
  return (
    <>
      <Hero />

      <section id="acerca" className="relative scroll-mt-20 overflow-hidden">
        <Leaf
          flip
          className="-right-8 top-12 h-56 w-32 text-accent/25 sm:right-6 sm:h-80 sm:w-48"
        />
        <Branch className="-left-10 bottom-6 hidden h-40 w-96 text-accent/25 lg:block" />
        <Dots className="left-16 top-16 h-28 w-28" />
        <Dots className="bottom-20 right-24 h-24 w-24" />

        <div className="relative mx-auto max-w-6xl px-6 py-32">
          <div className="grid items-center gap-16 md:grid-cols-[auto_1fr] md:gap-24">
            <Reveal className="mx-auto">
              <div className="relative w-64 sm:w-72 md:w-80">
                <div
                  aria-hidden="true"
                  className="absolute -inset-12 bg-[radial-gradient(closest-side,theme(colors.accent-soft),theme(colors.accent-soft/0))] opacity-50"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 translate-x-4 translate-y-4 rounded-t-full bg-sand-strong"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 -translate-x-3 -translate-y-3 rounded-t-full border border-accent/40"
                />
                <div className="relative aspect-[3/4] overflow-hidden rounded-t-full">
                  <Image
                    src="/foto-florina.jpeg"
                    alt="Psic. Florina Sotelo Mendoza"
                    fill
                    sizes="(min-width: 768px) 320px, (min-width: 640px) 288px, 256px"
                    className="object-cover object-top"
                  />
                </div>
              </div>
            </Reveal>

            <div>
              <Reveal>
                <p className={eyebrow}>Acerca de mí</p>
                <h2 className="mt-4 font-serif text-4xl leading-tight text-brown sm:text-5xl">
                  Psic. Florina Sotelo Mendoza
                </h2>
              </Reveal>

              <Reveal delay={0.1} className="mt-10">
                <p className="font-serif text-2xl leading-relaxed text-brown sm:text-3xl">
                  Soy psicóloga clínica con enfoque integrativo, especialista en
                  Psicotrauma, certificada en EMDR y con diplomado en
                  Neuropsicología.
                </p>
                <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted">
                  Brindo atención psicológica a adolescentes y adultos, desde
                  una perspectiva integral, individualizada y centrada en las
                  necesidades de cada persona.
                </p>
              </Reveal>

              <div className="mt-12">
                <Chips items={credenciales} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="servicios"
        className="relative scroll-mt-20 overflow-hidden bg-sand"
      >
        <Grain />
        <Glow className="-right-24 -top-24 h-80 w-80 bg-accent-soft/30 sm:h-[26rem] sm:w-[26rem]" />
        <Glow className="-bottom-32 -left-24 hidden h-96 w-96 bg-accent-soft/20 lg:block" />
        <Wave className="top-10" />
        <Leaf className="-left-6 top-24 hidden h-72 w-44 text-accent/20 lg:block" />
        <Branch
          flip
          className="-right-10 bottom-4 hidden h-40 w-96 text-accent/25 lg:block"
        />
        <Dots className="right-20 top-28 h-28 w-28" />

        <div className="relative mx-auto max-w-6xl px-6 py-32">
          <Reveal>
            <p className={eyebrow}>Áreas de trabajo</p>
            <h2 className="mt-4 max-w-3xl font-serif text-4xl leading-tight text-brown sm:text-5xl">
              Trabajo con problemáticas relacionadas con el trauma
            </h2>
          </Reveal>

          <div className="mt-16">
            <FocusList items={problematicas} />
          </div>

          <Reveal className="mt-10">
            <p className="max-w-2xl text-lg leading-relaxed text-muted">
              Patrones que pueden tener su origen en experiencias dolorosas del
              pasado.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden">
        <Rings className="-left-6 top-1/3 hidden sm:block" />
        <Rings className="-right-10 bottom-10 sm:hidden" />
        <SoftArch className="-right-10 top-24 h-80 w-52" />
        <Leaf
          flip
          className="-right-4 bottom-0 hidden h-72 w-44 text-accent/20 lg:block"
        />
        <Branch className="-left-12 bottom-10 hidden h-36 w-80 text-accent/20 xl:block" />
        <Dots className="left-24 top-20 h-24 w-24" />

        <div className="relative mx-auto max-w-6xl px-6 py-32">
          <Reveal>
            <p className={eyebrow}>Enfoque</p>
            <h2 className="mt-4 max-w-3xl font-serif text-4xl leading-tight text-brown sm:text-5xl">
              Una atención integral, individualizada y centrada en cada persona
            </h2>
          </Reveal>

          <Reveal className="mt-16" delay={0.1}>
            <FocusPanels items={enfoque} />
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-clip bg-sand">
        <Grain />
        <Wave className="bottom-10" />
        <Leaf className="-left-4 bottom-0 hidden h-72 w-44 text-accent/20 md:block" />
        <SoftArch className="-right-8 top-16 h-72 w-44" />
        <Branch
          flip
          className="right-24 top-6 hidden h-36 w-80 text-accent/20 xl:block"
        />
        <Dots className="bottom-24 right-1/3 h-24 w-24" />

        <div className="relative mx-auto grid max-w-6xl gap-12 px-6 py-32 md:grid-cols-[1fr_2fr] md:gap-20">
          <Reveal className="md:sticky md:top-32 md:self-start">
            <p className={eyebrow}>Mi objetivo</p>
            <h2 className="mt-4 font-serif text-4xl leading-tight text-brown sm:text-5xl">
              Ayudarte a
            </h2>
          </Reveal>

          <Steps items={objetivo} />
        </div>
      </section>

      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
        >
          <div className="absolute -left-20 top-10 h-96 w-96 rounded-full bg-accent-soft/40 blur-3xl" />
          <div className="absolute -right-24 bottom-0 h-[28rem] w-[28rem] rounded-full bg-sand-strong/80 blur-3xl" />
        </div>
        <Grain />
        <Rings className="left-1/2 top-1/2" />
        <Leaf className="-left-6 bottom-0 hidden h-80 w-48 text-accent/25 lg:block" />
        <Leaf
          flip
          className="-right-6 bottom-0 hidden h-80 w-48 text-accent/25 lg:block"
        />
        <Dots className="left-1/4 top-16 h-24 w-24" />
        <Dots className="bottom-16 right-1/4 h-24 w-24" />

        <div className="relative mx-auto max-w-4xl px-6 py-40 text-center">
          <ScrollWords
            text="Porque muchas veces lo que hoy nos duele tiene una historia detrás, y comprenderla puede ser el primer paso hacia la recuperación."
            className="font-serif text-3xl leading-snug text-brown sm:text-5xl"
          />
        </div>
      </section>
    </>
  );
}
