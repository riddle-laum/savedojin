// [ero-mangasokuhou.com]
main = {
  main: ()=>{
    const r = {urls:[],title:''};
    for(var dom of document.querySelectorAll('.kijibox img'))
      if(dom.srcset) r.urls.push(dom.srcset);
      else if(dom.dataset.lazySrcset) r.urls.push(dom.dataset.lazySrcset);
    r.urls = savedojin.assets.srcsetParse(r.urls);
    r.title = 'eromanga-sokuho-' + location.href.split(/\/|\./)[4];
    return r;
  }
}