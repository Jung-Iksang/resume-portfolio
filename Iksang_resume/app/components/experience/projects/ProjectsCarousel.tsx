import { type ReactElement, useEffect, useMemo, useState } from "react";
import { isMobile } from "react-device-detect";
import ProjectTile from "./ProjectTile";

import { PROJECTS } from "@constants";
import { usePortalStore } from "@stores";

const ProjectsCarousel = () => {
  const [activeId, setActiveId] = useState<number | null>(null);
  const isActive = usePortalStore((state) => state.activePortalId === "projects");

  useEffect(() => {
    if (!isActive) setActiveId(null);
  }, [isActive]);

  const onClick = (id: number) => {
    if (!isMobile) return;
    setActiveId(id === activeId ? null : id);
  };

  const tiles = useMemo(() => {
    // Group projects by year
    const yearGroups: { year: string; projects: { project: typeof PROJECTS[number]; globalIndex: number }[] }[] = [];
    PROJECTS.forEach((project, i) => {
      const year = project.date.split(' ')[1];
      const existing = yearGroups.find((g) => g.year === year);
      if (existing) {
        existing.projects.push({ project, globalIndex: i });
      } else {
        yearGroups.push({ year, projects: [{ project, globalIndex: i }] });
      }
    });

    const fov = Math.PI;
    const distance = 13;
    const maxPerCol = 2;
    const rowHeight = 2.8;

    // Each year group takes up columns on the arc (e.g. 6 items = 2 columns)
    const columns: { yearGroup: typeof yearGroups[number]; subCol: number; subCols: number }[] = [];
    yearGroups.forEach((group) => {
      const subCols = Math.ceil(group.projects.length / maxPerCol);
      for (let s = 0; s < subCols; s++) {
        columns.push({ yearGroup: group, subCol: s, subCols });
      }
    });

    const totalCols = columns.length;
    const result: ReactElement[] = [];

    columns.forEach((col, colIdx) => {
      const { yearGroup, subCol } = col;
      const rows = Math.min(yearGroup.projects.length, maxPerCol);
      const startIdx = subCol * rows;
      const endIdx = Math.min(startIdx + rows, yearGroup.projects.length);

      const angle = (fov / totalCols) * colIdx;
      const z = -distance * Math.sin(angle);
      const x = -distance * Math.cos(angle);
      const rotY = Math.PI / 2 - angle;

      for (let j = startIdx; j < endIdx; j++) {
        const entry = yearGroup.projects[j];
        const row = j - startIdx;
        const y = 4 - row * rowHeight;

        result.push(
          <ProjectTile
            key={entry.globalIndex}
            project={entry.project}
            index={entry.globalIndex}
            position={[x, y, z]}
            rotation={[0, rotY, 0]}
            activeId={activeId}
            onClick={() => onClick(entry.globalIndex)}
          />
        );
      }
    });

    return result;
  }, [activeId, isActive]);

  return (
    <group rotation={[0, -Math.PI / 12, 0]}>
      {tiles}
    </group>
  );
};

export default ProjectsCarousel;