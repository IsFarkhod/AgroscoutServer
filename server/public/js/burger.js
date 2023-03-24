const burger = document.querySelector(".burger")
const mobMenu = document.querySelector(".mob__menu")

burger.addEventListener('click', function () {
    burger.classList.toggle('burger--active')
    mobMenu.classList.toggle('mob__menu--active')
})