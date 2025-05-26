import { useEffect } from 'react';

interface SEOSchemaProps {
  path: string;
}

export const SEOSchema = ({ path }: SEOSchemaProps) => {
  useEffect(() => {
    // Create and inject the JSON-LD schema
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    
    // Determine which schema to use based on current path
    if (path === '/') {
      // Organization and SoftwareApplication schema for homepage
      script.innerHTML = JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Organization',
            '@id': 'https://molcrafts.org/#organization',
            'name': 'MolCrafts',
            'url': 'https://molcrafts.org',
            'description': 'An open-source molecular sciences toolbox that advances molecular simulation with the strength of open-source collaboration.',
            'sameAs': [
              'https://github.com/MolCrafts'
            ]
          },
          {
            '@type': 'SoftwareApplication',
            '@id': 'https://molcrafts.org/#software',
            'name': 'MolCrafts',
            'applicationCategory': 'Scientific',
            'operatingSystem': 'Cross-platform',
            'offers': {
              '@type': 'Offer',
              'price': '0',
              'priceCurrency': 'USD'
            }
          },
          {
            '@type': 'WebSite',
            '@id': 'https://molcrafts.org/#website',
            'url': 'https://molcrafts.org',
            'name': 'MolCrafts – Open-Source Molecular Simulation Toolbox',
            'description': 'MolCrafts is an open-source suite (MolPy, MolPot, MolVis) for molecular simulations and data analysis in computational chemistry.',
            'publisher': {
              '@id': 'https://molcrafts.org/#organization'
            }
          },
          {
            '@type': 'WebPage',
            '@id': 'https://molcrafts.org/#webpage',
            'url': 'https://molcrafts.org',
            'name': 'MolCrafts – Open-Source Molecular Simulation Toolbox',
            'description': 'MolCrafts is an open-source suite (MolPy, MolPot, MolVis) for molecular simulations and data analysis in computational chemistry.',
            'isPartOf': {
              '@id': 'https://molcrafts.org/#website'
            },
            'about': {
              '@id': 'https://molcrafts.org/#software'
            }
          }
        ]
      });
    } else if (path.startsWith('/docs/molpy')) {
      // Software schema for MolPy docs
      script.innerHTML = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SoftwareSourceCode',
        'name': 'MolPy',
        'applicationCategory': 'Scientific',
        'programmingLanguage': 'Python',
        'description': 'MolPy is a Python library for molecular simulations and data management in computational chemistry.',
        'codeRepository': 'https://github.com/MolCrafts/MolPy',
        'isPartOf': {
          '@type': 'SoftwareApplication',
          'name': 'MolCrafts',
          'url': 'https://molcrafts.org'
        }
      });
    } else if (path.startsWith('/docs/molplot')) {
      // Software schema for MolPlot docs
      script.innerHTML = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SoftwareSourceCode',
        'name': 'MolPlot',
        'applicationCategory': 'Scientific',
        'programmingLanguage': 'Python',
        'description': 'MolPlot is a visualization tool for molecular data and simulation results.',
        'codeRepository': 'https://github.com/MolCrafts/MolPlot',
        'isPartOf': {
          '@type': 'SoftwareApplication',
          'name': 'MolCrafts',
          'url': 'https://molcrafts.org'
        }
      });
    } else if (path.startsWith('/docs/molvis')) {
      // Software schema for MolVis docs
      script.innerHTML = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SoftwareSourceCode',
        'name': 'MolVis',
        'applicationCategory': 'Scientific',
        'programmingLanguage': 'JavaScript',
        'description': 'MolVis is a molecular visualization tool for rendering 3D molecular structures.',
        'codeRepository': 'https://github.com/MolCrafts/MolVis',
        'isPartOf': {
          '@type': 'SoftwareApplication',
          'name': 'MolCrafts',
          'url': 'https://molcrafts.org'
        }
      });
    }
    
    // Remove any existing schema script
    const existingScript = document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
      existingScript.remove();
    }
    
    // Add the new schema
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