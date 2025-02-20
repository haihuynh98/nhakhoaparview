const modals = document.querySelector('.fadvise__popup');
const forms = modals.querySelector('.form--register');

const HandleCTA = {
  hideModal(inputElement) {
    const closeButtons = modals.querySelectorAll('.f--btn_close');

    // Xử lý sự kiện click trên mỗi nút đóng
    closeButtons.forEach((button) => {
      button.addEventListener('click', () => {

        if (inputElement) {
          inputElement.remove();
        }
        // Gỡ bỏ sự kiện click sau khi xử lý
        modals.removeEventListener('click', handleOutsideClick);
      });
    });

    // Xử lý sự kiện click trên nền (background) của modal
    const handleOutsideClick = (event) => {
      const target = event.target;
      const formClicked = target.closest('.form--register');
      if (!formClicked) {
        // Nếu sự kiện click không xuất phát từ bên trong form
        if (inputElement) {
          inputElement.remove();
        }
        // Gỡ bỏ sự kiện click sau khi xử lý
        modals.removeEventListener('click', handleOutsideClick);
      }
    };

    // Thêm sự kiện click vào modal để xử lý click ngoài form
    modals.addEventListener('click', handleOutsideClick, { once: true });
  },

  handleSourceIdInput(formId, btn) {

    const SALE_CARE_SOURCE_ID = siteConfig.saleCareSourceId;
    const POST_ID = siteConfig.postId;

    if (!btn || !(btn instanceof Element)) {
      return;
    }

    let inputElement = formId.querySelector('.sale_care_source_id');

    if (POST_ID) {
      if (!inputElement) {
        const input = `<input class="sale_care_source_id" type="hidden" name="sale_care_source_id" value="${SALE_CARE_SOURCE_ID}">`;
        formId.insertAdjacentHTML('beforeend', input);
        inputElement = formId.querySelector('.sale_care_source_id'); // Cập nhật inputElement sau khi thêm vào DOM
      }
    } else {
      if (inputElement) {
        inputElement.remove();
      }
    }

    this.hideModal(inputElement); // Gọi hideModal với inputElement mới (nếu có)
  },

  observeInputElement() {
    const observer = new MutationObserver(mutationsList => {
      mutationsList.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === Node.ELEMENT_NODE && node.classList.contains('sale_care_source_id')) {
            // Khi phần tử .sale_care_source_id được thêm vào DOM
            this.hideModal(node);
          }
        });
      });
    });

    // Bắt đầu theo dõi sự thay đổi trên document.body
    observer.observe(document.body, { childList: true, subtree: true });
  },

  handleBtnCtaClick() {
    const ListBtnCta = document.querySelectorAll('.bg-cta');
    ListBtnCta.forEach(btn => {
      btn.addEventListener('click', () => {
        this.handleSourceIdInput(forms, btn);
      });
    });
  },

  init() {
    this.observeInputElement(); // Bắt đầu theo dõi sự thay đổi trong DOM
    this.handleBtnCtaClick();
  }
};

document.addEventListener("DOMContentLoaded", () => {
  HandleCTA.init();
});