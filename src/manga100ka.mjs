// [manga100ka.jp]
main = {
  main: ()=>{
    const r = {urls:[],title:''};
    for(var dom of document.querySelectorAll('.item_file > a'))
      r.urls.push(dom.href);
    r.title = 'manga100ka-' + location.href.split('=')[1];
    return r;
  }
}