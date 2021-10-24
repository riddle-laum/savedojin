// [xn--gmq92kd2rm1kx34a.com]
main = { // /rar/line-?/[category]/[id] or /rar/line-a/[id]
  main: ()=>{ // zetsubo mangakan
    const r = {urls:[],title:''};
    for(var dom of document.querySelectorAll('.single-post img')) r.urls.push(dom.src);
    let idarr = [null,null];
    [,,, idarr[0], idarr[1]] = location.pathname.split('/');
    r.title = 'zetsubo-eromanga-' + idarr[0].replace(/%/g,'') + (idarr[1] ? '-' + idarr[1].replace(/%/g,'') : '');
    return r;
  }
}