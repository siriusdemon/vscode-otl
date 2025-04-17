// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "otl" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('otl.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from vscode-otl!');
	});

	const filePath = path.join(context.extensionPath, 'data', 'builtin.json');
	const raw = fs.readFileSync(filePath, 'utf8');
	const funcList = JSON.parse(raw);
	const provider = vscode.languages.registerCompletionItemProvider(
	    'otl', // 
    	{
			 provideCompletionItems(document, position) {
        return funcList.map((func: any) => {
          const item = new vscode.CompletionItem(func.name, vscode.CompletionItemKind.Function);
          item.detail = func.detail;
          item.insertText = new vscode.SnippetString(func.insertText);
          item.documentation = new vscode.MarkdownString(func.documentation);
          return item;
        });
	}
    },
    '' // means triggle at any character
  );
	context.subscriptions.push(disposable);
	context.subscriptions.push(provider);
}

// This method is called when your extension is deactivated
export function deactivate() {}
