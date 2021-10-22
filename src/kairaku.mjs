// [kairakudoujin.net]
main = {
  main: ()=>{
    const r = {urls:[],title:''};
    for(let dom of document.querySelectorAll('.entry > img')) r.urls.push(dom.src);
    var locate = location.href.split(/\/|\.|-/g);
    if(locate[locate.length - 1] == '' || locate[locate.length - 1] == 'html')
      r.title = 'kairakudoujin-' + locate[locate.length - 2];
    else r.title = 'kairakudoujin-' + locate[locate.length - 1];
    return r;
  }
}