const style = document.createElement("style");
style.innerHTML = `

#avatarImg {
    border: none; /* 去掉边框 */
    outline: none; /* 去掉边框 */
    box-shadow: none; /* 去掉边框 */
    background-color: transparent !important; /* 去掉底色 */
}

.avatar:hover {
    transform: scale(1) rotate(0deg); /* logo不要放大转动 */
}

.SideNav-item {
    border-color: transparent; /* 去掉分隔线 */
}

nav.SideNav {
    border: 0 !important; /* 去掉边框 */
    outline: 0 !important;
    box-shadow: none !important;
    background-color: transparent !important;
}

`;
document.head.appendChild(style);