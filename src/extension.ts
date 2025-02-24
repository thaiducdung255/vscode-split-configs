import * as vscode from "vscode";
import { joinConfigs, formatPath } from "./join-configs";

export function activate(context: vscode.ExtensionContext) {
	const config = vscode.workspace.getConfiguration("split-configs");
	const keybindingsPath = formatPath(config.get<string>("keybindingsPath"));
	const settingsPath = formatPath(config.get<string>("settingsPath"));

	const keybindingsPartialPath = formatPath(
		config.get<string>("keybindingsPartialPath"),
	);

	const settingsPartialPath = formatPath(
		config.get<string>("settingsPartialPath"),
	);

	const disposable = vscode.commands.registerCommand(
		"split-configs.join",
		() => {
			joinConfigs({
			  keybindingsPath,
			  settingsPath,
			  settingsPartialPath,
			  keybindingsPartialPath
			});
			vscode.window.showInformationMessage("Configs joined!");
		},
	);

	context.subscriptions.push(disposable);
}

export function deactivate() {}
