import { saveConfig, M3ColorsConfig } from "./config";

interface InitOptions {
    primary?: string;
    secondary?: string;
    tertiary?: string;
    scheme?: string;
    contrast?: string;
    format?: "hex" | "oklch";
    mode?: "combined" | "light" | "dark";
    output?: string;
    config?: string;
}

/**
 * Handle the init command
 * @param options - CLI options
 */
export function handleInit(options: InitOptions): void {
    const configPath = options.config || "m3-colors.config.json";

    // Create default configuration
    const config: M3ColorsConfig = {
        colors: {
            primary: options.primary || "#6750A4",
        },
        scheme: options.scheme || "content",
        contrast: options.contrast ? parseFloat(options.contrast) : 0,
        format: options.format || "oklch",
        mode: options.mode || "combined",
        output: options.output || "src/m3-theme.css",
    };

    // Add optional colors
    if (options.secondary) {
        config.colors.secondary = options.secondary;
    }
    if (options.tertiary) {
        config.colors.tertiary = options.tertiary;
    }

    // Save configuration
    saveConfig(config, configPath);

    console.log(`Success: Created configuration file at ${configPath}`);
    console.log(`  Primary color: ${config.colors.primary}`);
    console.log(`  Output: ${config.output}`);
    console.log(`  Format: ${config.format}`);
}
