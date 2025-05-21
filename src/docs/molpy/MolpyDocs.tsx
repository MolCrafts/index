import React, { useState } from "react";
import { DocumentationLayout } from "../DocumentationLayout";
import { DocSidebar } from "../components/DocSidebar";
import { DocSection } from "../components/DocSection";
import { DocCard } from "../components/DocCard";
import { DocButton } from "../components/DocButton";

const sections = [
  { title: "Introduction", id: "introduction" },
  { title: "Getting Started", id: "getting-started" },
  { title: "Installation", id: "installation" },
  { title: "API Reference", id: "api-reference" },
  { title: "Examples", id: "examples" },
];

export const MolpyDocs: React.FC = () => {
  const [activeSection, setActiveSection] = useState("introduction");

  const handleSectionClick = (id: string) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <DocumentationLayout theme="molpy">
      <div className="flex gap-8">
        <DocSidebar
          theme="molpy"
          sections={sections}
          activeSectionId={activeSection}
          onSectionClick={handleSectionClick}
        />
        
        <div className="flex-1">
          <DocSection theme="molpy" id="introduction" title="Introduction">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <DocCard theme="molpy" title="What is Molpy?">
                Content placeholder
              </DocCard>
              <DocCard theme="molpy" title="Key Features">
                Content placeholder
              </DocCard>
            </div>
            
            <div className="mt-6 flex gap-4">
              <DocButton theme="molpy">Get Started</DocButton>
              <DocButton theme="molpy" variant="outline">View on GitHub</DocButton>
            </div>
          </DocSection>
          
          <DocSection theme="molpy" id="getting-started" title="Getting Started">
            Content placeholder
          </DocSection>
          
          <DocSection theme="molpy" id="installation" title="Installation">
            Content placeholder
          </DocSection>
          
          <DocSection theme="molpy" id="api-reference" title="API Reference">
            Content placeholder
          </DocSection>
          
          <DocSection theme="molpy" id="examples" title="Examples">
            Content placeholder
          </DocSection>
        </div>
      </div>
    </DocumentationLayout>
  );
}; 