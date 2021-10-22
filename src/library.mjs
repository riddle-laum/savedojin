// [moeero-library.com]
main = {
  main: ()=>{
    const r = {urls:[],title:''};
    var locate;
    for(var dom of document.querySelectorAll('.kijibox a'))
      if(dom.className == '' && /\.png|\.jpg|\.jpeg/.test(dom.href))
        r.urls.push(dom.href);
    if(r.urls.length == 0){
      for(var dom of document.querySelectorAll('.kijibox > p > img')) r.urls.push(dom.srcset);
      r.urls = savedojin.assets.srcsetParse(r.urls);
    }
    r.title = 'moeero-library-' + (locate = location.href.split('/'))[locate.length - 1].split('.')[0];
    return r;
  }
}