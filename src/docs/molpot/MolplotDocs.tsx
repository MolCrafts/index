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
  { title: "Visualization Options", id: "visualization-options" },
  { title: "Examples", id: "examples" },
];

export const MolplotDocs: React.FC = () => {
  const [activeSection, setActiveSection] = useState("introduction");

  const handleSectionClick = (id: string) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <DocumentationLayout theme="molplot">
      <div className="flex gap-8">
        <DocSidebar
          theme="molplot"
          sections={sections}
          activeSectionId={activeSection}
          onSectionClick={handleSectionClick}
        />
        
        <div className="flex-1">
          <DocSection theme="molplot" id="introduction" title="Introduction">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <DocCard theme="molplot" title="What is Molplot?">
                Content placeholder
              </DocCard>
              <DocCard theme="molplot" title="Key Features">
                Content placeholder
              </DocCard>
            </div>
            
            <div className="mt-6 flex gap-4">
              <DocButton theme="molplot">Get Started</DocButton>
              <DocButton theme="molplot" variant="outline">View on GitHub</DocButton>
            </div>
          </DocSection>
          
          <DocSection theme="molplot" id="getting-started" title="Getting Started">
            Content placeholder
          </DocSection>
          
          <DocSection theme="molplot" id="installation" title="Installation">
            Content placeholder
          </DocSection>
          
          <DocSection theme="molplot" id="visualization-options" title="Visualization Options">
            Content placeholder
          </DocSection>
          
          <DocSection theme="molplot" id="examples" title="Examples">
            Content placeholder
          </DocSection>
        </div>
      </div>
    </DocumentationLayout>
  );
}; 