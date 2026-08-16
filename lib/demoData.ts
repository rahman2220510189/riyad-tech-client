/**
 * Sample documents for the hero extraction demo (spec §4.2).
 *
 * Everything here is canned. No API call, no backend, no cost — and it is
 * honest, because the demo never claims to be reading the visitor's own file.
 *
 * The documents are deliberately European: a Dutch invoice with a real BTW
 * number format and comma decimals, a Polish CV, a Venlo-to-Dublin air waybill.
 * A visitor should recognise the paperwork from their own desk.
 *
 * The layout is data, not markup, so these documents can move into the database
 * later without rewriting the component.
 */

/** A run of text inside a line. A number is an index into `fields`. */
export type Segment = string | number;

export type Line = {
  segs: Segment[];
  /** Heavier weight, --ink instead of --ink-soft */
  strong?: boolean;
  /** Mono, uppercase, --muted — a form label printed on the document */
  label?: boolean;
  /** The document's own title line */
  lead?: boolean;
};

export type Block =
  | { t: "split"; left: Line[]; right: Line[] }
  | { t: "row"; left: Line; right: Line }
  | { t: "line"; line: Line }
  | { t: "rule" };

export type Field = {
  key: string;
  /** Rendered verbatim into the JSON pane, quotes included where they belong */
  value: string;
};

export type DemoDoc = {
  id: string;
  /** Button label, and the name shown in the panel header */
  name: string;
  /** Read out to screen readers in place of the animation */
  description: string;
  fields: Field[];
  body: Block[];
};

const line = (segs: Segment[], extra: Omit<Line, "segs"> = {}): Line => ({
  segs,
  ...extra,
});

export const demoDocs: DemoDoc[] = [
  {
    id: "invoice",
    name: "Invoice",
    description:
      "A Dutch supplier invoice. Six fields are extracted: supplier, invoice number, invoice date, due date, VAT number and total.",
    fields: [
      { key: "supplier", value: '"Kessler Verpakkingen BV"' },
      { key: "invoice_number", value: '"INV-2026-0847"' },
      { key: "invoice_date", value: '"2026-03-14"' },
      { key: "due_date", value: '"2026-04-13"' },
      { key: "vat_number", value: '"NL841296573B01"' },
      { key: "total_eur", value: "4157.56" },
    ],
    body: [
      {
        t: "split",
        left: [
          line([0], { strong: true }),
          line(["Industrieweg 44"]),
          line(["5928 PK Venlo"]),
          line(["Nederland"]),
          line(["BTW ", 4]),
        ],
        right: [
          line(["Factuur"], { label: true }),
          line(["Nr. ", 1]),
          line(["Datum ", 2]),
          line(["Verval ", 3]),
        ],
      },
      { t: "rule" },
      {
        t: "row",
        left: line(["Golfkarton A4 300g · 1.200"]),
        right: line(["€2.220,00"]),
      },
      { t: "row", left: line(["Krimpfolie 50µ · 40"]), right: line(["€496,00"]) },
      {
        t: "row",
        left: line(["Palletlabels 100x150 · 8.000"]),
        right: line(["€720,00"]),
      },
      { t: "rule" },
      { t: "row", left: line(["Subtotaal"]), right: line(["€3.436,00"]) },
      { t: "row", left: line(["BTW 21%"]), right: line(["€721,56"]) },
      {
        t: "row",
        left: line(["Totaal"], { strong: true }),
        right: line([5], { strong: true }),
      },
    ],
  },

  {
    id: "cv",
    name: "CV",
    description:
      "A candidate CV. Six fields are extracted: name, job title, location, email, years of experience and skills.",
    fields: [
      { key: "full_name", value: '"Marta Nowak"' },
      { key: "title", value: '"Senior Backend Engineer"' },
      { key: "location", value: '"Kraków, PL"' },
      { key: "email", value: '"m.nowak@example.com"' },
      { key: "years_experience", value: "10" },
      {
        key: "skills",
        value: '["Python", "Go", "PostgreSQL", "Kubernetes"]',
      },
    ],
    body: [
      { t: "line", line: line([0], { lead: true }) },
      { t: "line", line: line([1]) },
      { t: "line", line: line([2, " · ", 3]) },
      { t: "rule" },
      { t: "line", line: line(["Experience"], { label: true }) },
      { t: "line", line: line(["Backend Engineer — Allegro"], { strong: true }) },
      { t: "line", line: line([4]) },
      { t: "line", line: line(["Payments platform, 40M requests a day."]) },
      { t: "line", line: line(["Developer — Ailleron"], { strong: true }) },
      { t: "line", line: line(["2016 — 2018"]) },
      { t: "rule" },
      { t: "line", line: line(["Skills"], { label: true }) },
      { t: "line", line: line([5]) },
    ],
  },

  {
    id: "shipping",
    name: "Shipping doc",
    description:
      "An air waybill. Six fields are extracted: waybill number, shipper, consignee, piece count, gross weight and incoterms.",
    fields: [
      { key: "awb_number", value: '"176-44829931"' },
      { key: "shipper", value: '"Kessler Verpakkingen BV"' },
      { key: "consignee", value: '"Byrne Packaging Ltd"' },
      { key: "pieces", value: "6" },
      { key: "gross_weight_kg", value: "412.5" },
      { key: "incoterms", value: '"DAP"' },
    ],
    body: [
      {
        t: "row",
        left: line(["Air waybill"], { label: true }),
        right: line([0], { strong: true }),
      },
      { t: "rule" },
      { t: "line", line: line(["Shipper"], { label: true }) },
      { t: "line", line: line([1, ", Venlo NL"]) },
      { t: "line", line: line(["Consignee"], { label: true }) },
      { t: "line", line: line([2, ", Dublin IE"]) },
      { t: "rule" },
      { t: "row", left: line(["Pieces"]), right: line([3], { strong: true }) },
      {
        t: "row",
        left: line(["Gross weight"]),
        right: line([4], { strong: true }),
      },
      { t: "row", left: line(["Incoterms"]), right: line([5], { strong: true }) },
      {
        t: "row",
        left: line(["Flight"]),
        right: line(["EI-338 · 17-03-2026"]),
      },
    ],
  },
];

/** Timings in ms. Spec §4.2. */
export const demoTiming = {
  scan: 1200,
  fieldGap: 250,
  /** Characters revealed per tick, and the tick interval */
  typeChars: 1,
  typeTick: 16,
  /** Rest after the last field before the loop restarts */
  rest: 2000,
  loop: 12000,
} as const;