window.onload = () => {
  const menu = document.getElementById('thumb-menu')
  const navList = document.getElementById('nav-list')
  const thumbOpen = document.getElementById('thumb-open')
  const thumbClose = document.getElementById('thumb-close')

  console.log('thumbClose', thumbClose)
  menu.onclick = () => {
    console.log('run...')
    navList.classList.toggle('block')
    navList.classList.toggle('hidden')
    thumbOpen.classList.toggle('hidden')
    thumbClose.classList.toggle('hidden')
    thumbClose.classList.toggle('block')
  }
}