import { categories } from "../data/categories";

export const findingEmoji = (sendCategory: string): string => {
  const returnedEmoji: string[] = [];
  categories.forEach((element: { string: string; emoji: string }) => {
    if (element.string === sendCategory) {
      return returnedEmoji.push(element.emoji);
    }
  });
  return returnedEmoji[0];
};
