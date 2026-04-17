// ================== Gmeek 专用分页增强 ==================
var itemsPerPage = 15;        // 改成和 Gmeek 配置一致（onePageListNum）
var custompages = 0;          // 建议把「关于」「友链」等独立页面减掉，防止算错总页数

var xmlUrl = `${window.location.origin}/rss.xml`;

function getCurrentPage() {
    const currentUrl = window.location.href;
    const match = currentUrl.match(/page(\d+)\.html/);
    return match ? parseInt(match[1]) : 1;
}

// 查找分页容器（Gmeek 常用这几个 class，自动适配）
function getPaginationContainer() {
    return document.querySelector('.pagination') || 
           document.querySelector('.page-nav') || 
           document.querySelector('.pager') ||
           document.querySelector('nav[aria-label="分页"]');
}

function appendPageLink(pagination, pageNumber, currentPage) {
    var pageLink = document.createElement('a');
    pageLink.href = pageNumber === 1 
        ? `${window.location.origin}/` 
        : `${window.location.origin}/page${pageNumber}.html`;
    pageLink.textContent = pageNumber;
    if (pageNumber === currentPage) {
        pageLink.classList.add('current-page');
    }
    pagination.appendChild(pageLink);   // 改用 appendChild，避免破坏原有上一页/下一页
}

function appendDots(pagination) {
    var dots = document.createElement('span');
    dots.textContent = '...';
    dots.className = 'dots';
    pagination.appendChild(dots);
}

function updatePagination(totalPages, currentPage) {
    let pagination = getPaginationContainer();
    if (!pagination) {
        console.warn('Gmeek 分页容器未找到，无法插入页码');
        return;
    }

    // 清空原有页码（保留上一页和下一页）
    while (pagination.children.length > 0) {
        const child = pagination.children[0];
        if (child.textContent.includes('上一') || child.textContent.includes('下一') || 
            child.getAttribute('rel') === 'prev' || child.getAttribute('rel') === 'next') {
            // 保留上一页/下一页
        } else {
            child.remove();
        }
    }

    // 生成页码
    if (totalPages <= 8) {
        for (let i = 1; i <= totalPages; i++) {
            appendPageLink(pagination, i, currentPage);
        }
    } else {
        appendPageLink(pagination, 1, currentPage);
        if (currentPage > 4) appendDots(pagination);

        let start = Math.max(2, currentPage - 2);
        let end = Math.min(totalPages - 1, currentPage + 2);
        for (let i = start; i <= end; i++) {
            appendPageLink(pagination, i, currentPage);
        }

        if (currentPage < totalPages - 3) appendDots(pagination);
        appendPageLink(pagination, totalPages, currentPage);
    }

    // 当前页样式
    const style = document.createElement('style');
    style.textContent = `
        .current-page { font-weight: bold; color: #e74c3c; text-decoration: underline; }
        .dots { margin: 0 8px; color: #999; }
    `;
    document.head.appendChild(style);
}

// 主逻辑
document.addEventListener('DOMContentLoaded', () => {
    fetch(xmlUrl)
        .then(response => {
            if (!response.ok) throw new Error('RSS fetch failed');
            return response.text();
        })
        .then(data => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data, "text/xml");
            const items = xmlDoc.getElementsByTagName("item");
            const itemslength = Math.max(0, items.length - custompages);

            if (itemslength <= itemsPerPage) {
                console.log('文章太少，不需要生成页码');
                return;
            }

            const totalPages = Math.ceil(itemslength / itemsPerPage);
            const currentPage = getCurrentPage();

            updatePagination(totalPages, currentPage);
            console.log(`Gmeek 分页增强完成：共 ${itemslength} 篇文章，${totalPages} 页，当前第 ${currentPage} 页`);
        })
        .catch(error => {
            console.error('Gmeek 分页 JS 错误:', error);
        });
});
