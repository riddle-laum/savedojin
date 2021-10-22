// [erodoujinjohoukan.com]
main = {
  main: ()=>{
    const r = {urls:[],title:''};
    for(var dom of document.querySelectorAll('.ently_text a > img'))
      r.urls.push(dom.src);
    r.title = 'erodoujinnjohoukan-' + location.href.split('/')[3];
    return r;
  } 
}