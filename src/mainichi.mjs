// [eromanga-mainichi.com]
main = {
  main: ()=>{
    const r = {urls:[],title:''};
    for(var dom of document.querySelectorAll('.content-img')) r.urls.push(dom.src);
    if(r.urls.length == 0)
      for(var dom of document.querySelectorAll('.article > p > a')) r.urls.push(dom.href);
    r.title = 'eromanga-mainichi-' + (()=>{
      var locate, res;
      if((res = (locate = location.href.split('/'))[locate.length - 1].replace(/%/g,'')) == '') res = locate[locate.length - 2].replace(/%/g,'');
      return res;
    })();
    return r;
  }
}