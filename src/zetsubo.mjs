// [xn--gmq92kd2rm1kx34a.com]
main = {
  main: ()=>{ // zetsubo mangakan
    const r = {urls:[],title:''};
    for(var dom of document.querySelectorAll('.single-post img')) r.urls.push(dom.src);
    r.title = 'zetsubo-eromanga-' + location.href.split('/')[5].replace(/%/g,'');
    return r;
  }
}