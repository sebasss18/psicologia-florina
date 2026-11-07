import Link from "next/link";
import NavLink from "./NavLinks";
import CurrentYear from "./CurrentYear";

const links = [
  { href: "#acerca", label: "Acerca de mí" },
  { href: "#servicios", label: "Servicios" },
  { href: "#contacto", label: "Contacto" },
];

const contacto = [
  {
    label: "Teléfono",
    value: "663561901",
    href: "tel:+52663561901",
  },
  {
    label: "Correo",
    value: "florinasotelo.m@gmail.com",
    href: "mailto:florinasotelo.m@gmail.com",
  },
  {
    label: "Ubicación",
    value: "Av. No reelección No. 12",
    href: "https://www.google.com/maps/search/?api=1&query=Av.+No+reelecci%C3%B3n+12",
  },
];

const ease = "ease-[cubic-bezier(0.22,1,0.36,1)]";

function ContactItem({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href: string;
}) {
  const external = href.startsWith("http");
  return (
    <li className="text-sm">
      <span className="block text-xs uppercase tracking-[0.2em] text-brown/50">
        {label}
      </span>
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="group mt-1 inline-flex items-center gap-2 break-all text-brown transition-colors duration-500 hover:text-accent"
      >
        {value}
        <svg
          viewBox="0 0 16 16"
          className={`h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all duration-500 ${ease} group-hover:translate-x-0 group-hover:opacity-100`}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          aria-hidden="true"
        >
          <path d="M3 8h10M9 4l4 4-4 4" />
        </svg>
      </a>
    </li>
  );
}

function BackToTop() {
  return (
    <Link
      href="#inicio"
      className="group inline-flex items-center gap-2 text-xs tracking-wide text-muted transition-colors duration-500 hover:text-brown"
    >
      Volver arriba
      <svg
        viewBox="0 0 16 16"
        className={`h-4 w-4 transition-transform duration-500 ${ease} group-hover:-translate-y-1`}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        aria-hidden="true"
      >
        <path d="M8 13V3M4 7l4-4 4 4" />
      </svg>
    </Link>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-brown/10 bg-sand">
      <div className="mx-auto max-w-6xl px-6 pt-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="font-serif text-xl text-brown">
                Psicóloga Florina S. Mendoza
              </span>
            </Link>
          </div>

          <nav aria-label="Navegación del pie">
            <h3 className="text-xs uppercase tracking-[0.2em] text-brown/60">
              Explorar
            </h3>
            <ul className="mt-5 flex flex-col gap-2 pl-3">
              {links.map((link) => (
                <li key={link.href}>
                  <NavLink href={link.href} label={link.label} />
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] text-brown/60">
              Contacto
            </h3>
            <ul className="mt-5 flex flex-col gap-5">
              {contacto.map((item) => (
                <ContactItem key={item.label} {...item} />
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-brown/10 py-6 text-xs text-muted sm:flex-row">
          <p>
            © <CurrentYear /> Psicóloga Florina
          </p>
          <BackToTop />
        </div>
      </div>
    </footer>
  );
}
