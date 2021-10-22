// [eromanganomori.com]
main = {
  main: ()=>{
    const r = {urls:[],title:''};
    let temp;
    for(var dom of document.querySelectorAll('.article-body > span > a')) r.urls.push(dom.href);
    r.title = 'eromanganomori-' + location.href.split('/').pop();
    return r;
  }
}