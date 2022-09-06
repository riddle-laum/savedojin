import { BookInfoType } from './type';

namespace savedojin {
  
  /**
   * savedojin version
   */
  export const version = '2.0.0+alpha';

  /**
   * savedojin bookmarklet entrypoint (main function)
   */
  export async function main(): Promise<void> {
    // 
  }

  function deploy(data: BookInfoType): void {
    
    const bookRootHtml = `<html><head><meta charset="utf-8"><meta class="sd-data"><style>div>img{width:90%;}</style></head><body><div class="book-pages"></div></body></html>`;

    /**
     * book element
     */
    const bookRoot = (new DOMParser()).parseFromString(bookRootHtml, 'text/html');

    /**
     * metadata element
     */
    const meta = bookRoot.querySelector('meta.sd-data');
    if(!meta) return;
  }

  /**
   * src(url)/srcset => url
   * @param src src(url)/srcset
   * @return url/error(null)
   */
  function imgSrcResolve(src: string): string | null {

    // check is src is URL
    try {
      return (new URL(src)).toString();
    } catch {}

    // check is src is srcset
    if(/(^[^ ]+ [0-9]+[wx],\s*)*([^ ]+ [0-9]+[wx])$/.test(src)){
      // srcset
      const srcsetUrlPairList: string[] = src.match(/[^ ]+ [0-9]+[wx]/g) as string[];
      const srcsetData: { url: string, size: number }[] = srcsetUrlPairList.map((segment)=>{ const [, url, size] = /([^ ]+) ([0-9]+)[wx]/.exec(segment) ?? []; return { url: url ?? '', size: Number(size ?? '') }; });
      const result = srcsetData.reduce((prev, current)=>{
        if(prev.size !== prev.size) return current;
        if(current.size !== current.size) return prev;
        try {
          new URL(prev.url);
        } catch {
          return current;
        }
        try {
          new URL(current.url);
        } catch {
          return prev;
        }
        if(prev.size > current.size) return prev;
        return current;
      }).url;
      try {
        new URL(result);
        return result;
      } catch {
        return null;
      }
    }

    // error
    return null;
  }
}

// call main function
savedojin.main.call(null);
