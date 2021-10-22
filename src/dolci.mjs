// [doujin-dolci.com]
main = {
  main: ()=>{
    const r = {urls:[],title:''};
    for(var dom of document.querySelectorAll('.content a')) r.urls.push(dom.href);
    r.title = 'dojin-dolci-' + location.href.split('/')[4].replace(/%/g,'');
    return r;
  }
}