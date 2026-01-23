import { saveConfig, M3ColorsConfig } from "./config";
import { handleGenerate } from "./generate";

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
    generate?: boolean;
}

/**
 * Handle the init command
 * @param options - CLI options
 */
export function handleInit(options: InitOptions): void {
    const configPath = options.config || "m3-colors.config.json";
    const usingDefaultPrimary = !options.primary;

    // Create default configuration
    const config: M3ColorsConfig = {
        colors: {
            primary: options.primary || "#6750A4",
        },
        scheme: options.scheme || "content",
        contrast: options.contrast ? Number.parseFloat(options.contrast) : 0,
        format: options.format || "hex",
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
    if (usingDefaultPrimary) {
        console.log(`  Note: No primary color provided, using default ${config.colors.primary}`);
    }
    console.log(`  Primary color: ${config.colors.primary}`);
    console.log(`  Output: ${config.output}`);
    console.log(`  Format: ${config.format}`);

    // Generate CSS if --generate flag is set
    if (options.generate) {
        console.log("");
        handleGenerate({
            config: configPath,
        });
    }
}
