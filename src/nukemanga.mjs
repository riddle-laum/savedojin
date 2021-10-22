// [nukemanga.com]
main = {
  main: ()=>{
    const r = {urls:[],title:''};
    for(var dom of document.querySelectorAll('.entry-content > p img')) if(dom.srcset) r.urls.push(dom.srcset);
    r.urls = savedojin.assets.srcsetParse(r.urls);
    r.title = 'nukeman-' + location.href.split('/')[3];
    return r;
  }
}