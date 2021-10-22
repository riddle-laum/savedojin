// [eromanga-jkschool.com]
main = {
  main: ()=>{
    const r = {urls:[],title:''};
    for(let dom of document.querySelectorAll('.entry-content > img[class]'))
      if(dom.className.indexOf('wp-image-') != -1)
        r.urls.push(dom.srcset);
    r.urls = savedojin.assets.srcsetParse(r.urls);
    var [,,,temp01,temp02] = location.href.split('/');
    r.title = 'eromanga-jkschool-' + temp01.toLowerCase().replace(/%/g,'') + '-' + temp02;
    return r;
  }
}