// ======================================================
// 文章页+友情页：外部链接新窗口打开（排除自己主页）
// ======================================================
document.addEventListener('DOMContentLoaded', function () {
  const currentHost = window.location.host;
  const path = window.location.pathname;
  const needPage = path.startsWith('/post/') || path === '/link.html';

  // 只排除【旧GitHub域名】，其他都正常判断
  const excludeHosts = [
    'lykayang.github.io'  // 这里只写你原来的 github 域名
  ];

  if (needPage) {
    document.querySelectorAll('a').forEach(link => {
      if (!link.href || link.href.startsWith('javascript:')) return;
      try {
        const url = new URL(link.href);
        const isExternal = url.host !== currentHost;
        const isExcluded = excludeHosts.some(h => url.host.includes(h));

        if (isExternal && !isExcluded) {
          link.target = '_blank';
          link.rel = 'noopener noreferrer';
        }
      } catch (e) {}
    });
  }
});
// ====================== 结束 ==========================

