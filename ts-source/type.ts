
export type BookInfoType = {

    /**
     * book-id (save file/dir name)
     */
    id: string;
  
    /**
     * original page url
     */
    origin: string;
  
    /**
     * url(src/srcset) list
     */
    pages: string[];
  
    /**
     * book-title
     */
    title?: string;
  
    /**
     * book-author
     */
    author?: string;
  
    /**
     * book-tags
     */
    tags?: string[];
  
    /**
     * series origin page list
     */
    series?: string[];
  };
  