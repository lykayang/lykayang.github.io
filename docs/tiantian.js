const style = document.createElement("style");
style.innerHTML = `

.avatar:hover {
    transform: scale(1) rotate(0deg);
}

.SideNav-item:hover {
    background-color: #e2e2e2;
}

.SideNav-item {
    border-color: transparent;
}


`;
document.head.appendChild(style);