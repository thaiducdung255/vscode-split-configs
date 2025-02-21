import * as vscode from "vscode";
import { joinConfigs } from "./join-configs";

export function activate(context: vscode.ExtensionContext) {
	const disposable = vscode.commands.registerCommand(
		"split-configs.join",
		() => {
			joinConfigs();
			vscode.window.showInformationMessage("Configs joined!");
		},
	);

	context.subscriptions.push(disposable);
}

export function deactivate() {}
