// 填入每页显示的文章数
var itemsPerPage = 15;

//填入自定义页面的数量
var custompages = 0;

//---------------------------------------------------------------------

// XML文件路径
var xmlUrl = `${window.location.origin}/rss.xml`;

// 获取当前页数
function getCurrentPage() {
    const currentUrl = window.location.href;
    const match = currentUrl.match(/page(\d+)\.html/);
    // console.log(match ? parseInt(match[1]) : 1);
    return match ? parseInt(match[1]) : 1;
}

// 插入页码元素，链接
function appendPageLink(pagination, pageNumber, currentPage) {
    var pageLink = document.createElement('a');
    pageLink.href = pageNumber === 1 ? `${window.location.origin}` : `${window.location.origin}/page${pageNumber}.html`;
    pageLink.textContent = pageNumber;
    if (pageNumber === currentPage) {
        pageLink.classList.add('current-page');
    }
    pagination.insertBefore(pageLink, pagination.children[pagination.children.length - 1]);
}

// 插入省略号
function appendDots(pagination) {
    var dots = document.createElement('span');
    dots.textContent = '...';
    pagination.insertBefore(dots, pagination.children[pagination.children.length - 1]);
}

// 插入分页条
function updatePagination(totalPages, currentPage) {
    var pagination = document.querySelector('.pagination');

    // 清除现有页码
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

    // 添加样式
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

// 主
fetch(xmlUrl)
    .then(response => response.text())
    .then(data => {
        var parser = new DOMParser();

        var xmlDoc = parser.parseFromString(data, "text/xml");

        // 查找所有item标签
        var items = xmlDoc.getElementsByTagName("item");

        // console.log(items.length);

        var itemslength = items.length - custompages;

        // 如果总条数小于等于每页显示的文章数，停止
        if (itemslength <= itemsPerPage) {
            return;
        }

        // 计算总页数
        var totalPages = Math.ceil(itemslength / itemsPerPage);

        // 获取当前页
        var currentPage = getCurrentPage();

        // 插入分页条
        updatePagination(totalPages, currentPage);
    })
    .catch(error => console.error('Error fetching XML:', error));
