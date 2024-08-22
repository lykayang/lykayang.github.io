const style = document.createElement("style");
style.innerHTML = `

#avatarImg {
    border: none !important;
    outline: none !important;
    box-shadow: none !important;
    background-color: transparent !important;
}

.avatar:hover {
    transform: scale(1) rotate(0deg);
}

.SideNav-item {
    border-color: transparent;
}


#content {
    border: 0 !important;
    outline: 0 !important;
    box-shadow: none !important;
    background-color: transparent !important;
}

nav.SideNav {
    border: 0 !important;
    outline: 0 !important;
    box-shadow: none !important;
    background-color: transparent !important;
}

`;
document.head.appendChild(style);