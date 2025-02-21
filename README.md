# split-configs

A simple extension used to split `settings.json` and `keybindings.json` into multiple files. It will join multiple `json` files into a single config file (`settings.json`/`keybinding.json`)

### NOTE: For now, this can only write config from partial `json` files into config file. So if you make any changes in config file, these config WILL BE LOST when join config files

## Features

We can split `settings.json` and `keybindings.json`. For example:

partials/ 					# directory to store partial configs
|- keybindings/
|	|- keybindings1.json	# partial config file
|	|- keybindings2.json
|	|- <more>.json
|
|- settings/
|	|- settings1.json
|	|- settings2.json
|	|- <more>.json
|
|- setting.json 			# target config file
|- keybindings.json 		# target config file

Example of partial keybindings file:

``` json
[
	{
		"key": "alt+c",
		"command": "editor.action.clipboardCopyAction"
	},
	{
		"key": "alt+x",
		"command": "editor.action.clipboardCutAction"
	},
	{
		"key": "shift+tab",
		"command": "editor.action.smartSelect.shrink",
		"when": "vim.mode == 'Normal' && !textCompareEditorVisible && editorFocus"
	},
	{
		"key": "tab",
		"command": "editor.action.smartSelect.expand",
		"when": "vim.mode == 'Normal' && !textCompareEditorVisible && editorFocus"
	},
	{
		"key": "ctrl+enter",
		"command": "editor.action.inlineSuggest.commit",
		"when": "editorTextFocus && vim.mode == 'Insert'"
	}
]
```

Example of partial settings file:

``` json
{
	"$schema": "vscode://schemas/settings/default",
	"split-configs.keybindingsPath": "~/.config/Code/User/keybindings.json",
	"split-configs.settingsPath": "~/.config/Code/User/settings.json",
	"split-configs.keybindingsPartialPath": "~/.config/Code/User/partials/keybindings",
	"split-configs.settingsPartialPath": "~/.config/Code/User/partials/settings"
}
```



## Requirements

Latest NodeJS installed

## Extension Settings

* `split-configs.keybindingsPath`: path to `keybindings.json` file
* `split-configs.settingsPath`: path to `settings.json` file
* `split-configs.keybindingsPartialPath`: path to directory that stores partial keybindings files
* `split-configs.settingsPartialPath`: path to directory that stores partial settings files