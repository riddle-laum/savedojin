// [eromangaosa-mu.com]
main = {
  main: ()=>{
    const r = {urls:[],title:''};
    for(var dom of document.querySelectorAll('.main_article > a')) r.urls.push(dom.href);
    r.title = 'eromanga-osamu-' + location.href.split('/')[3].replace(/%/g,'');
    return r;
  }
}