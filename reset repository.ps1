$remote = "origin"
$keep = @("master", "alumno/2026/cramirezh", "dev")

# 1) Sincronizar y alinear master con tu branch
git fetch $remote
git push $remote "alumno/2026/cramirezh:master" --force-with-lease
git push $remote "alumno/2026/cramirezh:dev" --force-with-lease

# 2) Borrar todo lo demás (excepto keep y origin/HEAD)
$branches = git branch -r |
  ForEach-Object { $_.Trim() } |
  Where-Object { $_ -like "$remote/*" -and $_ -notlike "$remote/HEAD*" } |
  ForEach-Object { $_ -replace "^$remote/", "" } |
  Sort-Object -Unique

$branches |
  Where-Object { $keep -notcontains $_ } |
  ForEach-Object {
    Write-Host "Deleting remote branch: $_"
    git push $remote --delete $_
  }