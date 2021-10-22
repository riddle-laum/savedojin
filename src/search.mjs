// [eromanga-search.com]
main = {
  main: ()=>{
    const r = {urls:[],title:''};
    for(var dom of document.querySelectorAll('.article > p img')) r.urls.push(dom.src);
    r.title = 'eromaga-search-' + location.href.split(/\/|\./)[5];
    return r;
  }
}