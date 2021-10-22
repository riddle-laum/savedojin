// [doujin-eromanga.com]
main = {
  main: ()=>{
    const r = {urls:[],title:''};
    for(var dom of document.querySelectorAll('.content-img')) r.urls.push(dom.src);
    r.title = 'anilog-' + location.href.split('=')[1];
    return r;
  }
}