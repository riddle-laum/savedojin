// [ero-manga-kingdom.com]
main = {
  main: ()=>{
    const r = {urls:[],title:''};
    for(var dom of document.querySelectorAll('.description > a > img')) r.urls.push(dom.srcset);
    if(r.urls.length == 0)
      for(var dom of document.querySelectorAll('.description > img')) r.urls.push(dom.srcset);
    r.urls = savedojin.assets.srcsetParse(r.urls);
    var locate = location.href.split(/\/|\./g);
    r.title = locate[locate.length - 1];
    if(r.title == 'html' || r.title == '') r.title = locate[locate.length - 2];
    r.title = 'ero-manga-kingdom-' + r.title;
    return r;
  }
}