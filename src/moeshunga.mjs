// [moeshunga.com]
main = {
  main: ()=>{
    const r = {urls:[],title:''};
    for(const dom of document.querySelectorAll('.mb20 > img'))
      r.urls.push(dom.src ? dom.src : '');
    r.title = 'moeshunga-' + location.pathname.replace(/\//g, '').split(/\./)[0];
    return r;
  }
}