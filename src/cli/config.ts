import fs from "node:fs";

/**
 * Configuration for M3 colors
 */
export interface M3ColorsConfig {
    colors: {
        primary: string;
        secondary?: string;
        tertiary?: string;
        [key: string]: string | undefined;
    };
    scheme?: string;
    contrast?: number;
    format?: "hex" | "oklch";
    mode?: "combined" | "light" | "dark";
    output?: string;
}

const DEFAULT_CONFIG_PATH = "m3-colors.config.json";

/**
 * Load configuration from file
 * @param configPath - Path to config file (optional)
 * @returns Configuration object or null if not found
 */
export function loadConfig(configPath?: string): M3ColorsConfig | null {
    const filePath = configPath || DEFAULT_CONFIG_PATH;

    if (!fs.existsSync(filePath)) {
        return null;
    }

    const content = fs.readFileSync(filePath, "utf-8");
    const parsed = JSON.parse(content) as M3ColorsConfig;

    if (!parsed.colors?.primary) {
        throw new Error("Config file must include colors.primary");
    }

    return parsed;
}

/**
 * Save configuration to file
 * @param config - Configuration object
 * @param configPath - Path to save config file
 */
export function saveConfig(
    config: M3ColorsConfig,
    configPath: string = DEFAULT_CONFIG_PATH
): void {
    const content = JSON.stringify(config, null, 2);
    fs.writeFileSync(configPath, content, "utf-8");
}

/**
 * Merge configuration with CLI flags
 * @param config - Base configuration
 * @param flags - CLI flags
 * @returns Merged configuration
 */
export function mergeConfigWithFlags(
    config: M3ColorsConfig,
    flags: Partial<Omit<M3ColorsConfig, "colors">> & { colors?: Partial<M3ColorsConfig["colors"]> }
): M3ColorsConfig {
    const mergedColors = { ...config.colors };

    if (flags.colors) {
        Object.entries(flags.colors).forEach(([key, value]) => {
            if (value !== undefined) {
                mergedColors[key] = value;
            }
        });
    }

    return {
        ...config,
        scheme: flags.scheme ?? config.scheme,
        contrast: flags.contrast ?? config.contrast,
        format: flags.format ?? config.format,
        mode: flags.mode ?? config.mode,
        output: flags.output ?? config.output,
        colors: mergedColors,
    };
}
