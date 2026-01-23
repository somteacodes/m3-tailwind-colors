#!/usr/bin/env node

import { Command } from "commander";
import { handleInit } from "./cli/init";
import { handleGenerate } from "./cli/generate";

const program = new Command();

program
    .name("m3-tailwind-colors")
    .description("Generate Material 3 colors for Tailwind CSS v4")
    .version("0.2.0");

// Init command
program
    .command("init")
    .description("Create a configuration file with default values")
    .option("--primary <color>", "Primary color (hex format)")
    .option("--secondary <color>", "Secondary color (hex format)")
    .option("--tertiary <color>", "Tertiary color (hex format)")
    .option("--scheme <name>", "Color scheme (content, expressive, etc.)")
    .option("--contrast <number>", "Contrast level (-1 to 1)")
    .option("--format <format>", "Color format (hex or oklch)")
    .option("--mode <mode>", "Output mode (combined, light, or dark)")
    .option("--output <path>", "Output CSS file path")
    .option("--config <path>", "Config file path", "m3-colors.config.json")
    .option("--generate", "Also generate CSS file after creating config")
    .action((options) => {
        handleInit(options);
    });

// Generate command
program
    .command("generate")
    .description("Generate CSS theme file from configuration")
    .option("--primary <color>", "Primary color (hex format)")
    .option("--secondary <color>", "Secondary color (hex format)")
    .option("--tertiary <color>", "Tertiary color (hex format)")
    .option("--scheme <name>", "Color scheme (content, expressive, etc.)")
    .option("--contrast <number>", "Contrast level (-1 to 1)")
    .option("--format <format>", "Color format (hex or oklch)")
    .option("--mode <mode>", "Output mode (combined, light, or dark)")
    .option("--output <path>", "Output CSS file path")
    .option("--config <path>", "Config file path", "m3-colors.config.json")
    .option("--include-tailwind-import", "Include @import 'tailwindcss' in output")
    .option("--dark-mode <strategy>", "Dark mode strategy: media (default) or class", "media")
    .action((options) => {
        handleGenerate(options);
    });

program.parse();
