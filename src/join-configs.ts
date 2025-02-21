import * as vscode from "vscode";

const { writeFileSync, readdirSync } = require("node:fs");

function getPartialConfig(
	dir: string,
	isArray = true,
	fts = ["json"],
	excludedFilenames = ["package.json", "package-lock.json"],
) {
	console.log(
		`Getting partial configs from: ${dir}, filetypes: ${fts.join(", ")}, excluded filenames: ${excludedFilenames.join(", ")}`,
	);

	let configs: KeyBinding[] | object = isArray ? [] : {};

	const filenames = readdirSync(dir).filter((filename: string) => {
		const ft = filename.split(".").slice(-1)[0];
		return !excludedFilenames.includes(filename) && fts.includes(ft);
	});

	console.log(`Found ${filenames.length} valid files: ${filenames.join(", ")}`);

	for (const filename of filenames) {
		const partialConfigs = require(`${dir}/${filename}`);

		if (Array.isArray(configs)) {
			configs.push(...partialConfigs);
		} else {
			configs = { ...configs, ...partialConfigs };
		}
	}

	console.log("Got partial config files done");
	return configs;
}

type KeyBinding = {
	key: string;
	command: string;
	when: string;
};

function removeDuplicatedConfigs(configs: KeyBinding[]) {
	console.log("Removing dupplicated configs");
	const originalConfigCount = configs.length;
	let removeCount = 0;

	for (let i = 0; i < configs.length; i++) {
		const { key, command, when } = configs[i];

		for (const oldConfig of configs.slice(0, i)) {
			const { key: _key, command: _command, when: _when } = oldConfig;

			if (key === _key && command === _command && when === _when) {
				configs.splice(i, 1);
				i--;
				removeCount++;
				break;
			}
		}
	}

	console.log(`Removed ${removeCount}/${originalConfigCount} configs`);
}

function gatherVsCodeConfig(opts: {
	configPath: string;
	partialDir: string;
	isArray?: boolean;
}) {
	const { configPath, partialDir, isArray = true } = opts;
	const configs = getPartialConfig(partialDir, isArray);
	isArray && Array.isArray(configs) && removeDuplicatedConfigs(configs);
	writeFileSync(configPath, JSON.stringify(configs, null, "\t"));

	console.log(
		`Wrote ${Array.isArray(configs) ? configs.length : 1} configs to ${configPath}`,
	);
}

function formatPath(rawPath: string | undefined) {
	const { HOME } = process.env;

	if (!rawPath) {
		throw new Error("Path not found");
	}

	if (!HOME) {
		throw new Error("HOME environment variable not found");
	}

	return rawPath.replace(/^~/, HOME);
}

export function joinConfigs() {
	const config = vscode.workspace.getConfiguration("split-configs");
	const keybindingsPath = formatPath(config.get<string>("keybindingsPath"));
	const settingsPath = formatPath(config.get<string>("settingsPath"));

	const keybindingsPartialPath = formatPath(
		config.get<string>("keybindingsPartialPath"),
	);

	const settingsPartialPath = formatPath(
		config.get<string>("settingsPartialPath"),
	);

	gatherVsCodeConfig({
		configPath: keybindingsPath,
		partialDir: keybindingsPartialPath,
	});

	gatherVsCodeConfig({
		configPath: settingsPath,
		partialDir: settingsPartialPath,
		isArray: false,
	});
}
