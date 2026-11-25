import type { ReactNode } from "react";

const company = {
  name: "KALMUHOOLDUS OÜ",
  regCode: "00000000",
  address: "Näidise tn 1, Tallinn",
  email: "info@example.com",
};

const people = [
  {
    name: "Näidis Isik",
    role: "Juhatuse liige",
    phone: "+372 5555 5555",
    email: "info@example.com",
  },
];

const mapSrc =
  "https://www.google.com/maps?q=Tallinn&z=14&output=embed";

function Icon({ children }: { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-5 w-5 shrink-0"
    >
      {children}
    </svg>
  );
}

const MailIcon = () => (
  <Icon>
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </Icon>
);

const UserIcon = () => (
  <Icon>
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </Icon>
);

const PhoneIcon = () => (
  <Icon>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </Icon>
);

const FacebookIcon = () => (
  <Icon>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </Icon>
);

export default function F() {
  return (
    <footer className="bg-white text-stone-800">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-2">
        <div className="md:border-r md:border-stone-200 md:pr-12">
          <h2 className="text-4xl font-bold tracking-tight">{company.name}</h2>
          <p className="mt-4 text-lg">Registrikood: {company.regCode}</p>
          <p className="text-lg font-medium">
            Juriidiline aadress: {company.address}
          </p>
          <a
            href={`mailto:${company.email}`}
            className="mt-6 flex items-center gap-3 text-lg hover:underline"
          >
            <MailIcon />
            {company.email}
          </a>

          <div className="mt-8 space-y-8 border-t border-stone-200 pt-8">
            {people.map((p) => (
              <div key={p.name}>
                <h3 className="text-xl font-semibold">{p.name}</h3>
                <ul className="mt-2 space-y-2 text-lg">
                  <li className="flex items-center gap-3">
                    <UserIcon />
                    {p.role}
                  </li>
                  <li>
                    <a
                      href={`tel:${p.phone.replace(/\s/g, "")}`}
                      className="flex items-center gap-3 hover:underline"
                    >
                      <PhoneIcon />
                      {p.phone}
                    </a>
                  </li>
                  <li>
                    <a
                      href={`mailto:${p.email}`}
                      className="flex items-center gap-3 hover:underline"
                    >
                      <MailIcon />
                      {p.email}
                    </a>
                  </li>
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-8 flex items-center gap-4">
            <a
              href="#"
              aria-label="Facebook"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full p-2 hover:bg-stone-100"
            >
              <FacebookIcon />
            </a>
            <a
              href="#"
              aria-label="Storybook"
              title="Vaata ettevõtte profiili Storybookis"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-full text-xl font-black hover:bg-stone-100"
            >
              S
            </a>
          </div>
        </div>

        <div className="h-80 overflow-hidden rounded-lg bg-stone-100 md:h-full md:min-h-96">
          <iframe
            title="Asukoht kaardil"
            src={mapSrc}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-full w-full border-0"
          />
        </div>
      </div>

      <p className="border-t border-stone-200 py-4 text-center text-stone-500">
        © {new Date().getFullYear()} {company.name}
      </p>
    </footer>
  );
}
