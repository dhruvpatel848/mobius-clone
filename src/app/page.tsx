"use client";

import { WorldProvider, useWorld } from "@/context/WorldContext";
import { WorldCanvas } from "@/components/world/WorldCanvas";
import { SpatialSection } from "@/components/world/SpatialSection";
import { WarpBackground } from "@/components/ui/warp-background";
import { Navigation } from "@/components/core/Navigation";
import { SpatialHero } from "@/components/sections/SpatialHero";
import { SpatialSkills } from "@/components/sections/SpatialSkills";
import { SpatialProjects } from "@/components/sections/SpatialProjects";
import { SpatialAbout } from "@/components/sections/SpatialAbout";
import { SpatialContact } from "@/components/sections/SpatialContact";
import { motion, useTransform } from "framer-motion";

// Inner component to access world context
function WorldContent() {
  const { camera, navigateToSection, sections, smoothCamera } = useWorld();

  return (
    <>
      {/* Navigation (Fixed) */}
      <Navigation />

      {/* 3D World Container */}
      <WorldCanvas>
        {/* Hero - Entry Portal (Z: 0) */}
        <SpatialSection id="hero" z={0}>
          <SpatialHero />
        </SpatialSection>

        {/* Skills - System View (Z: 1500) */}
        <SpatialSection id="skills" z={1500}>
          <SpatialSkills />
        </SpatialSection>

        {/* Work - Landmarks (Z: 3500) */}
        <SpatialSection id="work" z={3500}>
          <SpatialProjects />
        </SpatialSection>

        {/* About - Perspective Shift (Z: 5500) */}
        <SpatialSection id="about" z={5500}>
          <SpatialAbout />
        </SpatialSection>

        {/* Contact - Exit Node (Z: 7500) */}
        <SpatialSection id="contact" z={7500}>
          <SpatialContact />
        </SpatialSection>
      </WorldCanvas>

      {/* Section Navigation HUD */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-[100] flex flex-col gap-4">
        {sections.map((section) => {
          // Highlight active section based on camera Z
          const isActive = useTransform(camera.z, z => {
            const tolerance = 750;
            return Math.abs(z - section.z) < tolerance;
          });

          return (
            <motion.button
              key={section.id}
              onClick={() => navigateToSection(section.id)}
              whileHover={{ scale: 1.5 }}
              className="relative group"
              title={section.label}
            >
              <motion.div
                className="w-3 h-3 rounded-full border-2 transition-all"
                style={{
                  borderColor: useTransform(isActive, v => v ? "rgb(218, 255, 2)" : "rgb(64, 64, 64)"),
                  backgroundColor: useTransform(isActive, v => v ? "rgba(218, 255, 2, 0.3)" : "transparent"),
                }}
              />
              <span className="absolute right-6 top-1/2 -translate-y-1/2 text-xs font-mono text-neutral-500 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {section.label}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Depth Indicator */}
      <div className="fixed left-6 bottom-6 z-[100] font-mono text-xs text-neutral-600">
        <motion.span>
          Depth: <motion.span className="text-neon">{useTransform(smoothCamera.z, v => Math.round(v))}</motion.span>
        </motion.span>
      </div>

      {/* Scroll Hint */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] font-mono text-xs text-neutral-600">
        <span>↕ Scroll to navigate</span>
      </div>
    </>
  );
}

export default function Home() {
  return (
    <WorldProvider>
      <main className="h-screen w-screen overflow-hidden bg-background text-foreground">
        {/* Background Layer */}
        <WarpBackground velocity={0.3} />

        <WorldContent />
      </main>
    </WorldProvider>
  );
}
