// [eromanga-kong.com]
main = {
  main: ()=>{
    const r = {urls:[],title:''};
    for(var dom of document.querySelectorAll('#article > p > a > img'))
      r.urls.push(dom.src);
    var [,,,temp01,temp02] = location.href.toLowerCase().split('/');
    r.title = 'eromanga-kong-' + temp01.replace(/%/g,'') + '-' + temp02.replace(/%/g,'');
    return r;
  }
}