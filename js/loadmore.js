window.addEventListener('load', ()=>{
    const getBtnReadMore = document.getElementById('b__readMore');
    let numberPaged  = Number(1);
    getBtnReadMore?.addEventListener('click',()=>{
        const slug = getBtnReadMore.getAttribute("data-slug");
        numberPaged++;
        const postpage = getBtnReadMore.getAttribute("data-postpage");
        const posttype = getBtnReadMore.getAttribute("data-posttype");
        callAjaxpost (slug, numberPaged, postpage ,posttype);
    });

    function callAjaxpost(slug, numberPaged, postpage, posttype) { 
        var data = new FormData();
        data.append( 'action', 'loadMore' );
        data.append( 'slug', slug );
        data.append( 'paged', numberPaged );
        data.append( 'postpage', postpage );
        data.append( 'posttype', posttype );
        const getIconLoading = document.getElementById('iconloading__box');
        getIconLoading.style.display  = 'block';

        fetch(flatsomeVars.ajaxurl, {
            method: "POST",
            credentials: 'same-origin',
            body: data
        })
        .then((response) => response.json()            
        )
        .then((data) => {
            renderDomLoadMore(data.data.data);
        })
        .catch((error) => {
            console.log('Error:', error);
        })
        .finally(() => {
            getIconLoading.style.display  = 'none';
        });
    }
    function renderDomLoadMore(data) {
        let postItem = '';
        if (data.length === 0) {
            const getBtnReadMore = document.getElementById('b__readMore');
            getBtnReadMore.style.display = 'none';
        }
        data.forEach(value => {
            // Cắt chuỗi chỉ lấy 15 từ
            const trimmedDesc = value.desc.split(' ').slice(0, 12).join(' ');
    
            postItem += `
                <div class="col post-item">
                    <div class="col-inner">
                        <a href="${value.link}" class="plain">
                            <div class="box box-normal box-text-bottom box-blog-post has-hover">
                                <div class="box-image">
                                    <div class="image-cover" style="padding-top:75%;">
                                        <img width="285" height="213" src="${value.image}" class="attachment-medium size-medium wp-post-image" alt="" decoding="async" loading="lazy">
                                    </div>
                                </div>
                                <div class="box-text text-left">
                                    <div class="box-text-inner blog-post-inner">
                                        <h2 class="post-title is-large ">${value.title}</h2>
                                        <p class="from_the_blog_excerpt ">
                                            ${trimmedDesc}...
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            `;
        });
        const getDomAddPost = document.querySelector('#post__block');
        getDomAddPost.innerHTML += postItem;
    }
    
});