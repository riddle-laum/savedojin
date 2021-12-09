// [dechamora.com]
main = {
  main: ()=>{
    const r = {urls:[],title:''};
    for(const dom of document.querySelectorAll('img.alignnone'))
      r.urls.push(dom.parentNode.href);
    r.title = 'dechamora' + location.pathname.replace(/\//g, '-');
    return r;
  }
}