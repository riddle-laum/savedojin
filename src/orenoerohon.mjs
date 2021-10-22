// [oreno-erohon.com]
main = {
  main: ()=>{
    const r = {urls:[],title:''};
    for(var dom of document.querySelectorAll('.entry-content img')) r.urls.push(dom.src);
    r.title = 'oreno-erohon-' + location.href.split('/')[4];
    return r;
  }
}