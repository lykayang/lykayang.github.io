```
Sub BatchConvertDocToTxt_Enhanced()
    Dim strFolder As String
    Dim strFile As String
    Dim strTxtFile As String
    Dim objDoc As Document
    Dim dlg As FileDialog
    Dim failedFiles As String
    Dim fileCount As Long
    
    ' 选择文件夹
    Set dlg = Application.FileDialog(msoFileDialogFolderPicker)
    dlg.Title = "请选择包含 DOC/DOCX 文件的文件夹"
    If dlg.Show <> -1 Then Exit Sub
    strFolder = dlg.SelectedItems(1)
    
    ' 初始化
    failedFiles = ""
    fileCount = 0
    Application.StatusBar = "正在准备转换..."
    Application.DisplayAlerts = False   ' 临时关闭警告
    
    ' 遍历所有 .doc* 文件
    strFile = Dir(strFolder & "\*.doc*")
    Do While strFile <> ""
        fileCount = fileCount + 1
        Application.StatusBar = "正在转换 (" & fileCount & "): " & strFile
        
        On Error Resume Next
        Set objDoc = Documents.Open(FileName:=strFolder & "\" & strFile, _
                                    ReadOnly:=True, Visible:=False)
        On Error GoTo 0
        
        If Not objDoc Is Nothing Then
            ' 生成 TXT 文件名（UTF-16 编码）
            strTxtFile = strFolder & "\" & Left(strFile, InStrRev(strFile, ".") - 1) & ".txt"
            
            ' 保存为 Unicode 文本（UTF-16 LE）
            objDoc.SaveAs2 FileName:=strTxtFile, FileFormat:=wdFormatUnicodeText
            
            objDoc.Close SaveChanges:=wdDoNotSaveChanges
            Debug.Print "已转换: " & strFile
        Else
            ' 记录失败的文件
            failedFiles = failedFiles & strFile & vbCrLf
        End If
        
        Set objDoc = Nothing
        strFile = Dir()
    Loop
    
    ' 恢复设置
    Application.DisplayAlerts = True
    Application.StatusBar = ""
    
    ' 显示结果
    If failedFiles = "" Then
        MsgBox "转换完成！共处理 " & fileCount & " 个文件。", vbInformation
    Else
        MsgBox "转换完成，但有 " & vbCrLf & failedFiles & " 个文件未能处理。", vbExclamation
    End If
    
    Set dlg = Nothing
End Sub
```