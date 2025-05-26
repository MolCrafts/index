import React, { useState } from "react";
import { DocSection } from "../components/DocSection";
import { DocCard } from "../components/DocCard";
import { DocButton } from "../components/DocButton";
import { DocsNavbar } from "../components/DocsNavbar";
import { DocSidebar } from "../components/DocSidebar";
import { DocsFooter } from "../components/DocsFooter";

// Main documentation component for MolPot
export const MolpotDocs: React.FC = () => {
  const [activeSection, setActiveSection] = useState("introduction");

  const handleSectionClick = (id: string) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <DocsNavbar theme="molpot" />
      <div className="flex">
        <DocSidebar
          theme="molpot"
          sections={[
            { id: "introduction", title: "Introduction" },
            { id: "getting-started", title: "Getting Started" },
            { id: "installation", title: "Installation" },
            { id: "visualization-options", title: "Visualization Options" },
            { id: "examples", title: "Examples" }
          ]}
          activeSectionId={activeSection}
          onSectionClick={handleSectionClick}
        />
        <main className="flex-1 p-6">
          <DocSection theme="molpot" id="introduction" title="Introduction">
            <div className="space-y-4">
              <DocCard theme="molpot" title="What is MolPot?">
                <p>MolPot is a powerful visualization tool designed specifically for molecular data and simulation results.</p>
              </DocCard>
              <DocCard theme="molpot" title="Key Features">
                <ul className="list-disc pl-6">
                  <li>Interactive 3D visualization</li>
                  <li>Support for multiple file formats</li>
                  <li>Real-time data updates</li>
                  <li>Customizable visualization options</li>
                </ul>
              </DocCard>
              <div className="flex space-x-4">
                <DocButton theme="molpot">Get Started</DocButton>
                <DocButton theme="molpot" variant="outline">View on GitHub</DocButton>
              </div>
            </div>
          </DocSection>

          <DocSection theme="molpot" id="getting-started" title="Getting Started">
            <p>Getting started with MolPot is easy. Follow our step-by-step guide to begin visualizing your molecular data.</p>
          </DocSection>

          <DocSection theme="molpot" id="installation" title="Installation">
            <p>Installation instructions and system requirements for MolPot.</p>
          </DocSection>

          <DocSection theme="molpot" id="visualization-options" title="Visualization Options">
            <p>Learn about the various visualization options and customization features available in MolPot.</p>
          </DocSection>

          <DocSection theme="molpot" id="examples" title="Examples">
            <p>Explore example visualizations and use cases to understand MolPot's capabilities.</p>
          </DocSection>
        </main>
      </div>
      <DocsFooter theme="molpot" />
    </>
  );
}; 