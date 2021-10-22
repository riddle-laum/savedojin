// [eromanga-collector.com]
main = class{
  static async main(){
    const r = {urls:[],title:['eromanga-collector']};
    for(let url of this.getSeries()){
      let dom = document;
      if(url != location.href) dom = new DOMParser().parseFromString(await fetch(url).then(res=>{return res.text()}), 'text/html');
      const result = this.getImageUrlList(dom);
      r.urls.push(...result.urls);
      r.title.push(result.title);
    }
    if(r.urls.length)
      r.urls = savedojin.assets.srcsetParse(r.urls);
    r.title = r.title.join('-');
    return r;
  };
  static getImageUrlList(parent){
    const r = {urls:[],title:''};
    var domlist = parent.querySelectorAll('.entry-content > img');
    if(!domlist.length)
      domlist = parent.querySelectorAll('.entry-content > p > img');
    for(var dom of domlist) if(dom.srcset) r.urls.push(dom.srcset);
    r.title = parent.getElementsByTagName('article')[0].id.split('-')[1];
    return r;
  };
  static getSeries(){
    if(!document.querySelector('.easy-series-toc')) return [location.href];
    const list = [];
    for(let dom of document.querySelector('.easy-series-toc').querySelectorAll('tbody td'))
      if(dom.querySelector('a') && !dom.querySelector('a').href.match(/%E9%95%B7%E7%B7%A8|%E3%82%B7%E3%83%AA%E3%83%BC%E3%82%BA/i)) list.push(dom.querySelector('a').href);
      else if(dom.querySelector('span') && dom.querySelector('span').innerHTML.match(/(n|N)ow/)) list.push(location.href);
    return list;
  };
}