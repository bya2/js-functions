Start-Job -ScriptBlock { tsc -w ./exec/index.ts }
Start-Job -ScriptBlock { tsc-watch --onSuccess "node ./exec/index.js" }