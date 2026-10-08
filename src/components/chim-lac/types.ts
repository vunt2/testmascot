export type MascotStep = {
  /** The CSS selector for the element the bird should fly to. */
  target: string;
  title: string;
  description: string;
};

export type MascotGuideHandle = {
  startTour: () => void;
  showStep: (index: number) => void;
  dock: () => void;
  hide: () => void;
  show: () => void;
  resetProgress: () => void;
};

export type MascotGuideProps = {
  steps: MascotStep[];
  /** Persist completion under this key; each product can use its own key. */
  storageKey?: string;
  /** Optional custom character image, e.g. /mascot/character.webp.
      If absent, the portable animated SVG character is rendered. */
  imageSrc?: string;
  /** Optional callback after completing all steps. */
  onComplete?: () => void;
};
