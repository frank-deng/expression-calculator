export default class Lang{
    __locale=null;
    __fallback=null;
    constructor(data){
        this.__data=data;
        this.__locale=this.__fallback=Object.keys(this.__data)[0];
        this.setLocale();
    }
    setLocale(locales=null){
        if(!Array.isArray(locales)){
            locales=window.navigator.languages || [window.navigator.language];
        }
        for(let item of locales){
            for(let key in this.__data){
                if(item.toLowerCase()==key.toLowerCase()){
                    this.__locale=key;
                    return true;
                }
            }
            for(let key in this.__data){
                if(0==item.toLowerCase().indexOf(key.toLowerCase())){
                    this.__locale=key;
                    return true;
                }
            }
        }
        return false;
    }
    get(key){
        try{
            let langData=this.__data[this.__locale];
            if(langData && langData[key]){
                return langData[key];
            }
            langData=this.__data[this.__fallback];
            if(langData[key]){
                return langData[key];
            }
        }catch(e){
            console.error(e);
        }
        return key;
    }
}