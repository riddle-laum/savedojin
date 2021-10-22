// [eroproject.com]
main = {
  main: ()=>{
    const r = {urls:[],title:''};
    for(let dom of document.querySelectorAll('.entry-content > a > img'))
      if(dom.className.indexOf('wp-image-') != -1)
        r.urls.push(dom.srcset);
    r.urls = savedojin.assets.srcsetParse(r.urls);
    r.title = 'eroproject-' + location.href.split('/')[3];
    return r;
  }
}