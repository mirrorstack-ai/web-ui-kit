import { type ButtonSize, iconSizes } from "./button-styles";

export function MaterialIcon({ name, size }: { name: string; size: ButtonSize }) {
  return (
    <span className="material-symbols-rounded" style={{ fontSize: iconSizes[size] }}>
      {name}
    </span>
  );
}
