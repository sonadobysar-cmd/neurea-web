export type LikertOption = {
  value: number;
  label: string;
};

export type ScreeningQuestion = {
  id: string;
  text: string;
};

export type ScreeningResult = {
  raw: number;
  label: string;
  detail: string;
};

export type ScreeningDefinition = {
  slug: string;
  title: string;
  subtitle: string;
  scaleNote: string;
  questions: ScreeningQuestion[];
  options: LikertOption[];
  /** Vyhodnotí skóre z pole odpovědí ve stejném pořadí jako otázky */
  interpret: (answers: number[]) => ScreeningResult;
};
