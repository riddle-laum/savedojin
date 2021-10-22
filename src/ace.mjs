// [eromanga-ace.com]
main = class{
  static async main(){
    return await this.getImgList(document);
  };
  static async getImgList(parent){
    const r = {urls:[],title:''};
    for(let dom of parent.querySelectorAll('.content-img')) r.urls.push(dom.src);
    r.title = 'eromanga-ace-';
    r.title += (()=>{
      var locate, res;
      if((res = (locate = location.href.split('/'))[locate.length - 1].replace(/%/g,'')) == '')
        res = locate[locate.length - 2].replace(/%/g,'');
      return res;
    })();
    if(parent.querySelector('.nextpage') && parent.querySelector('.nextpage .next')){
      // next page exist
      let dom = new DOMParser().parseFromString(await fetch(parent.querySelector('.nextpage .next').parentNode.href).then(res=>{return res.text()}), 'text/html');
      r.urls = [...r.urls, ...(await this.getImgList(dom)).urls];
    }
    return r;
  }
}