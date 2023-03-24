const arrow = document.querySelector('.general__dropdown-img')
const show = document.querySelector('.general__dropdown-show')


console.log(arrow.addEventListener('click', function () {
    if (show.classList.toggle("general__dropdown--active")) {
        arrow.classList.add("general__dropdown--rotate")
    } else {
        arrow.classList.remove("general__dropdown--rotate")
    }
}))
