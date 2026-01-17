import type React from 'react';
import { useEffect, useMemo, useState } from 'react';
import { MapApr2025 } from './components/MapApr2025';
import { MapDec2019 } from './components/MapDec2019';
import { MapDec2027 } from './components/MapDec2027';
import { MapDec2029 } from './components/MapDec2029';
import { MapDec2030 } from './components/MapDec2030';
import { MapDec2032 } from './components/MapDec2032';
import { MapJan2012 } from './components/MapJan2012';
import { MapNov2017 } from './components/MapNov2017';
import { MapNov2024 } from './components/MapNov2024';
import { Timeline } from './components/Timeline';
import { segmentText } from './helpers/segmentText';

import Data from "@/public/output.json";

type IssueAffectedBranch = {
    lineId: string;
    branchId: string;
    stationIds: Array<string>;
};

interface Props {
  branchesAffected: IssueAffectedBranch[];
  currentDate?: string;
}


export const StationMap: React.FC<Props> = (props) => {
  const { branchesAffected, currentDate } = props;
  const included = Data.included;

  const [ref, setRef] = useState<SVGElement | null>(null);

  const stationIds = useMemo(() => {
    const result = new Set<string>();
    for (const entry of branchesAffected) {
      for (const stationId of entry.stationIds) {
        result.add(stationId);
      }
    }
    return result;
  }, [branchesAffected]);

  useEffect(() => {
    if (ref == null) {
      return;
    }

    const linesByStationId: Record<string, Set<string>> = {};
    const linesPatchedByStationId: Record<string, Set<string>> = {};
    const componentByLineId: Record<string, string> = {};

    const isSingleStationCase =
      branchesAffected.length === 1 &&
      branchesAffected[0].stationIds.length === 1;

    for (const entry of branchesAffected) {
      for (const stationId of entry.stationIds) {
        // Retrieve all lines connected to this station
        const lineElements = [
          ...ref.querySelectorAll(`[id^='line_${stationId.toLowerCase()}:']`),
          ...ref.querySelectorAll(`[id$=':${stationId.toLowerCase()}']`),
        ] as SVGGElement[];

        for (const lineElement of lineElements) {
          const linesStation = linesByStationId[stationId] ?? new Set();
          linesStation.add(lineElement.id);
          linesByStationId[stationId] = linesStation;

          const parentElement = lineElement.parentElement;
          if (parentElement != null) {
            const lineComponentId = parentElement.id.replace(/^line_/, '');
            componentByLineId[lineElement.id] = lineComponentId;
          }
        }

        if (!isSingleStationCase) {
          for (const otherStationId of entry.stationIds) {
            if (stationId === otherStationId) {
              continue;
            }

            for (const lineElement of lineElements) {
              switch (lineElement.id) {
                case `line_${stationId.toLowerCase()}:${otherStationId.toLowerCase()}`:
                case `line_${otherStationId.toLowerCase()}:${stationId.toLowerCase()}`: {
                  const componentId = componentByLineId[lineElement.id];
                  if (
                    componentId != null &&
                    componentId.toLowerCase() !== entry.lineId.toLowerCase()
                  ) {
                    continue;
                  }

                  lineElement.style.opacity = '0.3';

                  const linesPatchedStation =
                    linesPatchedByStationId[stationId] ?? new Set();
                  linesPatchedStation.add(lineElement.id);
                  linesPatchedByStationId[stationId] = linesPatchedStation;
                  const linePatchedOtherStation =
                    linesPatchedByStationId[otherStationId] ?? new Set();
                  linePatchedOtherStation.add(lineElement.id);
                  linesPatchedByStationId[otherStationId] =
                    linePatchedOtherStation;

                  break;
                }
              }
            }
          }
        } else {
          for (const lineElement of lineElements) {
            const componentId = componentByLineId[lineElement.id];
            if (
              componentId != null &&
              componentId.toLowerCase() !== entry.lineId.toLowerCase()
            ) {
              continue;
            }

            lineElement.style.opacity = '0.3';

            const linesPatchedStation =
              linesPatchedByStationId[stationId] ?? new Set();
            linesPatchedStation.add(lineElement.id);
            linesPatchedByStationId[stationId] = linesPatchedStation;
          }
        }
      }
    }

    for (const entry of branchesAffected) {
      for (const stationId of entry.stationIds) {
        const lines = linesByStationId[stationId] ?? new Set();
        const patchedLines = linesPatchedByStationId[stationId] ?? new Set();

        const nodeElement: SVGGElement | null = ref.querySelector(
          `#node_${stationId.toLowerCase()}`,
        );

        const lineCountForComponent = Array.from(lines).filter((lineId) => {
          const lineComponentId = componentByLineId[lineId];
          return lineComponentId.toLowerCase() === entry.lineId.toLowerCase();
        }).length;

        const patchedLineCountForComponent = Array.from(patchedLines).filter(
          (lineId) => {
            const lineComponentId = componentByLineId[lineId];
            return lineComponentId.toLowerCase() === entry.lineId.toLowerCase();
          },
        ).length;

        if (
          nodeElement != null &&
          patchedLineCountForComponent === lineCountForComponent
        ) {
          // All SVG lines connected to this station for the entry's component have been patched out
          const componentElement: SVGGElement | null =
            nodeElement.querySelector(`[id^='${entry.lineId.toLowerCase()}']`);
          if (componentElement != null) {
            // Patch out the section of the station node for the entry's component
            componentElement.style.opacity = '0.3';
          }
        }

        if (patchedLines.size === lines.size) {
          // All SVG lines connected to this station have been patched out
          const labelElement: SVGGElement | null = ref.querySelector(
            `#label_${stationId.toLowerCase()}`,
          );
          if (labelElement != null) {
            // Patch out the station label
            labelElement.style.opacity = '0.3';
          }
        }
      }
    }

    const labelsElement: SVGGElement | null = ref.querySelector('#labels');
    if (labelsElement != null) {
      const labelElements = [...labelsElement.querySelectorAll('text')];
      for (const labelElement of labelElements) {
        const stationId = labelElement.id.replace(/^label_/, '').toUpperCase();
        const tspans = [...labelElement.querySelectorAll('tspan')];
        if (!(stationId in included.stations)) {
          continue;
        }
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const station = included.stations[stationId] || "missing";
        const stationName =
          station.nameTranslations["en"] ?? station.name;
        const segments = segmentText(stationName, "en-SG");
        for (let i = 0; i < tspans.length; i++) {
          const tspan = tspans[i];

          switch (i) {
            case tspans.length - 1: {
              tspan.textContent = segments.join('');
              break;
            }
            default: {
              const origTextLength = tspan.getComputedTextLength();
              tspan.textContent = '';
              while (segments.length > 0) {
                const textContentBeforeChange: string = tspan.textContent;
                const firstSegment = segments.shift() || "";
                // assert(firstSegment != null);
                tspan.textContent = `${textContentBeforeChange}${firstSegment}`;
                if (tspan.getComputedTextLength() > origTextLength) {
                  tspan.textContent = textContentBeforeChange;
                  segments.unshift(firstSegment);
                  break;
                }
              }
              break;
            }
          }
        }
        labelElement.removeAttribute('fill');
        labelElement.classList.add(
          'fill-gray-800',
          'dark:fill-gray-300',
          'hover:underline',
        );

        // Automatically move into parent <a> tag
        const parentElement = labelElement.parentElement;
        if (parentElement != null && parentElement.tagName !== 'A') {
          const newParentElement = document.createElementNS(
            'http://www.w3.org/2000/svg',
            'a',
          );
          // const href = buildLocaleAwareLink(
          //   `/stations/${stationId}`,
          //   intl.locale,
          // );
          const href = "http://localhost:3000/"
          newParentElement.setAttributeNS(null, 'href', href);
          newParentElement.onclick = (e) => {
            e.preventDefault();
            // navigate(href);
          };
          parentElement.removeChild(labelElement);
          newParentElement.appendChild(labelElement);
          parentElement.appendChild(newParentElement);
        }

        // Add title label for native tooltip
        let titleElement = labelElement.querySelector(
          'title',
        ) as SVGTitleElement | null;
        if (titleElement == null) {
          titleElement = document.createElementNS(
            'http://www.w3.org/2000/svg',
            'title',
          );
          labelElement.appendChild(titleElement);
        }
        titleElement.textContent = stationName;
      }
    }
  }, [ref, branchesAffected, included.stations]);

  return (
    <div className="flex flex-col fill-gray-800 dark:fill-gray-50">
      {/* Tailwind Class trappers */}
      <div className="hidden fill-gray-800 stroke-gray-800 dark:fill-gray-300 dark:stroke-gray-300" />

      {/* {stationIds.size > 0 && (
        <>
          <span className="font-bold text-gray-500 text-sm dark:text-gray-400">
            <FormattedMessage
              id="general.station_count"
              defaultMessage="{count, plural, one { {count} stations } other { {count} stations }}"
              values={{
                count: stationIds.size,
              }}
            />
          </span>
          <span className="text-gray-500 text-sm dark:text-gray-400">
            <FormattedList
              value={Array.from(stationIds).map((stationId) => {
                const station = included.stations[stationId];

                return (
                  <Link
                    className="hover:underline"
                    key={stationId}
                    to={buildLocaleAwareLink(
                      `/stations/${stationId}`,
                      intl.locale,
                    )}
                  >
                    {station.nameTranslations[intl.locale] ??
                      station.name ??
                      stationId}
                  </Link>
                );
              })}
            />
          </span>
        </>
      )} */}
    </div>
  );
};
