// [doujinhibiki.net]
main = {
  main: ()=>{
    const r = {urls:[],title:''};
    r.urls.push(document.querySelector('.wp-post-image').src);
    for(let dom of document.querySelectorAll('.content_main > img'))
      r.urls.push(dom.src);
    for(let cnt in r.urls){
      r.urls[cnt] = r.urls[cnt].split('?')[0];
    }
    r.title = (()=>{
      let tarr = new Array(3);
      [,,,tarr[0],tarr[1],tarr[2]] = location.href.split('/');
      return 'doujinhibiki-' + tarr.join('-'); 
    })();
    return r;
  }
}