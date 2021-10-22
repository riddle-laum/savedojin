// [ero-mangalife.com]
main = {
  main: ()=>{
    const r = {urls:[],title:''};
    for(var dom of document.querySelectorAll('.entry-content .alignnone'))
      if(dom.srcset) r.urls.push(dom.srcset);
    r.urls = savedojin.assets.srcsetParse(r.urls);
    r.title = 'eromanga-life-' + location.href.split(/\/|\./)[4];
    return r;
  }
}