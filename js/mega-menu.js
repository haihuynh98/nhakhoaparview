const menuItems = document.querySelectorAll('.dng-mega-menu > .menu-dng-v1 .menu-item');
menuItems.forEach(function (item) {
    const subMenu = item.querySelector('.sub-menu');
    item.addEventListener('mouseenter', function () {
        if(subMenu) {
            item.classList.add('has-sub');
        }
    
       
    });
    item.addEventListener('mouseout', function (event) {
     
        const subMenu = item.querySelector('.sub-menu');
        if (!item.contains(event.relatedTarget) && subMenu && !subMenu.contains(event.relatedTarget)) {
            item.classList.remove('has-sub');
        }
       
    });
});
function removeAllActiveClasses() {
    const allSubMenus = document.querySelectorAll('.sub-menu');
    allSubMenus.forEach(function(subMenu) {
        subMenu.classList.remove('active');
    });
}
const btnOpenMenuMobile = document.querySelector(".btn-open-menu-mobile");
const dngMegaMenuMobile = document.querySelector(".dng-mega-menu-mobile");
btnOpenMenuMobile.addEventListener('click',() => {
    dngMegaMenuMobile.classList.toggle('active');
})