// [eromangacafe.com]
main = {
  main: ()=>{
    const r = {urls:[],title:''};
    let isUseSrcset = true;
    for(var dom of document.querySelectorAll('.kijibox p img'))
      if(dom.srcset) r.urls.push(dom.srcset);
      else{
        isUseSrcset = false;
        r.urls.push(dom.src);
      }
    if(!r.urls.length && isUseSrcset) for(var dom of document.querySelectorAll('.kijibox p > a')) r.urls.push(dom.href);
    else if(!r.urls.length) r.urls = savedojin.assets.srcsetParse(r.urls);
    r.title = 'eromanga-cafe-' + location.href.split(/\.|\//)[4];
    return r;
  }
}