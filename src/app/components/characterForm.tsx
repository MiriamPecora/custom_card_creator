"use client";

import { useState, useRef, useCallback } from "react";
import PreviewModal from "./preview";
import {
  useCustomization,
  CharacterState,
} from "../custom_hooks/useCustomization";
import Image from "next/image";
import { useDownload } from "../custom_hooks/useDownload";

export default function CharacterForm() {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewCharacter, setPreviewCharacter] =
    useState<CharacterState | null>(null);
  const [name, setName] = useState("");
  const [catchphrase, setCatchphrase] = useState("");
  const { getImage } = useCustomization();
  const cardRef = useRef<HTMLDivElement>(null);

  const getLatestCustomizationsFromStorage = () => {
    if (typeof window !== "undefined") {
      const savedState = localStorage.getItem("characterCustomization");
      if (savedState) {
        try {
          return JSON.parse(savedState);
        } catch (e) {
          console.error("Parsing error", e);
        }
      }
    }
    return null;
  };

  const { downloadFunc } = useDownload({
    filename: `${name || "character"}-card`,
    format: "png",
  });

  const handleDownload = useCallback(async () => {
    const latestCharacterData = getLatestCustomizationsFromStorage();
    if (!latestCharacterData) {
      console.error("Missing Data");
      return;
    }
    if (cardRef.current) {
      await downloadFunc(cardRef.current);
    } else {
      console.log("Preview must be opened before downloading the card");
    }
  }, [downloadFunc]);

  const handlePreview = () => {
    const latestData = getLatestCustomizationsFromStorage();
    setPreviewCharacter(latestData);
    setPreviewOpen(true);
  };

  return (
    <div className="flex flex-col gap-4 w-80 mx-auto mt-10 md:mb-14 font-mono md:mt-0">
      <div className="flex flex-col">
        <label htmlFor="name" className="mb-1 text-lg font-semibold">
          Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Mr Handsome"
          maxLength={30}
          className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-0 focus:border-[var(--accent-text)] focus:placeholder-transparent"
        />
      </div>
      <div className="flex flex-col">
        <div className="flex items-center gap-2 mb-1">
          <label htmlFor="catchphrase" className="font-semibold text-lg">
            Catchphrase
          </label>
          <div className="relative group">
            <span className="rounded-full  text-xs align-top cursor-pointer">
              ⓘ
            </span>
            <div className="pointer-events-none absolute text-sm rounded-lg border-dashed border left-6 top-1/3 -translate-y-1/2 opacity-0 group-active:opacity-100 group-hover:opacity-100 bg-[var(--secondary)] px-2 py-1 w-[200px] md:w-fit whitespace-pre-line md:whitespace-nowrap transition">
              It could be a quote or some core personality traits!
            </div>
          </div>
        </div>
        <textarea
          id="catchphrase"
          value={catchphrase}
          onChange={(e) => setCatchphrase(e.target.value)}
          placeholder="If being good at videogames was a job, I would still be unemployed."
          maxLength={150}
          className="scrollbar-thin px-3 py-2 border rounded-lg h-32 resize-none focus:outline-none focus:ring-0 focus:border-[var(--accent-text)]"
        />
      </div>
      <div className="flex justify-around">
        <button
          onClick={handlePreview}
          className="bg-[var(--secondary)] shadow-[3px_3px_0px_0px_var(--accent-text)] hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none active:translate-x-[3px] active:translate-y-[3px] active:shadow-none font-semibold rounded-2xl px-4 py-2 hover:bg-[var(--accent-text)] hover:text-[var(--secondary-text)] transition"
        >
          Preview
        </button>

        <button
          onClick={handleDownload}
          hidden={!previewOpen}
          className="z-100 ms-20 bg-[var(--secondary)] shadow-[3px_3px_0px_0px_var(--accent-text)] hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none active:translate-x-[3px] active:translate-y-[3px] active:shadow-none font-semibold rounded-2xl px-4 py-2 hover:bg-[var(--accent-text)] hover:text-[var(--secondary-text)] transition"
        >
          Download
        </button>
      </div>

      {previewOpen && (
        <PreviewModal onClose={() => setPreviewOpen(false)}>
          <div
            style={{
              backgroundColor: "var(--secondary)",
            }}
            ref={cardRef}
            className="w-sm border border-dotted relative rounded-lg p-6"
          >
            <div
              style={{
                background:
                  "radial-gradient(var(--secondary), var(--background))",
              }}
              className="border-4 rounded-xl px-5 pt-3 pb-8 h-auto !max-h-full wrap-break-word overflow-hidden border-double"
            >
              <div className="flex items-start wrap-anywhere">
                <div className="relative w-28 h-28 flex-shrink-0">
                  {(["skintone", "hair", "eyes", "clothes"] as const).map(
                    (pg) => (
                      <Image
                        key={pg}
                        src={getImage(pg, previewCharacter)}
                        alt={pg}
                        fill
                        sizes="112px"
                        className="absolute"
                      />
                    )
                  )}
                  <Image
                    src={"/customizations_elements/mouth.png"}
                    fill
                    alt="mouth"
                    sizes="112px"
                    className="absolute"
                  />
                </div>
                <h2 className="pt-9 text-xl font-semibold">
                  {name || "Unnamed Character"}
                </h2>
              </div>

              <p className="pt-3 text-center">
                {catchphrase || "All right then, keep your secrets"}
              </p>
            </div>
          </div>
        </PreviewModal>
      )}
    </div>
  );
}
