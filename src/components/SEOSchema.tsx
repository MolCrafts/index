import { useEffect } from "react";
import { BRAND_DESCRIPTION, BRAND_TAGLINE } from "../lib/brandCopy";

interface SEOSchemaProps {
  path: string;
}

export const SEOSchema = ({ path }: SEOSchemaProps) => {
  useEffect(() => {
    // Create and inject the JSON-LD schema
    const script = document.createElement("script");
    script.type = "application/ld+json";

    // Determine which schema to use based on current path
    if (path === "/") {
      // Organization and SoftwareApplication schema for homepage
      script.innerHTML = JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Organization",
            "@id": "https://molcrafts.org/#organization",
            name: "MolCrafts",
            url: "https://molcrafts.org",
            description: BRAND_DESCRIPTION,
            sameAs: ["https://github.com/MolCrafts"],
          },
          {
            "@type": "SoftwareApplication",
            "@id": "https://molcrafts.org/#software",
            name: "MolCrafts",
            applicationCategory: "Scientific",
            operatingSystem: "Cross-platform",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
          },
          {
            "@type": "WebSite",
            "@id": "https://molcrafts.org/#website",
            url: "https://molcrafts.org",
            name: `MolCrafts – ${BRAND_TAGLINE}`,
            description: BRAND_DESCRIPTION,
            publisher: {
              "@id": "https://molcrafts.org/#organization",
            },
          },
          {
            "@type": "WebPage",
            "@id": "https://molcrafts.org/#webpage",
            url: "https://molcrafts.org",
            name: `MolCrafts – ${BRAND_TAGLINE}`,
            description: BRAND_DESCRIPTION,
            isPartOf: {
              "@id": "https://molcrafts.org/#website",
            },
            about: {
              "@id": "https://molcrafts.org/#software",
            },
          },
        ],
      });
    } else if (path.startsWith("/molpy")) {
      // Software schema for MolPy landing
      script.innerHTML = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "SoftwareSourceCode",
        name: "MolPy",
        applicationCategory: "Scientific",
        programmingLanguage: "Python",
        description:
          "Programmable toolkit for molecular simulation workflows — parse, build, edit, type, analyze, pack, and I/O.",
        codeRepository: "https://github.com/MolCrafts/molpy",
        isPartOf: {
          "@type": "SoftwareApplication",
          name: "MolCrafts",
          url: "https://molcrafts.org",
        },
      });
    } else if (path.startsWith("/molrec")) {
      // Software schema for MolRec landing
      script.innerHTML = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: "MolRec",
        applicationCategory: "Scientific Software",
        operatingSystem: "Cross-platform",
        description:
          "Backend-neutral record contract for atomistic data — frames, trajectories, observables, status, and metadata.",
        codeRepository: "https://github.com/MolCrafts/molrec",
        programmingLanguage: ["Markdown", "Text"],
        license: "BSD-3-Clause",
        author: {
          "@type": "Organization",
          name: "MolCrafts",
          url: "https://molcrafts.org",
        },
      });
    } else if (path.startsWith("/molvis")) {
      // Software schema for MolVis landing
      script.innerHTML = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "SoftwareSourceCode",
        name: "MolVis",
        applicationCategory: "Scientific",
        programmingLanguage: "JavaScript",
        description:
          "Interactive 3D molecular visualization for the web, VS Code, and Jupyter — inspect, edit, measure, play trajectories.",
        codeRepository: "https://github.com/MolCrafts/molvis",
        isPartOf: {
          "@type": "SoftwareApplication",
          name: "MolCrafts",
          url: "https://molcrafts.org",
        },
      });
    } else if (path.startsWith("/molpack")) {
      // Software schema for MolPack landing
      script.innerHTML = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "SoftwareSourceCode",
        name: "MolPack",
        applicationCategory: "Scientific",
        programmingLanguage: ["Rust", "Python"],
        description:
          "Packs molecules into a simulation box, from a CLI, Rust, or Python — with a native Python API and opt-in parallelism.",
        codeRepository: "https://github.com/MolCrafts/molpack",
        license: "BSD-3-Clause",
        isPartOf: {
          "@type": "SoftwareApplication",
          name: "MolCrafts",
          url: "https://molcrafts.org",
        },
      });
    } else if (path.startsWith("/atomiverse")) {
      script.innerHTML = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "SoftwareSourceCode",
        name: "Atomiverse",
        applicationCategory: "Scientific",
        programmingLanguage: ["C++", "CUDA", "Python"],
        description:
          "Simulation engine for molecular dynamics and electronic structure, on CPU and GPU.",
        codeRepository: "https://github.com/MolCrafts/Atomiverse",
        isPartOf: {
          "@type": "SoftwareApplication",
          name: "MolCrafts",
          url: "https://molcrafts.org",
        },
      });
    }

    // Remove any existing schema script
    const existingScript = document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
      existingScript.remove();
    }

    // Routes without a branch above leave innerHTML empty. Appending that emits
    // <script type="application/ld+json"></script>, which is a parse error for validators.
    if (!script.innerHTML) {
      return;
    }

    document.head.appendChild(script);

    return () => {
      // Clean up when component unmounts
      script.remove();
    };
  }, [path]);

  // This component doesn't render anything visible
  return null;
};

export default SEOSchema;
