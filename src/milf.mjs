// [eromanga-milf.com]
main = {
  main: ()=>{
    const r = {urls:[],title:''};
    for(var dom of document.querySelectorAll('.entry-content > img')) r.urls.push(dom.src);
    var locate = location.href.split('/');
    if(locate[locate.length - 1] == '') r.title = 'eromanga-milf-' + locate[locate.length - 3].replace('%','') + '-' + locate[locate.length - 2];
    else r.title = 'eromanga-milf-' + locate[locate.length - 2].replace(/%/g,'') + '-' + locate[locate.length - 1];
    return r;
  }
}