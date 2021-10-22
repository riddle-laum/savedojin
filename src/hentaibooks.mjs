// [hentai-books.com]
main = {
  main: ()=>{
    const r = {urls:[],title:''};
    for(var dom of document.querySelectorAll('.entry-content > a > img')) r.urls.push(dom.src);
    r.title = 'hentai-books-' + (()=>{
      var locate;
      if((locate = location.href.split('/'))[locate.length - 1] == '') return locate[locate.length - 3] + '-' + locate[locate.length - 2];
      return locate[locate.length - 2] + '-' + locate[locate.length - 1];
    })();
    return r;
  }
}