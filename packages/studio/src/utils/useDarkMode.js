import { useState, useEffect } from "react";

export function useDarkMode() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Create the media query inside useEffect to ensure browser environment
    const mediaQuery = window?.matchMedia("(prefers-color-scheme: dark)");

    if (!mediaQuery) {
      return;
    }

    // Define the change handler
    const handleChange = (event) => {
      setIsDarkMode(event.matches);
    };

    // Add the listener
    mediaQuery.addEventListener("change", handleChange);

    // Set initial value
    setIsDarkMode(mediaQuery.matches);

    // Clean up
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  return isDarkMode;
}
