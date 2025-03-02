import * as vscode from 'vscode'
import { formatPath, joinConfigs } from './join-configs'

export function activate(context: vscode.ExtensionContext) {
  const config = vscode.workspace.getConfiguration('split-configs')
  const keybindingsPath = formatPath(config.get<string>('keybindingsPath'))
  const settingsPath = formatPath(config.get<string>('settingsPath'))

  const excludedFilenames = config.get<string[]>('excludedFileNames')

  const keybindingsPartialPath = formatPath(
    config.get<string>('keybindingsPartialPath'),
  )

  const settingsPartialPath = formatPath(
    config.get<string>('settingsPartialPath'),
  )

  vscode.window.showInformationMessage(
    `setting partial path: ${settingsPartialPath}`,
  )

  vscode.window.showInformationMessage(
    `key binding partial path: ${keybindingsPartialPath}`,
  )

  vscode.window.showInformationMessage(
    `excluded file names: ${(excludedFilenames || []).join(', ')}`,
  )

  const disposable = vscode.commands.registerCommand(
    'split-configs.join',
    () => {
      joinConfigs({
        keybindingsPath,
        settingsPath,
        settingsPartialPath,
        keybindingsPartialPath,
        excludedFilenames,
      })
      vscode.window.showInformationMessage('Configs joined!')
    },
  )

  context.subscriptions.push(disposable)
}

export function deactivate() {}
