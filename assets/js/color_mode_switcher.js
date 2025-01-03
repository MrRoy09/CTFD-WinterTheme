"use strict";

/**
 * Get user preferred theme from their past choice or browser
 * @returns {String} User preferred theme
 */
function getPreferredTheme() {
  return window.matchMedia("(prefers-color-scheme: dark)");
}

/**
 * Update navbar icon to match given theme.
 * @param {String} theme - 'dark' or 'light'
 */
function showActiveTheme(theme) {
  const activeThemeIcon = document.querySelector(".theme-switch i.fas");
  activeThemeIcon.classList.toggle("fa-moon", theme === "dark");
  activeThemeIcon.classList.toggle("fa-sun", theme !== "dark");
}

// Change body theme early to prevent flash
let currentTheme = getPreferredTheme();
document.documentElement.setAttribute("data-bs-theme", currentTheme);


