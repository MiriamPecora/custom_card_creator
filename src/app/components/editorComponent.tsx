"use client";

import { useCustomization } from "../custom_hooks/useCustomization";
import Image from "next/image";
import Loader from "./loader";

export default function EditorComponent() {
  const { cycle, getImage, loading } = useCustomization();

  if (loading) return <Loader />;
  return (
    <>
      <div className="md:ml-40 md:mt-20 font-mono">
        <div className="rounded-full mb-6 md:mb-0 shadow-[4px_4px_0px_0px_var(--accent-text)] relative bg-linear-to-t from-[var(--accent-text)]/55 to-[var(--background)]/80 h-44 w-44 mx-auto">
          <div>
            <Image
              src={getImage("skintone")}
              width={600}
              height={600}
              priority
              alt="skintone"
              className="absolute bottom-4"
            />
            <Image
              src={"/customizations_elements/mouth.png"}
              width={600}
              height={600}
              alt="mouth"
              className="absolute bottom-4"
            />
            <Image
              src={getImage("hair")}
              width={600}
              height={600}
              alt="hair"
              className="absolute bottom-4"
            />
            <Image
              src={getImage("eyes")}
              width={600}
              height={600}
              alt="eyes"
              className="absolute bottom-4"
            />
            <Image
              src={getImage("clothes")}
              width={600}
              height={600}
              alt="clothes"
              className="absolute bottom-4"
            />
          </div>
        </div>

        <div className="flex gap-5 pb-3 relative justify-center">
          <button
            onClick={() => cycle("skintone")}
            className="text-lg md:absolute md:-top-40 md:right-48 rounded-full bg-[var(--secondary)] h-20 w-20 flex justify-center items-center shadow-[3px_3px_0px_0px_var(--accent-text)] 
            hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none active:translate-x-[3px] active:translate-y-[3px] active:shadow-none hover:bg-[var(--accent-text)] hover:text-[var(--secondary-text)] transition"
          >
            Skin
          </button>
          <button
            onClick={() => cycle("eyes")}
            className="text-lg md:absolute md:-top-60 md:right-40 rounded-full bg-[var(--secondary)] h-20 w-20 flex justify-center items-center shadow-[3px_3px_0px_0px_var(--accent-text)] 
            hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none active:translate-x-[3px] active:translate-y-[3px] active:shadow-none hover:bg-[var(--accent-text)] hover:text-[var(--secondary-text)] transition"
          >
            Eyes
          </button>
          <button
            onClick={() => cycle("hair")}
            className="text-lg md:absolute md:bottom-52 md:left-5 rounded-full bg-[var(--secondary)] h-20 w-20 flex justify-center items-center shadow-[3px_3px_0px_0px_var(--accent-text)] 
            hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none active:translate-x-[3px] active:translate-y-[3px] active:shadow-none hover:bg-[var(--accent-text)] hover:text-[var(--secondary-text)] transition"
          >
            Hair
          </button>
          <button
            onClick={() => cycle("clothes")}
            className="text-lg md:absolute md:bottom-52 md:left-28 rounded-full bg-[var(--secondary)] h-20 w-20 flex justify-center items-center shadow-[3px_3px_0px_0px_var(--accent-text)] 
            hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none active:translate-x-[3px] active:translate-y-[3px] active:shadow-none hover:bg-[var(--accent-text)] hover:text-[var(--secondary-text)] transition"
          >
            Clothes
          </button>
        </div>
      </div>
    </>
  );
}
