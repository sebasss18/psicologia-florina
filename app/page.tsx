import Hero from "@/components/home/Hero";
import Reveal from "@/components/shared/Reveal";
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
  "Desarrollar herramientas que favorezcan tu bienestar emocional",
  "Cambiar mecanismos y procesos cognitivos, que favorezcan tus conductas"
];

const eyebrow = "font-serif text-lg italic tracking-wide text-accent";

export default function Home() {
  return (
    <>
      <Hero />

      <section
        id="acerca"
        className="mx-auto max-w-6xl scroll-mt-20 px-6 py-32"
      >
        <div className="grid gap-12 md:grid-cols-[1fr_2fr] md:gap-20">
          <Reveal className="md:sticky md:top-32 md:self-start">
            <p className={eyebrow}>Acerca de mí</p>
            <h2 className="mt-4 font-serif text-4xl leading-tight text-brown sm:text-5xl">
              Psic. Florina Sotelo Mendoza
            </h2>
          </Reveal>

          <div>
            <Reveal delay={0.1}>
              <p className="font-serif text-2xl leading-relaxed text-brown sm:text-3xl">
                Soy psicóloga clínica con enfoque integrativo, especialista en
                Psicotrauma, certificada en EMDR y con diplomado en
                Neuropsicología.
              </p>
              <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted">
                Brindo atención psicológica a adolescentes y adultos, desde una
                perspectiva integral, individualizada y centrada en las
                necesidades de cada persona.
              </p>
            </Reveal>

            <div className="mt-12">
              <Chips items={credenciales} />
            </div>
          </div>
        </div>
      </section>

      <section id="servicios" className="scroll-mt-20 bg-sand">
        <div className="mx-auto max-w-6xl px-6 py-32">
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

      <section className="mx-auto max-w-6xl px-6 py-32">
        <Reveal>
          <p className={eyebrow}>Enfoque</p>
          <h2 className="mt-4 max-w-3xl font-serif text-4xl leading-tight text-brown sm:text-5xl">
            Una atención integral, individualizada y centrada en cada persona
          </h2>
        </Reveal>

        <Reveal className="mt-16" delay={0.1}>
          <FocusPanels items={enfoque} />
        </Reveal>
      </section>

      <section className="bg-sand">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-32 md:grid-cols-[1fr_2fr] md:gap-20">
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
