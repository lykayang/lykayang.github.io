```
Add-Type -AssemblyName System.Web
Get-ChildItem *.html -Recurse | ForEach-Object {
    $html = Get-Content $_.FullName -Raw -Encoding UTF8
    $doc = New-Object -ComObject "HTMLFile"
    $doc.IHTMLDocument2_write($html)
    $text = $doc.body.innerText
    $text = [System.Web.HttpUtility]::HtmlDecode($text)
    $text | Set-Content ($_.BaseName + ".txt") -Encoding UTF8
}
```
把所有 HTML 放到同一个文件夹，打开 PowerShell（Win + S 搜索），cd 进入该文件夹，然后直接粘贴运行下面代码（一行一行回车）：

-Recurse 会自动处理子文件夹。

输出 .txt 会和原 HTML 同名同目录。

如果遇到编码问题，把 -Encoding UTF8 改成 Default 试试。