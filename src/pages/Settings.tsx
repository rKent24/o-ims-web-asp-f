import { Moon, Sun, Monitor } from "lucide-react";

import { useTheme } from "../components/theme-provider";

function Settings() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="max-w-3xl">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="mt-1 text-muted-foreground">
          Manage your application preferences.
        </p>
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-semibold">Appearance</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Choose how Jack's IMS looks.
        </p>

        <div className="mt-4 grid grid-cols-3 gap-3">
          <button
            onClick={() => setTheme("light")}
            className={`flex flex-col items-center gap-2 rounded-lg border p-4 transition-colors ${
              theme === "light"
                ? "border-primary bg-primary/10"
                : "border-border hover:bg-accent"
            }`}
          >
            <Sun className="h-5 w-5" />
            <span className="text-sm font-medium">Light</span>
          </button>

          <button
            onClick={() => setTheme("dark")}
            className={`flex flex-col items-center gap-2 rounded-lg border p-4 transition-colors ${
              theme === "dark"
                ? "border-primary bg-primary/10"
                : "border-border hover:bg-accent"
            }`}
          >
            <Moon className="h-5 w-5" />
            <span className="text-sm font-medium">Dark</span>
          </button>

          <button
            onClick={() => setTheme("system")}
            className={`flex flex-col items-center gap-2 rounded-lg border p-4 transition-colors ${
              theme === "system"
                ? "border-primary bg-primary/10"
                : "border-border hover:bg-accent"
            }`}
          >
            <Monitor className="h-5 w-5" />
            <span className="text-sm font-medium">System</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Settings;
