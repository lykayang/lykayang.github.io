<script>
// ========== 请修改以下两个参数 ==========
var itemsPerPage = 15;  // 【请修改】设置每页显示的文章数量，默认15
var custompages = 0;    // 【请修改】config.json中"singlePage"数组的数量，默认0
// ======================================

// XML文件路径，自动从博客根目录获取rss.xml
var xmlUrl = `${window.location.origin}/rss.xml`;

// 从当前URL中解析出页码
function getCurrentPage() {
    const currentUrl = window.location.href;
    const match = currentUrl.match(/page(\d+)\.html/);
    return match ? parseInt(match[1]) : 1;
}

// 创建单个页码链接
function appendPageLink(pagination, pageNumber, currentPage) {
    var pageLink = document.createElement('a');
    pageLink.href = pageNumber === 1 ? `${window.location.origin}` : `${window.location.origin}/page${pageNumber}.html`;
    pageLink.textContent = pageNumber;
    if (pageNumber === currentPage) {
        pageLink.classList.add('current-page');
    }
    pagination.insertBefore(pageLink, pagination.children[pagination.children.length - 1]);
}

// 创建省略号
function appendDots(pagination) {
    var dots = document.createElement('span');
    dots.textContent = '...';
    pagination.insertBefore(dots, pagination.children[pagination.children.length - 1]);
}

// 核心逻辑：更新分页条显示
function updatePagination(totalPages, currentPage) {
    var pagination = document.querySelector('.pagination');
    // 清空现有页码（保留首尾的上一页/下一页按钮）
    while (pagination.children.length > 2) {
        pagination.removeChild(pagination.children[1]);
    }

    if (totalPages <= 10) {
        for (var i = 1; i <= totalPages; i++) {
            appendPageLink(pagination, i, currentPage);
        }
    } else {
        appendPageLink(pagination, 1, currentPage);
        appendPageLink(pagination, 2, currentPage);
        appendPageLink(pagination, 3, currentPage);
        if (currentPage > 5) {
            appendDots(pagination);
        }
        var startPage = Math.max(4, currentPage - 2);
        var endPage = Math.min(totalPages - 3, currentPage + 2);
        for (var i = startPage; i <= endPage; i++) {
            appendPageLink(pagination, i, currentPage);
        }
        if (currentPage < totalPages - 4) {
            appendDots(pagination);
        }
        appendPageLink(pagination, totalPages - 2, currentPage);
        appendPageLink(pagination, totalPages - 1, currentPage);
        appendPageLink(pagination, totalPages, currentPage);
    }

    // 注入CSS样式（可自定义）
    var style = document.createElement('style');
    style.textContent = `
        .pagination a.current-page {
            font-weight: bold;
            color: red;
            text-decoration: underline;
            font-size: 18px;
            border-color: #56539d;
        }
    `;
    document.head.appendChild(style);
}

// 主流程：获取rss.xml并生成分页
fetch(xmlUrl)
    .then(response => response.text())
    .then(data => {
        var parser = new DOMParser();
        var xmlDoc = parser.parseFromString(data, "text/xml");
        var items = xmlDoc.getElementsByTagName("item");
        var itemslength = items.length - custompages;
        if (itemslength <= itemsPerPage) {
            return;
        }
        var totalPages = Math.ceil(itemslength / itemsPerPage);
        var currentPage = getCurrentPage();
        updatePagination(totalPages, currentPage);
    })
    .catch(error => console.error('获取RSS文件时出错:', error));
</script>
