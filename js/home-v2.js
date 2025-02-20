jQuery(function ($) {
    const imgDoctorSub = $(".doctor-thumb-item img");
    imgDoctorSub.click(function () {
        let url = siteConfig.ajaxUrl ? siteConfig.ajaxUrl : "";
        let id = $(this).data('id');
        const getIconLoading = $("#iconloading__box");
        $.ajax({
            type: "get",
            url: url,
            data: { id: id, action: "getDoctorInfo" },
            dataType: "json",
            beforeSend: function () {
                getIconLoading.show();
            },
            success: function (response) {
                let title = response.title ? response.title : "";
                let desc = response.desc ? response.desc : "";
                let thumbUrl = response.thumbUrl ? response.thumbUrl : "";
                let eleDoctorTitle = $("#doctor-title");
                let eleDoctorDesc = $(".doctor-item-desc");
                eleDoctorTitle.text(title);
                eleDoctorDesc.html(desc)
            },
            error: function (error) {
                console.log(error);
            },
            complete: function () {
                getIconLoading.hide();
            }
        });
    })
    const isMobile = () => {
        return /iPhone|iPad|iPod|Android|webOS|BlackBerry|Windows Phone/i.test(navigator.userAgent);
    }
    $('.row-list-customer').flickity({
        cellAlign: 'center',
        wrapAround: 'true',
        contain: 'false',
        autoPlay: 'false',
        pageDots: true,
        prevNextButtons: true,
        pageDots: false,
        imagesLoaded: true,
        resize: true
    });
    $('.row-branch').flickity({
        cellAlign: 'left',
        wrapAround: 'true',
        contain: 'false',
        autoPlay: 'false',
        pageDots: true,
        prevNextButtons: true,
        pageDots: false,
        imagesLoaded: true,
        resize: true
    });
    if (isMobile()) {
        $('.row-list-service,.row-branch,.row-border-after').flickity({
            cellAlign: 'center',
            wrapAround: 'true',
            contain: 'false',
            autoPlay: 'true',
            prevNextButtons: false,
            pageDots: true,
            imagesLoaded: true,
            resize: true
        });
    }
    const btnOpenBookingForm = $(".btn-open-booking-form");
    btnOpenBookingForm.click(function (e) {
        e.preventDefault();
        showBookingFormv2()
    })
    const megaMenuLinks = document.querySelectorAll(".col-mega-menu-left.has-child .ux-menu-link__link");

    const activeMegaMenu = (item) => {
        const itemThumbUrl = item.getAttribute('rel') ||  "https://cdn2.diemnhangroup.com/nhakhoashark.vn/2024/02/dummy_600x400_ffffff_cccccc-1.png";
        const classChild = item.getAttribute('href').replace('#', '');
        const itemTextEle = item.querySelector(".ux-menu-link__text");
        const itemText = itemTextEle.textContent;
        console.log(itemText);
        const closestParent = item.closest('.col-mega-menu-left');
        if (closestParent) {
            const megaMenuCenter = closestParent.nextElementSibling;
            const megaMenuRight = megaMenuCenter.nextElementSibling;

            const megaMenuBannerImg = megaMenuRight.querySelector(".mega-menu-banner img");
            megaMenuBannerImg.setAttribute('srcset', itemThumbUrl);
            console.log(megaMenuBannerImg);
            const megaMenuChild = megaMenuCenter.querySelector(`.mega-menu-child.${classChild}`);
            megaMenuChild.classList.add('active');

            const firstMenuItem = megaMenuChild.querySelector('.ux-menu-link.flex.menu-item:first-child');
            const newText = document.createElement('h3');
            newText.textContent = itemText;
            if (firstMenuItem) {
                firstMenuItem.insertAdjacentElement('beforebegin', newText);
            }
            const allMegaMenuChildren = document.querySelectorAll('.mega-menu-child');
            allMegaMenuChildren.forEach(child => {
                if (child !== megaMenuChild) {
                    child.classList.remove('active');
                }
            });

        }
    }
    if(megaMenuLinks.length > 0) {
        const firstItem = megaMenuLinks[0]; 
        activeMegaMenu(firstItem);
      
    }
   
    
    megaMenuLinks.forEach(item => {
        item.addEventListener('mouseover', (e) => {
            e.preventDefault();
            activeMegaMenu(item);
        })
    })
});