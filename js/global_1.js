
/**
 * Params form viewForm = booking  (slug post type)->Form Đặt Lịch
 * Params form viewForm = advisory (slug post type)->Form Tư Vấn
 */

// function saveDataForms (data , viewForm ) {
//     const url = window.location.href;
//     let dataFrom = [];
//     for (const key in data) {
//         if (Object.hasOwnProperty.call(data, key)) {
//             const element = data[key];
//             dataFrom.push(data[key].value)
//         }
//     }

//     debugger
    
//     let FormDatas = new FormData();
//     FormDatas.append('action', 'dng_save_form');
//     FormDatas.append('url', url);
//     FormDatas.append('dataForm', JSON.stringify(data));
//     FormDatas.append('viewForm', viewForm);

//     fetch( siteConfig.ajaxUrl, {
//         method: "POST",
//         credentials: 'same-origin',
//         body: FormDatas,
//     })
//     .then((response) => response.json())
//     .then((data) => {
//         console.log('done', data);
//     })
//     .catch((error) => {
//         console.log(error.message);
//     }).finally(() => {

//     });
// }