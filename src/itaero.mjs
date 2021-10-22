// [itaeromanga.com]
main = {
  main: ()=>{
    const r = {urls:[],title:''};
    for(var dom of document.querySelectorAll('.entry-content img'))
      if(dom.srcset) r.urls.push(dom.srcset);
    r.urls = savedojin.assets.srcsetParse(r.urls);
    r.title = 'itaeromanga-' + location.href.split('/').pop();
    return r;
  }
}