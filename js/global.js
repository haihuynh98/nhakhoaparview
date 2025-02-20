window.addEventListener("load", () => {
  switchTabLDP();
  if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  ) {
    clickMenuFooter();
  }
});
function clickMenuFooter() {
  let clickTitleMenu = document.querySelectorAll(".menu__footer");
  clickTitleMenu.forEach((value) => {
    value.addEventListener("click", (ele) => {
      let itemChi = value.parentElement;
      itemChi.querySelector(".ux-menu").classList.toggle("active_subm");
    });
  });
}

function onChangeTypeClickEventDate(item) {
  let itemTime = item.previousElementSibling;
  if (item.value) {
    itemTime.classList.add("hidden--input");
    item.showPicker();
  } else {
    itemTime.classList.remove("hidden--input");
  }
}
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

function checkValueForm(classParent) {
  const parentElement = document.querySelector(`.${classParent}`);
  let phoneInput = parentElement.querySelector('.phone-input-container');

  if (!parentElement) {
    console.error(`Không tìm thấy phần tử với class: ${classParent}`);
    return null;
  }

  let hasError = false;
  let dataName = "",
    dataPhone = "",
    dataEmail = "",
    dataTime = "",
    dataDate = "",
    dataNote = "",
    dataBranchs = "",
    dataService = "",
    saleCareSourceId = "";
    countryCode = "";
    language = "vi";

  function validateField(selector, errorMessage, isEmail = false) {
    const element = parentElement.querySelector(selector);
    
    if (element) {
      const value = element.value.trim();
      
      if (value === "") {
        hasError = true;
        element.classList.add("input__empty");

        if (element.nextElementSibling) {
          element.nextElementSibling.textContent = errorMessage;
        }

        if (phoneInput) {
          const phoneMess = element.closest('.phone-input-container')?.querySelector(".valid-feedback");

          if (phoneMess) {
            phoneMess.textContent = errorMessage;
          }
        }

        return "";
      } else {

        // Kiểm tra định dạng email nếu isEmail = true
        if (isEmail && !validateEmail(value)) {
          hasError = true;
          element.classList.add("input__empty");
          
          const emailError = "Email không hợp lệ!";
          if (element.nextElementSibling) {
            element.nextElementSibling.textContent = emailError;
          }

          return "";
        }

        element.classList.remove("input__empty");
        if (element.nextElementSibling) {
          element.nextElementSibling.textContent = "";
        }

        if (phoneInput) {
          const phoneMess = element.closest('.phone-input-container')?.querySelector(".valid-feedback");

          if (phoneMess) {
            phoneMess.textContent = "";
          }
        }
        return value;
      }
    }
    return "";
  }
  if (classParent == 'booking-page-v1') {
    dataName = validateField('[name="name"]', "Please enter your full name");
    dataPhone = validateField('[name="phone"]', "Please enter phone number");
    dataDate = validateField('[name="date"]', "Please select a date");
    dataTime = validateField('[name="time"]', "Please select a time");
    language = "en";
  } else {
    dataName = validateField('[name="name"]', "Vui lòng nhập họ và tên");
    dataPhone = validateField('[name="phone"]', "Vui lòng nhập số điện thoại");
    dataService = validateField('select[name="service"]', "Vui lòng chọn dịch vụ");
    dataBranchs = validateField('[name="branch"]', "Vui lòng chọn chi nhánh");
    dataDate = validateField('[name="date"]', "Vui lòng chọn ngày");
    dataTime = validateField('[name="time"]', "Vui lòng chọn giờ");
  }
  const noteLDPElement = parentElement.querySelector('[name="note_ldp"]');
  if (noteLDPElement) {
    dataService = noteLDP?.value;
  }

  const noteElement = parentElement.querySelector('[name="note"]');
  dataNote = noteElement ? noteElement.value.trim() : "";

  const saleCareElement = parentElement.querySelector('[name="sale_care_source_id"]');
  saleCareSourceId = saleCareElement ? saleCareElement.value : "";
  if (phoneInput) {
    var countryData = iti.getSelectedCountryData();
    countryCode = countryData.iso2
  }
  const emailElement = parentElement.querySelector('[name="email"]');
  
  if (emailElement) {
    dataEmail = validateField('[name="email"]', "Vui lòng nhập email", true);
  }

  if (hasError) {
    console.log("Form chứa lỗi, dừng xử lý!");
    return null;
  }

  return {
    name: dataName,
    phone: dataPhone,
    email: dataEmail,
    time: dataTime,
    date: dataDate,
    note: dataNote,
    branchs: dataBranchs,
    service: dataService,
    saleCareSourceId: saleCareSourceId,
    country_code: countryCode,
    language: language,
  };
}


function isAlphabetInput(str) {
  var alphabetRegex =
    /^[a-zA-Z\s()áàảãạâấầẩẫậăắằẳẵặéèẻẽẹêếềểễệíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹỵÁÀẢÃẠÂẤẦẨẪẬĂẮẰẲẴẶÉÈẺẼẸÊẾỀỂỄỆÍÌỈĨỊÓÒỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢÚÙỦŨỤƯỨỪỬỮỰÝỲỶỸỴ()]+$/;
  str = str.toLowerCase();
  return alphabetRegex.test(str);
}
window.addEventListener("load", () => {
  const btnBooking = document.querySelectorAll(".btn__booking--click");
  btnBooking.forEach((value) => {
    value.addEventListener("click", () => {
      document.querySelector(".form__booking_v2").style.display = "block";
      document.querySelector("html").style.overflow = "hidden";
    });
  });
  const elecloseFormSuccessful = document.querySelector(
    ".form__successful .click__closepp"
  );
  elecloseFormSuccessful.addEventListener("click", () => {
    document.querySelector(".form__successful").style.display = "";
  });
});

function sendFormAdvise(classParent) {
  const formData = checkValueForm(classParent);

  if (!formData) {
    return;
  }
  
  const data = new FormData();
  data.append("action", "advise_form");
  data.append("name", formData.name);
  data.append("phone", formData.phone);
  data.append("language", formData.language);

  const service = formData.service ? `Dịch vụ cần tư vấn: ${formData.service} - ` : "";
  let note = formData.note ? `Ghi chú khách hàng: ${formData.note}` : "";
  const date = formData.date ? `- Ngày: ${formData.date}` : "";
  const time = formData.time ? `- Thời gian: ${formData.time}` : "";
  const email = formData.email ? `- Email: ${formData.email}` : "";
  
  const fullNote = [service, note, date, time, email].filter(Boolean).join(" ");
  data.append("note", fullNote.trim());
  
  if (formData.saleCareSourceId != null) {
    data.append("sale_care_source_id", formData.saleCareSourceId);
  }
  if (formData.country_code != null) {
    data.append("country_code", formData.country_code);
  }
  callAPIFormSubmit(data, classParent);
}

function sendFormBooking(classParent) {
  const formData = checkValueForm(classParent);

  if (!formData) {
    return;
  }

  const data = new FormData();
  data.append("action", "booking_form");
  data.append("name", formData.name);
  data.append("phone", formData.phone);
  data.append("date", formData.date);
  data.append("time", formData.time);
  data.append("service", formData.service);
  data.append("store_id", formData.branchs);
  data.append("country_code", formData.country_code);

  const service = formData.service ? " Dịch vụ cần tư vấn: " + formData.service : "";
  const note = formData.note ? " - Ghi chú khách hàng: " + formData.note : "";
  data.append("note", service + note);
  callAPIFormSubmit(data, classParent);
}
function callAPIFormSubmit(data, classParent) {
  const getIconLoading = document.getElementById("iconloading__box");
  getIconLoading.style.display = "block";
  callErrorfulForm('', classParent);

  fetch(flatsomeVars.ajaxurl, {
    method: "POST",
    credentials: "same-origin",
    body: data,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.data.status === 1) {
        successfulForm(classParent);
      } else {
        callErrorfulForm(data.data.messages, classParent);
      }
    })
    .catch((error) => {
      console.log(error.message);
    })
    .finally(() => {
      getIconLoading.style.display = "none";
    });
}
function successfulForm(classParent) {
  removeForm(classParent);

  if (classParent === "form__booking_v2" || classParent === "fbookingv2_main" || classParent === 'booking-page-v1') {

    const clickCloseF = document.querySelector(".form__booking_v2");
    clickCloseF.style.display = "none";
  }
  if (classParent === "fadvise__popup") {
    const clickCloseF = document.querySelector(".fadvise__popup");
    clickCloseF.style.display = "none";
  }

  const eleFormSuccessful = document.querySelector(".form__successful");
  eleFormSuccessful.style.display = "block";
  setTimeout(() => {
    eleFormSuccessful.style.display = "none";
  }, 4000);
}
function callErrorfulForm(message, classParent) {
  document.querySelector(
    "." + classParent + " .content__error"
  ).innerHTML = `<span>${message}</span>`;
}
function removeForm(classParent) {
  const formElement = document.querySelector("." + classParent + " form");
  if (formElement) {
    document.querySelector("." + classParent + " form").reset();
  }
}
function switchTab(
  selector = '[data-role="tab"]',
  wrapperTabContent = ".tab-panel"
) {
  const tabs = document.querySelectorAll(selector);
  const tabContents = document.querySelectorAll(wrapperTabContent);
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const target = document.querySelector(tab.dataset.target);
      tabContents.forEach((wrapperContent) => {
        wrapperContent.classList.remove("is-active"); //xóa class is-active (ẩn) tất cả các tab content
      });
      target.classList.add("is-active"); //hiện tab content được click
      tabs.forEach((t) => {
        t.classList.remove("is-active");
      });
      tab.classList.add("is-active");
    });
  });
}
window.addEventListener("DOMContentLoaded", (event) => {
  switchTab();
});
document.addEventListener("DOMContentLoaded", function (event) {
  const accordionContent = document.querySelectorAll(".accordion-content");
  accordionContent.forEach((item, index) => {
    let header = item.querySelector("header");
    header.addEventListener("click", () => {
      item.classList.toggle("open");
      let description = item.querySelector(".description");
      if (item.classList.contains("open")) {
        description.style.height = `${description.scrollHeight}px`;
        item
          .querySelector("i")
          .classList.replace("icon--tam-right", "icon--tam-bottom");
      } else {
        description.style.height = "0px";
        item
          .querySelector("i")
          .classList.replace("icon--tam-bottom", "icon--tam-right");
      }
      removeOpen(index);
    });
  });
  function removeOpen(index1) {
    accordionContent.forEach((item2, index2) => {
      if (index1 != index2) {
        item2.classList.remove("open");
        let des = item2.querySelector(".description");
        des.style.height = "0px";
        item2
          .querySelector("i")
          .classList.replace("icon--tam-bottom", "icon--tam-right");
      }
    });
  }
});
function switchTabLDP(
  selector = '[data-role="tab"]',
  wrapperTabContent = ".tabContent"
) {
  const tabs = document.querySelectorAll(selector);
  const tabContents = document.querySelectorAll(wrapperTabContent);
  tabs.forEach((tab) => {
    tab.addEventListener("click", (event) => {
      const target = document.querySelector(tab.dataset.target);
      let tabn = event.target.closest(".tabAll");
      let tabContents = tabn.querySelectorAll(".tabContent");
      tabContents.forEach((wrapperContent) => {
        wrapperContent.classList.remove("active");
      });
      target.classList.add("active"); //hiện tab content được click
      let tabLinks = tabn.querySelectorAll(".tabLinks");
      tabLinks.forEach((t) => {
        t.classList.remove("active");
      });
      tab.classList.add("active"); // nav click
    });
  });
}
// Form Booking
const showBookingFormv2 = () => {
  const eleFormv2 = document.querySelector(".form__booking_v2");
  eleFormv2.style.display = "block";
  document.querySelector("html").style.overflow = "hidden";
};
const closeFormv2 = () => {
  const closeFormv2 = document.querySelector(".form__booking_v2");
  closeFormv2.style.display = "none";
  document.querySelector("html").style.overflow = "";
};

function checkBranchOpenBooking() {
  const selectElement = event.target;
  const selectedOption = selectElement.selectedOptions[0];
  const dataAttribute = selectedOption.dataset.openDay;
  if (dataAttribute) {
    const formattedDate = dataAttribute.split("/").reverse().join("-");
    document
      .querySelector(".f-time_v2 input[name='date']")
      .setAttribute("min", formattedDate);
  } else {
    getNowFormattedDate();
  }
}

window.addEventListener("load", () => {
  getNowFormattedDate();
});

function getNowFormattedDate() {
  let today = new Date();
  var date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  document
    .querySelector(".f-time_v2 input[name='date']")
    .setAttribute("min", new Date().toISOString().split("T")[0]);
}

// Form Booking
var iti = '';
document.addEventListener("DOMContentLoaded", function () {
  const loadMoreButton = document.querySelector(".button-loadmore-image");
  const galleryLoadMore = document.querySelector(".gallery-loadmore");
  if (loadMoreButton) {
    loadMoreButton.addEventListener("click", function () {
      galleryLoadMore.style.display = "block";
    });
  }

  const inputTel = document.querySelectorAll('.input-tel');
  inputTel.forEach(input => {
    iti = window.intlTelInput(input, {
      initialCountry: 'vn',
      countryOrder: ['us'],
      separateDialCode: true,
      utilsScript: 'https://cdn.jsdelivr.net/npm/intl-tel-input@25.0.1/build/js/utils.js',
    });
  });
});
