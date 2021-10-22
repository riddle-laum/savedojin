// [eromanga-select.com]
main = {
  main: ()=>{
    const r = {urls:[],title:''};
    for(var dom of document.querySelectorAll('section > a > img')) r.urls.push(dom.src);
    r.title = 'eromanga-selection-' + location.href.split('/')[4].replace(/%/g,'');
    return r;
  }
}