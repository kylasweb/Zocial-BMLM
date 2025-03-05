export interface ThemeVariable {
  value: string;
  type: 'color' | 'size' | 'font' | 'spacing';
  label: string;
  description?: string;
}

export interface ThemeSection {
  id: string;
  label: string;
  variables: Record<string, ThemeVariable>;
}

export interface ThemeConfig {
  id: string;
  name: string;
  description: string;
  version: string;
  sections: ThemeSection[];
  variables: Record<string, string>;
  customCSS?: string;
  templates?: Record<string, any>;
}

export interface ThemeContextType {
  activeTheme: string;
  setActiveTheme: (theme: string) => void;
  themeConfig: ThemeConfig;
  updateThemeVariable: (key: string, value: string) => void;
}