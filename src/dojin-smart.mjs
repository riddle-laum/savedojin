// [daretoku-eromanga.info]
main = {
  main: async ()=>{
    var parent = document;
    var locate = location.href;
    if(location.href.indexOf('show-m') != -1 || location.href.indexOf('all=true') == -1){
      // in info page (not img list page or pdf page)
      let queryParameter = savedojin.assets.queryParamParser(location.href);
      if(!queryParameter.cn && (!queryParameter.g || !queryParameter.dir)) throw new Error('invalid query parameter');
      locate = `http://${location.hostname}/dl-m-m.php?cn=` + queryParameter.g + '/' + queryParameter.dir + '&all=true&from=img';
      if(queryParameter.cn) locate = `http://${location.hostname}/dl-m-m.php?cn=` + queryParameter.cn + '&all=trube&from=img';
      // parent = await savedojin.func._getdomfromurl(locate);
      parent = new DOMParser().parseFromString(await fetch(locate).then(res=>{return res.text()}), 'text/html');
    }
    const r = {urls:[],title:''};
    for(var dom of parent.querySelector('#comic-area').querySelectorAll('img')) r.urls.push(dom.src);
    r.title = 'dojin-smart-' + locate.split(/\?|&/)[1].split('=')[1].replace('/','-');
    return r;
  }
}