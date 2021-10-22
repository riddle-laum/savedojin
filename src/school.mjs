// [eromanga-school.com]
main = {
  main: ()=>{
    const r = {urls:[],title:''};
    for(var dom of document.querySelectorAll('.entry-content > p a img')) r.urls.push(dom.src);
    for(var dom of document.querySelectorAll('.entry-content > a img')) r.urls.push(dom.src);
    r.title = 'eromanga-school-' + (()=>{
      var locate, res;
      if((res = (locate = location.href.split('/'))[locate.length - 1]) == '')
        res = locate[locate.length - 2];
      return res;
    })();
    return r;
  }
}