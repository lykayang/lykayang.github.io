```
(function() {
    'use strict';

    console.log('开始搜索住建部网站的政策文件下载链接...');

    // 1. 寻找所有可能的下载链接（匹配API模式和常见的文件链接）
    const allLinks = Array.from(document.querySelectorAll('a[href]'));
    
    // 匹配两种模式：1. 你提供的API接口 2. 以.docx结尾的传统链接
    const downloadLinks = allLinks
        .map(a => a.href)
        .filter(href => {
            return href.includes('/document/download?') || 
                   href.includes('.docx') || 
                   href.includes('.doc');
        })
        .map(href => {
            // 处理相对路径
            try {
                return new URL(href, window.location.href).href;
            } catch (e) {
                return href;
            }
        });

    const uniqueLinks = [...new Set(downloadLinks)];
    
    console.log(`找到 ${uniqueLinks.length} 个可能的下载链接:`);
    uniqueLinks.forEach((link, i) => console.log(`${i+1}: ${link}`));

    if (uniqueLinks.length === 0) {
        console.log('未找到下载链接。请确认：\n1. 是否进入了包含具体文件下载链接的页面？\n2. 可能需要点击具体的政策标题进入详情页。');
        return;
    }

    // 2. 逐个触发下载（使用更可靠的方式）
    async function downloadAll() {
        for (let i = 0; i < uniqueLinks.length; i++) {
            const url = uniqueLinks[i];
            console.log(`正在触发下载 (${i+1}/${uniqueLinks.length})...`);
            
            // 尝试提取文件名（特别是从API链接的fileName参数中）
            let fileName = 'document.docx';
            try {
                const urlObj = new URL(url);
                const fileNameParam = urlObj.searchParams.get('fileName');
                if (fileNameParam) {
                    fileName = decodeURIComponent(fileNameParam);
                } else {
                    // 如果没有fileName参数，从路径末尾提取
                    const pathSegments = urlObj.pathname.split('/');
                    const lastSegment = pathSegments[pathSegments.length - 1];
                    if (lastSegment && (lastSegment.includes('.doc') || lastSegment.includes('.docx'))) {
                        fileName = lastSegment;
                    }
                }
            } catch (e) {
                // 忽略解析错误
            }
            
            // 方法A: 尝试创建隐藏链接并点击（适用于同源API）
            try {
                const a = document.createElement('a');
                a.href = url;
                a.download = fileName; // 尝试强制下载
                a.style.display = 'none';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                console.log(`✅ 已触发下载: ${fileName}`);
            } catch (e) {
                console.warn(`直接点击失败，尝试在新窗口打开: ${url}`);
                // 方法B: 在新窗口打开（作为备选）
                window.open(url, '_blank');
            }
            
            // 等待3秒再处理下一个，避免被浏览器拦截
            if (i < uniqueLinks.length - 1) {
                await new Promise(r => setTimeout(r, 3000));
            }
        }
        console.log('所有下载已触发。请检查浏览器下载列表。');
    }

    downloadAll();
})();
```