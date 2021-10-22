// [eromanga-celeb.com]
main = {
  main: ()=>{
    const r = {urls:[],title:''};
    for(var dom of document.querySelectorAll('.article_inner > p > a > img'))
      r.urls.push(dom.src);
    var [,,,temp01,temp02] = location.href.split('/');
    r.title = 'eromanga-celeb-' + temp01.replace(/%/g,'') + '-' + temp02.replace(/%/g,'');
    return r;
  }
}