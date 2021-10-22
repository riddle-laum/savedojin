// [eromanga-yasan.com]
main = {
  main: ()=>{
    const r = {urls:[],title:''};
    for(var dom of document.querySelectorAll('.entry-content img'))
      if(dom.srcset) r.urls.push(dom.srcset);
      else r.urls.push(dom.src);
    if(document.querySelector('.entry-content img').srcset) r.urls = savedojin.assets.srcsetParse(r.urls);
    r.title = 'eromanga-yasan-' + location.href.split('/')[3];
    return r;
  }
}