// [hmangatomoe.net]
main = {
  main: ()=>{
    const r = {urls:[],title:''};
    for(var dom of document.querySelectorAll('.entry-content > p > a > img'))
      r.urls.push(dom.src);
    r.title = 'hmangamatome-' + location.href.split(/\/|\./g)[4];
    return r;
  }
}