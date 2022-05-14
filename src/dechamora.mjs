// [dechamora.com]
main = {
  main: ()=>{
    const r = {urls:[],title:''};
    for(const dom of document.querySelectorAll('img.alignnone'))
      r.urls.push(dom.parentNode.href);
    if(!r.urls.length)
      r.urls = Array.from(document.querySelectorAll('img.size-full')).map(v=>v.parentElement.href);
    r.title = 'dechamora' + location.pathname.replace(/\//g, '-');
    return r;
  }
}