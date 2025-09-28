"use client";

import { useState, useEffect } from "react";

type SkintoneOption = { name: string; image: string };
type HairColorOption = { name: string; image: string };
type HairStyle = { [color: string]: HairColorOption };
type HairOptions = { [style: string]: HairStyle };
type EyeOption = { name: string; image: string };
type ClothesOption = { name: string; image: string };

type Customizations = {
  skintone: { [key: string]: SkintoneOption };
  hair: HairOptions;
  eyes: { [key: string]: EyeOption };
  clothes: { [key: string]: ClothesOption };
};

type HairState = { type: string; color: string };

export type CharacterState = {
  skintone: string;
  hair: HairState;
  eyes: string;
  clothes: string;
};

const STORAGE_KEY = "characterCustomization";

const getInitialCharacterState = (): CharacterState => {
  if (typeof window !== "undefined") {
    const savedState = localStorage.getItem(STORAGE_KEY);
    if (savedState) {
      try {
        return JSON.parse(savedState);
      } catch (e) {
        console.error("Parsing error", e);
      }
    }
  }

  return {
    skintone: "pale",
    hair: { type: "fringe", color: "blonde" },
    eyes: "brown",
    clothes: "purple",
  };
};

export function useCustomization() {
  const [character, setCharacter] = useState<CharacterState>(
    getInitialCharacterState()
  );

  const [customizations, setCustomizations] = useState<Customizations | null>(
    null
  );

  useEffect(() => {
    fetch("/customizations/customizations.json")
      .then((res) => res.json())
      .then((data: Customizations) => setCustomizations(data));
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(character));
    }
  }, [character]);

  const cycle = (category: keyof CharacterState) => {
    if (!customizations) return;

    switch (category) {
      case "skintone": {
        const keys = Object.keys(customizations.skintone);
        const next = keys[(keys.indexOf(character.skintone) + 1) % keys.length];
        setCharacter((prev) => ({ ...prev, skintone: next }));
        break;
      }
      case "eyes": {
        const keys = Object.keys(customizations.eyes);
        const next = keys[(keys.indexOf(character.eyes) + 1) % keys.length];
        setCharacter((prev) => ({ ...prev, eyes: next }));
        break;
      }
      case "clothes": {
        const keys = Object.keys(customizations.clothes);
        const next = keys[(keys.indexOf(character.clothes) + 1) % keys.length];
        setCharacter((prev) => ({ ...prev, clothes: next }));
        break;
      }
      case "hair": {
        const types = Object.keys(customizations.hair);
        const currentTypeIndex = types.indexOf(character.hair.type);
        const colors = Object.keys(customizations.hair[character.hair.type]);
        const currentColorIndex = colors.indexOf(character.hair.color);

        const nextColorIndex = (currentColorIndex + 1) % colors.length;
        let nextTypeIndex = currentTypeIndex;

        if (nextColorIndex === 0) {
          nextTypeIndex = (currentTypeIndex + 1) % types.length;
        }

        const nextType = types[nextTypeIndex];
        const nextTypeColors = Object.keys(customizations.hair[nextType]);
        const nextColor =
          nextTypeColors[nextColorIndex % nextTypeColors.length];

        setCharacter((prev) => ({
          ...prev,
          hair: { type: nextType, color: nextColor },
        }));
        break;
      }
    }
  };

  const getImage = (
    category: keyof CharacterState,
    stateToUse?: CharacterState | null | undefined
  ) => {
    if (!customizations) return "";

    const state = stateToUse || character;

    switch (category) {
      case "skintone":
        return customizations.skintone[state.skintone]?.image || "";
      case "hair":
        return (
          customizations.hair[state.hair.type]?.[state.hair.color]?.image || ""
        );
      case "eyes":
        return customizations.eyes[state.eyes]?.image || "";
      case "clothes":
        return customizations.clothes[state.clothes]?.image || "";
    }
  };

  return {
    character,
    cycle,
    getImage,
    loading: !customizations,
  };
}
