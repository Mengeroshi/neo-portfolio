import { type Difficulty } from "@prisma/client";

const Triangle = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="23"
    height="19"
    fill="none"
    viewBox="0 0 23 19"
  >
    <path
      className="stroke-blue-900 group-hover:fill-green-200 group-hover:stroke-green-900"
      d="m11.5 1 9.96 17.25H1.54z"
    ></path>
  </svg>
);

const Square = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="22"
    height="21"
    fill="none"
    viewBox="0 0 22 21"
  >
    <path
      className="stroke-blue-900 group-hover:fill-yellow-200 group-hover:stroke-yellow-900"
      d="M1 1h20v19H1z"
    ></path>
  </svg>
);

const Hexagon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="26"
    fill="none"
    viewBox="0 0 24 26"
  >
    <path
      className="stroke-blue-900 group-hover:fill-red-200 group-hover:stroke-red-900"
      d="m12 1 10.392 6v12L12 25 1.608 19V7z"
    ></path>
  </svg>
);

export const DifficultyIcon = ({ difficulty }: { difficulty: Difficulty }) => {
  if (difficulty === "LOW") {
    return <Triangle />;
  }

  if (difficulty === "MEDIUM") {
    return <Square />;
  }

  if (difficulty === "HARD") {
    return <Hexagon />;
  }
  return null;
};
