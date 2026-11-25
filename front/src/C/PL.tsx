export type PriceRow = {
  id: string;
  name: string;
  description: string;
  amount: string;
  price: string;
};

// Placeholders. Replace with the rows the admin adds.
const placeholderRows: PriceRow[] = [
  {
    id: "1",
    name: "Hauaplatsi hooldus",
    description: "...",
    amount: "1x",
    price: "00€",
  },
];

export default function PL({ rows = placeholderRows }: { rows?: PriceRow[] }) {
  return (
    <section className="bg-white text-stone-800">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <h1 className="font-my-font text-4xl font-bold tracking-tight">
          Hinnakirja leht
        </h1>
        <p className="mt-6 text-xl text-stone-600">
          Siit leiate meie teenuste/toodete hinnastuse.
        </p>

        <div className="mt-16 overflow-x-auto">
          <table className="w-full min-w-xl border-collapse text-left">
            <thead>
              <tr className="border-b-2 border-stone-700 bg-neutral-50">
                <th scope="col" className="w-2/5 px-3 py-3 font-semibold">
                  Hinnakiri koostamisel
                </th>
                <th scope="col" className="px-3 py-3">
                  <span className="sr-only">Kirjeldus</span>
                </th>
                <th scope="col" className="px-3 py-3 font-semibold">
                  Maht
                </th>
                <th scope="col" className="px-3 py-3 font-semibold">
                  Hind
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id} className="border-b border-stone-200">
                  <td className="px-3 py-3">{row.name}</td>
                  <td className="px-3 py-3">{row.description}</td>
                  <td className="px-3 py-3">{row.amount}</td>
                  <td className="px-3 py-3">{row.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
