import { Container } from "@/components/layout/Container";

export const metadata = {
  title: "Investment Opportunities | Silicon Real Estate (Pvt.) Ltd.",
  description:
    "Explore residential and commercial real estate investment opportunities in Dhaka, Bangladesh with Silicon Real Estate.",
};

export default function InvestmentPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <Container>
          <div className="max-w-3xl">
            <p className="text-sm font-medium text-secondary mb-3 uppercase tracking-wide">
              Real Estate Investment
            </p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Investment Opportunities
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Discover premium real estate investment opportunities in Dhaka,
              Bangladesh — one of South Asia's fastest-growing metropolitan
              markets. Silicon Real Estate connects discerning investors with
              high-yield residential and commercial assets.
            </p>
          </div>
        </Container>
      </section>

      {/* Content */}
      <section className="py-20">
        <Container>
          <div className="max-w-3xl mx-auto space-y-8 text-muted-foreground leading-relaxed text-base md:text-lg">
            <p>
              Dhaka's real estate market has experienced consistent appreciation
              over the past decade, driven by rapid urbanisation, a growing
              middle class, and strong demand for both residential and commercial
              space. Prime locations such as Gulshan, Banani, Baridhara, and
              Bashundhara continue to attract domestic and expatriate investors
              seeking stable, long-term returns. Silicon Real Estate's portfolio
              spans these high-demand corridors, offering curated opportunities
              with transparent documentation and clear title.
            </p>

            <p>
              Residential investment remains the cornerstone of wealth creation
              for Bangladeshi families and overseas investors alike. From
              mid-range apartments in Uttara and Mirpur to luxury penthouses in
              Gulshan, the rental yield potential in Dhaka typically ranges
              between 6% and 10% annually — well above many comparable emerging
              markets. Our residential advisory team helps investors identify
              projects with strong occupancy forecasts, reputable developers, and
              favourable instalment structures that minimise upfront capital
              commitment.
            </p>

            <p>
              Commercial real estate in Dhaka presents an equally compelling
              case for portfolio diversification. Office spaces in Tejgaon,
              Motijheel, and the Special Economic Zones are experiencing
              heightened demand from multinational corporations, local
              conglomerates, and the fast-expanding technology sector. Retail
              units in mixed-use developments and ground-floor commercial spaces
              in high-footfall neighbourhoods offer rental premiums and capital
              appreciation that outpace inflation. Silicon Real Estate provides
              end-to-end support — from site shortlisting and due diligence to
              lease structuring and tenant management — so that your commercial
              asset performs from day one.
            </p>

            <p>
              Bangladesh's macroeconomic fundamentals — a growing GDP, rising
              foreign direct investment, and government initiatives such as the
              Special Economic Zone programme — create a structural tailwind for
              real estate values over the coming decade. Whether you are a
              first-time investor looking to build equity or an institutional
              buyer seeking a diversified Bangladesh property portfolio, Silicon
              Real Estate's investment advisory team is equipped to match you
              with the right assets, structure your financing, and guide you
              through every regulatory step. Contact us today to schedule a
              personalised investment consultation.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
