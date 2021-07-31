// ----- main.js ----- //

// namespace
const savedojin = {};

// constant
savedojin.version = 'v0.1.0';

// ----- main ----- //
savedojin.main = async ()=>{
  // show info
  console.log('[savedojin]', 'savedojin :', savedojin.version);

  // get website domain
  const domain = location.hostname;
  console.log('[savedojin]', 'website :', domain);
  
  // call module
  if(savedojin.modules[domain]) await savedojin.deploy(await savedojin.modules[domain].main());
  else console.warn('[savedojin]', `"${domain}" is ot supported`), alert(`[savedojin] "${domain}" is not supported`);
};

// ----- deploy ----- //
savedojin.deploy = async ({urls, title})=>{
  console.log(urls);
  if(!(urls instanceof Array) || !urls.length) throw new Error('invalid value in "urls"');
  let dom = document.createElement('html');
  dom.appendChild(document.createElement('head'));
  dom.appendChild(document.createElement('body'));
  dom.querySelector('head').appendChild(document.createElement('meta'));
  dom.querySelector('meta').setAttribute('charset', 'utf-8');
  dom.querySelector('body').appendChild(document.createElement('div'));
  dom.querySelector('div').setAttribute('id', 'main-contents');
  for(const url of urls){
    const img = document.createElement('img');
    img.setAttribute('src', url);
    img.setAttribute('style', 'width:100%;');
    dom.querySelector('div').appendChild(img);
  }
  document.querySelector('html').remove();
  document.appendChild(dom);
  if(typeof(title) == 'string') document.title = title;
};

// ----- assets ----- //
savedojin.assets = {
  srcsetParse: (srcsets)=>{
    if(!(srcsets instanceof Array)) return void 0;
    const urls = [];
    for(const i in srcsets){
      const sizes = {};
      for(const val of srcsets[i].split(/,(\n|\s+|)/g)){
        if(!val.match(/^.+ [0-9]+w/)) continue;
        const [_url, _size] = val.match(/[^\s].+ [0-9]+w/g)[0].split(' ');
        sizes[+_size.split('w')[0]] = _url;
      }
      urls.push(sizes[Object.keys(sizes).reduce((a,b)=>a>b?a:b)]); // getmax
    }
    return urls;
  },
  sleep: async (delay)=>{
    if(+delay !== +delay || delay < 1) return;
    await new Promise(resolve=>setTimeout(()=>resolve(), delay));
  }
};

// ----- modules ----- //
savedojin.modules = {
  'buhidoh.net': {
    main: ()=>{
      const r =  {urls:[],title:''};
      for(var dom of document.querySelectorAll('.ently_text > a')) r.urls.push(dom.href);
      r.title = 'buhidoh-' + location.href.split(/\/|\./g)[4];
      return r;
    }
  },
  'daretoku-eromanga.info': {
    main: ()=>{
      const r = {urls:[],title:''};
      var locate;
      for(var dom of document.querySelectorAll('.article a')) r.urls.push(dom.href);
      r.title = 'daretoku-eromanga-' + (locate = location.href.split('/'))[locate.length - 1];
      return r;
    }
  },
  'ddd-smart.net': {
    main: async ()=>{
      var parent = document;
      var locate = location.href;
      if(location.href.indexOf('show-m') != -1 || location.href.indexOf('all=true') == -1){
        // in info page (not img list page or pdf page)
        let queryParameter = {};
        for(let param of location.href.split('?')[1].split('&')){
          if(typeof(param) !== 'string' || param.split('=').length < 2) throw new Error('query parameter parse error');
          let [key, value] = param.split('=');
          queryParameter[key] = value;
        }
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
  },
  // 'dojinwatch': {
  //   main: ()=>{
  //     const r = {urls:[],title:''};
  //     for(var dom of document.querySelectorAll('.article-body > p > a'))
  //       r.urls.push(dom.href);
  //     r.title = 'dojinwatch-' + location.href.substr(0, location.href.length - 1).split('/').pop();
  //     return r;
  //   }
  // },
  'doujin-dolci.com': {
    main: ()=>{
      const r = {urls:[],title:''};
      for(var dom of document.querySelectorAll('.content a')) r.urls.push(dom.href);
      r.title = 'dojin-dolci-' + location.href.split('/')[4].replace(/%/g,'');
      return r;
    }
  },
  'doujin-eromanga.com': {
    main: ()=>{
      const r = {urls:[],title:''};
      for(var dom of document.querySelectorAll('.content-img')) r.urls.push(dom.src);
      r.title = 'anilog-' + location.href.split('=')[1];
      return r;
    }
  },
  'doujin-night.com': {
    main: ()=>{
      const r = {urls:[],title:''};
      for(var dom of document.querySelectorAll('.content-img'))
        r.urls.push(dom.src);
      if(!r.urls.length)
        for(var dom of document.querySelectorAll('#article > p > a > img'))
          r.urls.push(dom.src);
      var [,,,temp01,temp02] = location.href.toLowerCase().split('/');
      r.title = 'doujin-night-' + temp01.replace(/%/g,'') + '-' + temp02.replace(/%/g,'');
      return r;
    }
  },
  'doujincafe.com': {
    main: ()=>{
      const r = {urls:[],title:''};
      for(let dom of document.querySelectorAll('.kijibox > p > a > img'))
        if(dom.className.indexOf('wp-image-') != -1)
          r.urls.push(dom.srcset);
      r.urls = srcsetParse(r.urls);
      r.title = 'doujincafe-' + location.href.split('/')[3].split('.')[0];
      return r;
    }
  },
  'doujinhibiki.net': {
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
  },
  'dousyoko.net': {
    main: ()=>{
      const r = {urls:[],title:''};
      for(var dom of document.querySelectorAll('.ently_text a[target=_blank]')) r.urls.push(dom.href);
      r.title = 'dousyoko-' + location.href.split('-')[2].split('.')[0];
      return r;
    }
  },
  'ero-comic-hunter.net': {
    main: ()=>{
      const r = {urls:[],title:''};
      for(var dom of document.querySelectorAll('.kijibox img'))
        if(/wp-image-.+/.test(dom.className) && dom.src) r.urls.push(dom.src);
      r.title = 'ero-comic-hunter-' + location.href.split('/')[3].split('.')[0];
      return r;
    }
  },
  'ero-manga-kingdom.com': {
    main: ()=>{
      const r = {urls:[],title:''};
      for(var dom of document.querySelectorAll('.description > a > img')) r.urls.push(dom.srcset);
      if(r.urls.length == 0)
        for(var dom of document.querySelectorAll('.description > img')) r.urls.push(dom.srcset);
      r.urls = srcsetParse(r.urls);
      var locate = location.href.split(/\/|\./g);
      r.title = locate[locate.length - 1];
      if(r.title == 'html' || r.title == '') r.title = locate[locate.length - 2];
      r.title = 'ero-manga-kingdom-' + r.title;
      return r;
    }
  },
  'ero-mangalife.com': {
    main: ()=>{
      const r = {urls:[],title:''};
      for(var dom of document.querySelectorAll('.entry-content .alignnone'))
        if(dom.srcset) r.urls.push(dom.srcset);
      r.urls = srcsetParse(r.urls);
      r.title = 'eromanga-life-' + location.href.split(/\/|\./)[4];
      return r;
    }
  },
  'ero-mangasokuhou.com': {
    main: ()=>{
      const r = {urls:[],title:''};
      for(var dom of document.querySelectorAll('.kijibox img'))
        if(dom.srcset) r.urls.push(dom.srcset);
        else if(dom.dataset.lazySrcset) r.urls.push(dom.dataset.lazySrcset);
      r.urls = srcsetParse(r.urls);
      r.title = 'eromanga-sokuho-' + location.href.split(/\/|\./)[4];
      return r;
    }
  },
  'erocool.com': {
    main: ()=>{
      const r = {urls:[],title:''};
      for(var dom of document.querySelectorAll('.vimg')) r.urls.push(dom.dataset.src);
      var locate;
      r.title = 'ercool-' + (locate = location.href.split(/\/|\./g))[locate.length - 1] == '' || locate[locate.length - 1] == 'html' ? locate[locate.length - 2] : locate[locate.length - 1];
      return r;
    }
  },
  'erodoujinjohoukan': {
    main: ()=>{
      const r = {urls:[],title:''};
      for(var dom of document.querySelectorAll('.ently_text > p > a > img'))
        r.urls.push(dom.src);
      r.title = 'erodoujinnjohoukan-' + location.href.split('/')[3];
      return r;
    }
  },
  'erodoujinshi-world.com': {
    main: ()=>{
      const r = {urls:[],title:''};
      for(var dom of document.querySelectorAll('.kijibox img')) r.urls.push(dom.srcset);
      r.urls = srcsetParse(r.urls);
      r.title = 'erodoujinshi-world-' + location.href.split(/\.|\//)[4];
      return r;
    }
  },
  'eromanga-ace.com': class{
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
  },
  'eromanga-celeb.com': {
    main: ()=>{
      const r = {urls:[],title:''};
      for(var dom of document.querySelectorAll('.article_inner > p > a > img'))
        r.urls.push(dom.src);
      var [,,,temp01,temp02] = location.href.split('/');
      r.title = 'eromanga-celeb-' + temp01.replace(/%/g,'') + '-' + temp02.replace(/%/g,'');
      return r;
    }
  },
  'eromanga-collector.com': class{
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
  },
  'eromanga-daisuki.com': {
    main: ()=>{
      const r = {urls:[],title:''};
      for(var dom of document.querySelectorAll('.entry-content img'))
        if(dom.srcset) r.urls.push(dom.srcset);
      r.urls = savedojin.assets.srcsetParse(r.urls);
      r.title = 'eromanga-daisuki-' + location.href.split('/')[4];
      return r;
    }
  },
  'eromanga-jkschool.com': {
    main: ()=>{
      const r = {urls:[],title:''};
      for(let dom of document.querySelectorAll('.entry-content > img[class]'))
        if(dom.className.indexOf('wp-image-') != -1)
          r.urls.push(dom.srcset);
      r.urls = savedojin.assets.srcsetParse(r.urls);
      var [,,,temp01,temp02] = location.href.split('/');
      r.title = 'eromanga-jkschool-' + temp01.toLowerCase().replace(/%/g,'') + '-' + temp02;
      return r;
    }
  },
  'eromanga-kong.com': {
    main: ()=>{
      const r = {urls:[],title:''};
      for(var dom of document.querySelectorAll('#article > p > a > img'))
        r.urls.push(dom.src);
      var [,,,temp01,temp02] = location.href.toLowerCase().split('/');
      r.title = 'eromanga-kong-' + temp01.replace(/%/g,'') + '-' + temp02.replace(/%/g,'');
      return r;
    }
  },
  'eromanga-mainichi.com': {
    main: ()=>{
      const r = {urls:[],title:''};
      for(var dom of document.querySelectorAll('.content-img')) r.urls.push(dom.src);
      if(r.urls.length == 0)
        for(var dom of document.querySelectorAll('.article > p > a')) r.urls.push(dom.href);
      r.title = 'eromanga-mainichi-' + (()=>{
        var locate, res;
        if((res = (locate = location.href.split('/'))[locate.length - 1].replace(/%/g,'')) == '') res = locate[locate.length - 2].replace(/%/g,'');
        return res;
      })();
      return r;
    }
  },
  'eromanga-milf.com': {
    main: ()=>{
      const r = {urls:[],title:''};
      for(var dom of document.querySelectorAll('.entry-content > img')) r.urls.push(dom.src);
      var locate = location.href.split('/');
      if(locate[locate.length - 1] == '') r.title = 'eromanga-milf-' + locate[locate.length - 3].replace('%','') + '-' + locate[locate.length - 2];
      else r.title = 'eromanga-milf-' + locate[locate.length - 2].replace(/%/g,'') + '-' + locate[locate.length - 1];
      return r;
    }
  },
  'eromanga-school.com': {
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
  },
  'eromanga-search.com': {
    main: ()=>{
      const r = {urls:[],title:''};
      for(var dom of document.querySelectorAll('.article > p img')) r.urls.push(dom.src);
      r.title = 'eromaga-search-' + location.href.split(/\/|\./)[5];
      return r;
    }
  },
  'eromanga-select.com': {
    main: ()=>{
      const r = {urls:[],title:''};
      for(var dom of document.querySelectorAll('section > a > img')) r.urls.push(dom.src);
      r.title = 'eromanga-selection-' + location.href.split('/')[4].replace(/%/g,'');
      return r;
    }
  },
  'eromanga-time.com': class{
    static async main(){
      const r = this.getImgUrl(document);
      r.title = 'eromanga-time-' + r.title;
      for(var url of this.getSeriesUrl()){
        var {urls} = this.getImgUrl(srcsetParse, new DOMParser().parseFromString(await fetch(url).then(res=>res.text()), 'text/html'));
        r.urls.push(...urls);
        r.title += '-' + url.split('/')[4];;
      }
      return r;
    };
    static getImgUrl(parent){
      const r = {urls:[],title:''};
      for(var dom of parent.querySelectorAll('.entry-content img'))
        if(dom.srcset) r.urls.push(dom.srcset);
      r.urls = savedojin.assets.srcsetParse(r.urls);
      r.title = location.href.split('/')[4];
      return r;
    };
    static getSeriesUrl(){
      let urllist = [];
      for(let dom of document.querySelectorAll('.easy-series-toc a'))
        if(dom.href.match(/\/content\//) && !urllist.includes(dom.href))
          urllist.push(dom.href);
      return urllist;
    };
  },
  'eromanga-yasan.com': {
    main: ()=>{
      const r = {urls:[],title:''};
      for(var dom of document.querySelectorAll('.entry-content img'))
        if(dom.srcset) r.urls.push(dom.srcset);
        else r.urls.push(dom.src);
      if(document.querySelector('.entry-content img').srcset) r.urls = savedojin.assets.srcsetParse(r.urls);
      r.title = 'eromanga-yasan-' + location.href.split('/')[3];
      return r;
    }
  },
  'eromanga-yoru.com': class{
    static async main(){
      const r = {urls:[],title:[]};
      const series = this.getSeries();
      r.title.push('eromanga-yoru');
      for(let url of series){
        r.title.push(url.split('/')[4]);
        let parent;
        if(url == location.href) parent = document;
        else parent = new DOMParser().parseFromString(await fetch(url).then(res=>res.text()), 'text/html');
        r.urls.push(...this.getImgList(parent));
      }
      r.title = r.title.join('-');
      return r;
    };
    static getSeries(){
      const series = [];
      if(!document.querySelector('.box_rensaku') && !document.querySelector('.easy-series-toc')) return [location.href];
      if(document.querySelector('.box_rensaku'))
        for(var dom of document.querySelector('.box_rensaku').querySelectorAll('a')) series.push(dom.href);
      else{
        series.push(location.href);
        for(var dom of document.querySelector('.easy-series-toc').querySelectorAll('a')) series.push(dom.href);
      }
      return series;
    };
    static getImgList(parent){
      const urls = [];
      for(var dom of parent.querySelectorAll('.entry-content img')) urls.push(dom.src);
      return urls;
    };
  },
  'eromangacafe.com': {
    main: ()=>{
      const r = {urls:[],title:''};
      for(var dom of document.querySelectorAll('.kijibox p img'))
        if(dom.srcset) r.urls.push(dom.srcset);
      if(!r.urls.length) for(var dom of document.querySelectorAll('.kijibox p > a')) r.urls.push(dom.href);
      else r.urls = savedojin.assets.srcsetParse(r.urls);
      r.title = 'eromanga-cafe-' + location.href.split(/\.|\//)[4];
      return r;
    }
  },
  'eromangafucks.com': {
    main: ()=>{
      const r = {urls:[],title:''};
      for(var dom of document.querySelectorAll('.entry-content > p > img'))
        if(dom.srcset) r.urls.push(dom.srcset);
      r.urls = savedojin.assets.srcsetParse(r.urls);
      r.title = 'eromangafucks-' + location.href.split('/').pop();
      return r;
    }
  },
  'eromanganomori.com': {
    main: ()=>{
      const r = {urls:[],title:''};
      let temp;
      for(var dom of document.querySelectorAll('.article-body > span > a')) r.urls.push(dom.href);
      r.title = 'eromanganomori-' + location.href.split('/').pop();
      return r;
    }
  },
  'eromangaosa-mu.com': {
    main: ()=>{
      const r = {urls:[],title:''};
      for(var dom of document.querySelectorAll('.main_article > a')) r.urls.push(dom.href);
      r.title = 'eromanga-osamu-' + location.href.split('/')[3].replace(/%/g,'');
      return r;
    }
  },
  'eroproject.com': {
    main: ()=>{
      const r = {urls:[],title:''};
      for(let dom of document.querySelectorAll('.entry-content > a > img'))
        if(dom.className.indexOf('wp-image-') != -1)
          r.urls.push(dom.srcset);
      r.urls = savedojin.assets.srcsetParse(r.urls);
      r.title = 'eroproject-' + location.href.split('/')[3];
      return r;
    }
  },
  'hentai-books.com': {
    main: ()=>{
      const r = {urls:[],title:''};
      for(var dom of document.querySelectorAll('.entry-content > a > img')) r.urls.push(dom.src);
      r.title = 'hentai-books-' + (()=>{
        var locate;
        if((locate = location.href.split('/'))[locate.length - 1] == '') return locate[locate.length - 3] + '-' + locate[locate.length - 2];
        return locate[locate.length - 2] + '-' + locate[locate.length - 1];
      })();
      return r;
    }
  },
  'hime-book.net': {
    main: ()=>{
      const r = {urls:[],title:''};
      for(var dom of document.querySelectorAll('.article-body-inner > a > img')) r.urls.push(dom.src);
      r.title = 'hime-book-' + location.href.split('/')[3];
      return r;
    }
  },
  'hmangatomoe.net': {
    main: ()=>{
      const r = {urls:[],title:''};
      for(var dom of document.querySelectorAll('.entry-content > p > a > img'))
        r.urls.push(dom.src);
      r.title = 'hmangamatome-' + location.href.split(/\/|\./g)[4];
      return r;
    }
  },
  'itaeromanga.com': {
    main: ()=>{
      const r = {urls:[],title:''};
      for(var dom of document.querySelectorAll('.entry-content > img'))
        if(dom.srcset) r.urls.push(dom.srcset);
      r.urls = savedojin.assets.srcsetParse(r.urls);
      r.title = 'itaeromanga-' + location.href.split('/').pop();
      return r;
    }
  },
  'ja.nyahentai.com': {
    main: async ()=>{
      const r = {urls:[],title:''};
      let rescnt = 0;
      await new Promise(async resolve=>{
        for(var dom of document.querySelectorAll('.gallerythumb'))
          (async()=>{
            rescnt++;
            r.urls.push(new DOMParser().parseFromString(await fetch(dom.href).then(res=>res.text()), 'text/html').querySelector('.current-img').src);
            rescnt--;
            if(rescnt == 0) resolve();
          })();
      });
      r.title = 'nyahentai-' + location.href.substr(0,location.href.length - 1).split('/').pop();
      return r;
    }
  },
  'kairakudoujin.net': {
    main: ()=>{
      const r = {urls:[],title:''};
      for(let dom of document.querySelectorAll('.entry > img')) r.urls.push(dom.src);
      var locate = location.href.split(/\/|\.|-/g);
      if(locate[locate.length - 1] == '' || locate[locate.length - 1] == 'html')
        r.title = 'kairakudoujin-' + locate[locate.length - 2];
      else r.title = 'kairakudoujin-' + locate[locate.length - 1];
      return r;
    }
  },
  'kankoredoujin.blog.fc2.com': {
    main: ()=>{
      const r = {urls:[],title:''};
      for(var dom of document.querySelectorAll('img'))
        if(dom.alt && !(dom.alt == 'QR') && !(dom.alt == 'FC2 Analyzer') && dom.src) r.urls.push(dom.src);
      r.title = 'ero-kanmusu-' + location.href.split(/\.|\/|-/)[8];
      return r;
    }
  },
  'manga100ka.jp': {
    main: ()=>{
      const r = {urls:[],title:''};
      for(var dom of document.querySelectorAll('.item_file > a'))
        r.urls.push(dom.href);
      r.title = 'manga100ka-' + location.href.split('=')[1];
      return r;
    }
  },
  'mangalear.blog': {
    main: ()=>{
      const r = {urls:[],title:''};
      for(var dom of document.querySelectorAll('#the-content a > img')) r.urls.push(dom.srcset);
      r.urls = savedojin.assets.srcsetParse(r.urls);
      r.title = 'mangalear-' + location.href.split('/')[4].split('doujinshi-')[1];
      return r;
    }
  },
  'moeero-library.com': {
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
  },
  'nhentai.net': {
    main: async ()=>{
      const r = {urls:[],title:''};
      for(let dom of document.querySelectorAll('.thumb-container > a')){
        let res = new DOMParser().parseFromString(await fetch(dom.href).then(res=>res.text()), 'text/html').querySelector('#image-container > a > img').src;
        if(!res) continue;
        r.urls.push(res);
      }
      let temp = location.href.split('/');
      r.title = 'nhentai-' + temp[3] + '-' + temp[4];
      return r;
    }
  },
  'nijioma.blog': {
    main: ()=>{
      const r = {urls:[],title:''};
      for(var dom of document.querySelectorAll('.entry-content > p > a > img'))
        if(dom.className.indexOf('wp-image-') != -1)
          r.urls.push(dom.srcset);
      r.urls = savedojin.assets.srcsetParse(r.urls);
      r.title = 'nijioma-' + location.href.split('/')[3];
      return r;
    }
  },
  'nukemanga.com': {
    main: ()=>{
      const r = {urls:[],title:''};
      for(var dom of document.querySelectorAll('.entry-content > p img')) if(dom.srcset) r.urls.push(dom.srcset);
      r.urls = savedojin.assets.srcsetParse(r.urls);
      r.title = 'nukeman-' + location.href.split('/')[3];
      return r;
    }
  },
  'oreno-erohon.com': {
    main: ()=>{
      const r = {urls:[],title:''};
      for(var dom of document.querySelectorAll('.entry-content img')) r.urls.push(dom.src);
      r.title = 'oreno-erohon-' + location.href.split('/')[4];
      return r;
    }
  },
  'pixiv.net': {
    main: async ()=>{
      const r = {urls:[],title:''};
      let temp, extend = null;
      // search extend
      for(var dom of document.querySelectorAll('button'))
        if(dom.querySelector('div:nth-child(2)') && dom.querySelector('div:nth-child(2)').innerText == 'すべて見る'){
          extend = dom;
          break;
        }
      
      // open extend
      if(extend !== null){
        // some images in this page
        extend.click();
        await savedojin.assets.sleep(1000); // 1s(1000ms) for now, adjust later
      }
      for(var dom of document.querySelectorAll('.gtm-expand-full-size-illust'))
        r.urls.push(dom.href);
      r.title = 'pixiv-' + (temp = location.href.split('/'))[temp.length - 1];
      return r;
    }
  },
  'xn--gmq92kd2rm1kx34a.com': {
    main: ()=>{ // zetsubo mangakan
      const r = {urls:[],title:''};
      for(var dom of document.querySelectorAll('.single-post img')) r.urls.push(dom.src);
      r.title = 'zetsubo-eromanga-' + location.href.split('/')[5].replace(/%/g,'');
      return r;
    }
  },
};

// ----- when clicked ----- //
savedojin.main();