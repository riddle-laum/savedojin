// [hime-book.net]
main = {
  main: ()=>{
    const r = {urls:[],title:''};
    for(var dom of document.querySelectorAll('.article-body-inner > a > img')) r.urls.push(dom.src);
    r.title = 'hime-book-' + location.href.split('/')[3];
    return r;
  }
}