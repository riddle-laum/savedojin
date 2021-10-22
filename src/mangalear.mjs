// [www.mangalear.blog]
main = {
  main: ()=>{
    const r = {urls:[],title:''};
    for(var dom of document.querySelectorAll('#the-content a > img')) r.urls.push(dom.srcset ? dom.srcset : dom.dataset.lazySrcset);
    r.urls = savedojin.assets.srcsetParse(r.urls);
    r.title = 'mangalear-' + location.href.split('/')[4].split('doujinshi-')[1];
    return r;
  }
}