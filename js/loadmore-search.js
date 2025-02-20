window.addEventListener('load', () => {
    const getBtnReadMore = document.getElementById('loadmore__search');
    let numberPaged = Number(1);
    getBtnReadMore?.addEventListener('click', () => {
        const keyWord = getBtnReadMore.getAttribute("data-key");
        numberPaged++;
        callAjaxpostLoadmore(keyWord, numberPaged);
    });

    function callAjaxpostLoadmore(keyWord, numberPaged) {
        let getLoading = document.querySelector('.loading_search');
        getLoading.style.display = 'block';
        document.querySelector('#loadmore__search').style.display = 'none';

        var formData = new FormData();
        formData.append('action', 'loadMoreSearch');
        formData.append('keyword', keyWord);
        formData.append('paged', numberPaged);
        fetch(siteConfig.ajaxUrl, {
            method: 'POST',
            body: formData
        })
            .then((response) => response.json())
            .then((data) => {
                renderDomLoadMorePost(data.data.data);
            })
            .catch((error) => {
                console.log('Error:', error);
            })
            .finally(() => {
                let getLoading = document.querySelector('.loading_search');
                getLoading.style.display = 'none';
                document.querySelector('#loadmore__search').style.display = '';
            });
    }

    function renderDomLoadMorePost(data) {

        let postItem = '';
        if (data.length < 5) {
            const getBtnReadMore = document.getElementById('s__readmore');
            getBtnReadMore.style.display = 'none';
        }
        data.forEach(value => {
            postItem += `
            <div class="col post-item">
                <div class="col-inner">
                    <a href="${value.link}">
                        <div class="box-image">
                            <div class="image-cover" style="padding-top:75%;">
                                <img src="${value.image}" alt="img_post_search">
                            </div>
                        </div>
                        <div class="box-text text-left">
                            <h2 class="post-title is-large">${value.title}</h2>
                            <span class="btn-post--readmore hover--link">Xem chi tiết</span>
                        </div>
                    </a>
                </div>
            </div> `;
        });
        const getDomAddPost = document.querySelector('#post__block');
        getDomAddPost.innerHTML += postItem;
    }
});