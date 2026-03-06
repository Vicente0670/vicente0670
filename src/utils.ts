import { forumGenres } from "./constants";

export function checkGenre(text: string): string {

  for (const genre in forumGenres) {

    if (text == genre) {

      if (text == "all")
        return "%";
      
      return text;

    }

  }

  return "all";

}

function randomNumber(
  maximum: number,
  roundType: "floor" | "ceil" | "round" | undefined
): number {

  const randomizedValue = Math.random() * maximum;
  let roundedValue: number = 0;

  switch (roundType) {
    case "floor":
      roundedValue = Math.floor(randomizedValue);
      break;
    case "ceil":
      roundedValue = Math.ceil(randomizedValue);
      break;
    case "round":
      roundedValue = Math.round(randomizedValue);
      break;
    default:
      roundedValue = Math.floor(randomizedValue);
      
  }

  return roundedValue;
}