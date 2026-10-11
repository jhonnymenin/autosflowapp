import { ChevronDown, Search } from "@/components/icons";
import { bodiesWithCounts, makesWithCounts, priceBands } from "@/lib/stock";

/**
 * Busca rápida da home.
 *
 * Três perguntas que decidem a maior parte das buscas — marca, quanto quer
 * gastar e que tipo de carro — num formulário GET comum: funciona antes do
 * JavaScript e leva direto ao estoque já filtrado.
 */
export function QuickSearch() {
  const fields = [
    {
      name: "marca",
      label: "Marca",
      placeholder: "Todas as marcas",
      options: makesWithCounts().map((entry) => ({
        value: entry.make,
        label: entry.make,
      })),
    },
    {
      name: "preco",
      label: "Faixa de preço",
      placeholder: "Qualquer valor",
      options: priceBands.map((band) => ({
        value: band.value,
        label: band.label,
      })),
    },
    {
      name: "carroceria",
      label: "Tipo de carro",
      placeholder: "Todos os tipos",
      options: bodiesWithCounts().map((entry) => ({
        value: entry.body,
        label: entry.label,
      })),
    },
  ];

  return (
    <form
      action="/veiculos"
      method="get"
      role="search"
      aria-label="Busca rápida no estoque"
      className="relative z-10 mx-auto mt-3 grid grid-cols-2 gap-2 rounded-card border border-border bg-surface p-2.5 shadow-lift lg:-mt-10 lg:w-[calc(100%-5rem)] lg:grid-cols-[repeat(3,minmax(0,1fr))_auto] lg:p-3"
    >
      {fields.map((field, index) => (
        <div
          key={field.name}
          className={`relative ${index === 2 ? "col-span-2 lg:col-span-1" : ""}`}
        >
          <label
            htmlFor={`rapida-${field.name}`}
            className="pointer-events-none absolute left-4 top-2.5 text-[0.6875rem] font-semibold text-foreground-muted"
          >
            {field.label}
          </label>
          <select
            id={`rapida-${field.name}`}
            name={field.name}
            defaultValue=""
            className="h-15 w-full cursor-pointer appearance-none rounded-control border border-transparent bg-surface-raised pb-2.5 pl-4 pr-10 pt-6 text-[0.9375rem] font-medium text-foreground outline-none transition-colors hover:border-border-strong focus:border-brand"
          >
            <option value="">{field.placeholder}</option>
            {field.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground-subtle" />
        </div>
      ))}
      <button
        type="submit"
        className="inline-flex h-15 items-center justify-center gap-2.5 rounded-control bg-brand px-8 text-[0.9375rem] font-semibold text-white transition-colors duration-300 hover:bg-brand-deep col-span-2 lg:col-span-1"
      >
        <Search className="h-4.5 w-4.5" />
        Buscar carros
      </button>
    </form>
  );
}
