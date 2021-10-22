// [daretoku-eromanga.info]
main = {
  main: ()=>{
    const r = {urls:[],title:''};
    var locate;
    for(var dom of document.querySelectorAll('.article a')) r.urls.push(dom.href);
    r.title = 'daretoku-eromanga-' + (locate = location.href.split('/'))[locate.length - 1];
    return r;
  }
}