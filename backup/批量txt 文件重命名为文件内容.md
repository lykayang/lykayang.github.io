```
<#
.SYNOPSIS
    批量将指定目录下的 .txt 文件重命名为文件内容的第一行（非空行）。
.DESCRIPTION
    遍历指定目录中的所有 .txt 文件，读取前四行，使用第一个非空行作为新文件名。
    如果四行都为空，则跳过该文件并发出警告。文件名中的非法字符会被替换为下划线。
.PARAMETER Path
    要处理的目录路径，默认为当前目录。
.PARAMETER Recurse
    开关参数，如果指定则递归处理子目录中的 .txt 文件。
.EXAMPLE
    .\Rename-TxtByFirstLine.ps1 -Path "C:\Docs"
    处理 C:\Docs 目录下的所有 .txt 文件。
.EXAMPLE
    .\Rename-TxtByFirstLine.ps1 -Recurse
    递归处理当前目录及其子目录中的所有 .txt 文件。
#>

param(
    [string]$Path = ".",
    [switch]$Recurse
)

# 解析目标目录的完整路径
$targetDir = Resolve-Path $Path -ErrorAction Stop

Write-Host "处理目录: $targetDir"

# 获取所有 .txt 文件
$files = Get-ChildItem -Path $targetDir -Filter *.txt -File -Recurse:$Recurse

foreach ($file in $files) {
    Write-Progress -Activity "重命名文件" -Status $file.Name -PercentComplete (($files.IndexOf($file) / $files.Count) * 100)

    try {
        # 读取前四行
        $lines = Get-Content -Path $file.FullName -TotalCount 4 -ErrorAction Stop

        # 查找第一个非空行（去除空白后不为空）
        $newBaseName = $null
        foreach ($line in $lines) {
            $trimmed = $line.Trim()
            if ($trimmed -ne '') {
                $newBaseName = $trimmed
                break
            }
        }

        if ($null -eq $newBaseName) {
            Write-Warning "文件 '$($file.Name)' 的前四行均为空，跳过重命名。"
            continue
        }

        # 清理非法文件名字符 (Windows 不允许 \ / : * ? " < > |)
        $cleanName = [regex]::Replace($newBaseName, '[\\/:*?"<>|]', '_')

        # 去除前后空格
        $cleanName = $cleanName.Trim()

        # 如果清理后为空，则使用默认名称
        if ([string]::IsNullOrWhiteSpace($cleanName)) {
            $cleanName = "未命名"
        }

        # 构建新文件名（保留原扩展名 .txt）
        $newFileName = $cleanName + $file.Extension

        # 确保新文件名在当前目录中唯一
        $finalName = $newFileName
        $counter = 1
        $parentDir = $file.Directory.FullName
        while (Test-Path (Join-Path $parentDir $finalName)) {
            $finalName = "${cleanName}_$counter$($file.Extension)"
            $counter++
        }

        # 重命名文件
        Rename-Item -Path $file.FullName -NewName $finalName -ErrorAction Stop
        Write-Host "已重命名: '$($file.Name)' -> '$finalName'"
    }
    catch {
        Write-Error "处理文件 '$($file.FullName)' 时出错: $_"
    }
}

Write-Host "处理完成。"
```