// [nijioma.blog]
main = {
  main: ()=>{
    const r = {urls:[],title:''};
    for(var dom of document.querySelectorAll('.entry-content > p > a > img'))
      if(dom.className.indexOf('wp-image-') != -1)
        r.urls.push(dom.srcset);
    r.urls = savedojin.assets.srcsetParse(r.urls);
    r.title = 'nijioma-' + location.href.split('/')[3];
    return r;
  }
}