import { Container } from "@/components/layout/Container";

export const metadata = {
  title: "Our Services | Silicon Real Estate (Pvt.) Ltd.",
  description:
    "Silicon Real Estate delivers a full spectrum of property services — sales, rentals, investment advisory, management, and valuation — tailored to the Bangladeshi market.",
};

const services = [
  {
    title: "Property Sales",
    description:
      "End-to-end assistance for buying and selling residential and commercial properties across Dhaka.",
  },
  {
    title: "Property Rentals",
    description:
      "Comprehensive rental management — tenant sourcing, lease agreements, and ongoing support.",
  },
  {
    title: "Investment Advisory",
    description:
      "Data-driven guidance to help you identify high-yield properties and maximise your return on investment.",
  },
  {
    title: "Property Management",
    description:
      "Hassle-free management of your property portfolio including maintenance coordination and rent collection.",
  },
  {
    title: "Valuation & Appraisal",
    description:
      "Accurate market valuations conducted by certified professionals for buying, selling, or financing purposes.",
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <Container>
          <div className="max-w-3xl">
            <p className="text-sm font-medium text-secondary mb-3 uppercase tracking-wide">
              What We Offer
            </p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Our Services
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Silicon Real Estate (Pvt.) Ltd. delivers a full spectrum of
              property services tailored to the Bangladeshi market.
            </p>
          </div>
        </Container>
      </section>

      {/* Services grid */}
      <section className="py-20">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <div
                key={s.title}
                className="rounded-xl border bg-card p-6 space-y-2"
              >
                <h2 className="text-xl font-semibold">{s.title}</h2>
                <p className="text-muted-foreground">{s.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
