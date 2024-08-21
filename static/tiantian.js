const style = document.createElement("style");
style.innerHTML = `
.avatar {
    width:64px;
    height:64px;
    object-fit: cover;
}

.avatar:hover {
    transform: scale(1) rotate(0deg);
}

.SideNav {
    min-width: 360px;
    border-color: transparent;
    color: transparent;
}

.pagination a:hover, .pagination a:focus, .pagination span:hover, .pagination span:focus, .pagination em:hover, .pagination em:focus {
    border-color: rebeccapurple;
}

`;
document.head.appendChild(style);