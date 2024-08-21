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

`;
document.head.appendChild(style);