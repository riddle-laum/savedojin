// [doujin-night.com]
main = {
  main: ()=>{
    const r = {urls:[],title:''};
    for(var dom of document.querySelectorAll('.content-img'))
      r.urls.push(dom.src);
    if(!r.urls.length)
      for(var dom of document.querySelectorAll('#article > p > a > img'))
        r.urls.push(dom.src);
    var [,,,temp01,temp02] = location.href.toLowerCase().split('/');
    r.title = 'doujin-night-' + temp01.replace(/%/g,'') + '-' + temp02.replace(/%/g,'');
    return r;
  }
}