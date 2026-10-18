import { useEffect } from "react";

interface SEOSchemaProps {
  path: string;
}

export const SEOSchema = ({ path }: SEOSchemaProps) => {
  useEffect(() => {
    if (path !== "/" && path !== "") return;

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.innerHTML = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "@id": "https://molcrafts.org/#organization",
          name: "MolCrafts",
          url: "https://molcrafts.org",
          description: "Open infrastructure for molecular and materials computation.",
          sameAs: ["https://github.com/MolCrafts"],
        },
        {
          "@type": "WebSite",
          "@id": "https://molcrafts.org/#website",
          url: "https://molcrafts.org",
          name: "MolCrafts — Standardizing Materials R&D for the AI Era.",
          description: "Open infrastructure for molecular and materials computation.",
          publisher: {
            "@id": "https://molcrafts.org/#organization",
          },
        },
        {
          "@type": "WebPage",
          "@id": "https://molcrafts.org/#webpage",
          url: "https://molcrafts.org",
          name: "MolCrafts — Standardizing Materials R&D for the AI Era.",
          description: "Open infrastructure for molecular and materials computation.",
          isPartOf: {
            "@id": "https://molcrafts.org/#website",
          },
          about: {
            "@id": "https://molcrafts.org/#organization",
          },
        },
      ],
    });

    const existingScript = document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
      existingScript.remove();
    }

    document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, [path]);

  return null;
};

export default SEOSchema;
