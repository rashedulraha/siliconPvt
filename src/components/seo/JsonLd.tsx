interface JsonLdProps {
  data: Record<string, any>;
}

/**
 * Inject JSON-LD structured data for SEO.
 */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/**
 * Organization structured data.
 */
export function OrganizationJsonLd({
  name,
  url,
  logo,
  email,
  phone,
  address,
  social,
}: {
  name: string;
  url: string;
  logo?: string;
  email?: string;
  phone?: string;
  address?: string;
  social?: string[];
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "RealEstateAgent",
        name,
        url,
        logo,
        email,
        telephone: phone,
        address: address
          ? {
              "@type": "PostalAddress",
              streetAddress: address,
            }
          : undefined,
        sameAs: social,
      }}
    />
  );
}

/**
 * Property listing structured data.
 */
export function PropertyJsonLd({
  title,
  description,
  price,
  currency = "USD",
  image,
  address,
  bedrooms,
  bathrooms,
  area,
  url,
}: {
  title: string;
  description: string;
  price: number;
  currency?: string;
  image?: string;
  address: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  url: string;
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "RealEstateListing",
        name: title,
        description,
        url,
        datePosted: new Date().toISOString(),
        image,
        address: {
          "@type": "PostalAddress",
          streetAddress: address,
        },
        offers: {
          "@type": "Offer",
          price,
          priceCurrency: currency,
        },
        numberOfRooms: bedrooms,
        floorSize: {
          "@type": "QuantitativeValue",
          value: area,
          unitCode: "FTK",
        },
      }}
    />
  );
}

/**
 * Breadcrumbs structured data.
 */
export function BreadcrumbsJsonLd({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: item.url,
        })),
      }}
    />
  );
}
