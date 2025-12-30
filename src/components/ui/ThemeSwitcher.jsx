import { useTheme } from "../../context/ThemeContext";
import { Button } from "@/components/ui/button";

export default function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button onClick={toggleTheme}>
      {theme === "light" ? "🌙 Sombre" : "☀️ Clair"}
    </Button>
  );
}
