const style = document.createElement("style");
style.innerHTML = `
.blogTitle {
    display: unset;
}

#header {
    display:flex;padding-bottom:8px;
    border-bottom: 1px solid var(--borderColor-muted, var(--color-border-muted));margin-bottom: 16px;
}

#footer {
    margin-top:64px;
    text-align: center;font-size: small;
}

#header h1 {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
}

.avatar {
    transition: 0.8s;
    width:64px;
    height:64px;
    object-fit: cover;
}

#header h1 a {
    color:inherit;
    text-decoration:none;
    vertical-align: bottom;
    font-size:40px;
    font-family:Monaco;
    margin-left:8px;
}

body {
    box-sizing: border-box;
    min-width: 200px;
    max-width: 900px;
    margin: 30px auto;
    padding: 45px;
    font-size: 16px;
    font-family: sans-serif;
    line-height: 1.25;
}

.SideNav {
    min-width: 360px;
}

.SideNav-icon{margin-right: 16px}

.SideNav-item .Label {
    color: #fff;margin-left:4px;
}

.d-flex {
    min-width:0;
}

.listTitle {
    overflow:hidden;
    white-space:nowrap;
    text-overflow: ellipsis;
    max-width: 100%;
}

.listLabels {
    white-space:nowrap;
    display:flex;
}

.listLabels object {
    max-height:16px;
    max-width:24px;
}

.SideNav-item:hover {
    background-color: #c3e4e3;
}

.SideNav-item {
    transition: 0.5s;
}

.pagination a:hover, .pagination a:focus, .pagination span:hover, .pagination span:focus, .pagination em:hover, .pagination em:focus {
    border-color: rebeccapurple;
}
`;
document.head.appendChild(style);