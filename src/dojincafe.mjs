// [doujincafe.com]
main = {
  main: ()=>{
    const r = {urls:[],title:''};
    let srcsetFlag = true;
    if(!document.querySelector('.kijibox > p > a > img').srcset) srcsetFlag = false;
    for(let dom of document.querySelectorAll('.kijibox > p > a > img'))
      if(dom.className.match(/pict|wp-image-.+/g))
        r.urls.push(dom.srcset ? dom.srcset : dom.src);
    if(srcsetFlag)
      r.urls = savedojin.assets.srcsetParse(r.urls);
    r.title = 'doujincafe-' + location.href.split('/')[3].split('.')[0];
    return r;
  }
}