!function(t,n){"object"==typeof exports&&"object"==typeof module?module.exports=n():"function"==typeof define&&define.amd?define([],n):"object"==typeof exports?exports.Calc=n():t.Calc=n()}(self,(function(){return function(){var t={3133:function(t,n,r){t.exports=r(7185)},200:function(t,n,r){t.exports=r(5627)},8548:function(t,n,r){t.exports=r(3391)},3287:function(t,n,r){t.exports=r(7036)},1765:function(t,n,r){t.exports=r(1343)},4309:function(t,n,r){t.exports=r(4511)},4100:function(t,n,r){t.exports=r(381)},3929:function(t,n,r){t.exports=r(8613)},4255:function(t,n,r){t.exports=r(433)},3497:function(t,n,r){t.exports=r(8318)},7781:function(t,n,r){t.exports=r(9137)},7219:function(t,n,r){t.exports=r(25)},7544:function(t,n,r){t.exports=r(2392)},7185:function(t,n,r){r(1867),r(2586),t.exports=r(4579).Array.from},5627:function(t,n,r){r(6760);var e=r(4579).Object;t.exports=function(t,n){return e.create(t,n)}},3391:function(t,n,r){r(1477);var e=r(4579).Object;t.exports=function(t,n,r){return e.defineProperty(t,n,r)}},7036:function(t,n,r){r(5178);var e=r(4579).Object;t.exports=function(t,n){return e.getOwnPropertyDescriptor(t,n)}},1343:function(t,n,r){r(3264),t.exports=r(4579).Object.getOwnPropertyDescriptors},4511:function(t,n,r){r(6840),t.exports=r(4579).Object.getOwnPropertySymbols},381:function(t,n,r){r(7220),t.exports=r(4579).Object.getPrototypeOf},8613:function(t,n,r){r(961),t.exports=r(4579).Object.keys},433:function(t,n,r){r(9349),t.exports=r(4579).Object.setPrototypeOf},8318:function(t,n,r){r(9650),t.exports=r(4579).Reflect.construct},9137:function(t,n,r){r(6917),t.exports=r(4579).Reflect.get},25:function(t,n,r){r(6840),r(4058),r(8174),r(6461),t.exports=r(4579).Symbol},2392:function(t,n,r){r(1867),r(3871),t.exports=r(5103).f("iterator")},5663:function(t){t.exports=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t}},9003:function(t){t.exports=function(){}},2159:function(t,n,r){var e=r(6727);t.exports=function(t){if(!e(t))throw TypeError(t+" is not an object!");return t}},7428:function(t,n,r){var e=r(7932),o=r(8728),i=r(6531);t.exports=function(t){return function(n,r,u){var c,a=e(n),f=o(a.length),s=i(u,f);if(t&&r!=r){for(;f>s;)if((c=a[s++])!=c)return!0}else for(;f>s;s++)if((t||s in a)&&a[s]===r)return t||s||0;return!t&&-1}}},4094:function(t,n,r){"use strict";var e=r(5663),o=r(6727),i=r(6778),u=[].slice,c={},a=function(t,n,r){if(!(n in c)){for(var e=[],o=0;o<n;o++)e[o]="a["+o+"]";c[n]=Function("F,a","return new F("+e.join(",")+")")}return c[n](t,r)};t.exports=Function.bind||function(t){var n=e(this),r=u.call(arguments,1),c=function(){var e=r.concat(u.call(arguments));return this instanceof c?a(n,e.length,e):i(n,e,t)};return o(n.prototype)&&(c.prototype=n.prototype),c}},4677:function(t,n,r){var e=r(2894),o=r(2939)("toStringTag"),i="Arguments"==e(function(){return arguments}());t.exports=function(t){var n,r,u;return void 0===t?"Undefined":null===t?"Null":"string"==typeof(r=function(t,n){try{return t[n]}catch(t){}}(n=Object(t),o))?r:i?e(n):"Object"==(u=e(n))&&"function"==typeof n.callee?"Arguments":u}},2894:function(t){var n={}.toString;t.exports=function(t){return n.call(t).slice(8,-1)}},4579:function(t){var n=t.exports={version:"2.6.12"};"number"==typeof __e&&(__e=n)},2445:function(t,n,r){"use strict";var e=r(4743),o=r(3101);t.exports=function(t,n,r){n in t?e.f(t,n,o(0,r)):t[n]=r}},9216:function(t,n,r){var e=r(5663);t.exports=function(t,n,r){if(e(t),void 0===n)return t;switch(r){case 1:return function(r){return t.call(n,r)};case 2:return function(r,e){return t.call(n,r,e)};case 3:return function(r,e,o){return t.call(n,r,e,o)}}return function(){return t.apply(n,arguments)}}},8333:function(t){t.exports=function(t){if(null==t)throw TypeError("Can't call method on  "+t);return t}},9666:function(t,n,r){t.exports=!r(7929)((function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a}))},7467:function(t,n,r){var e=r(6727),o=r(3938).document,i=e(o)&&e(o.createElement);t.exports=function(t){return i?o.createElement(t):{}}},3338:function(t){t.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")},337:function(t,n,r){var e=r(6162),o=r(8195),i=r(6274);t.exports=function(t){var n=e(t),r=o.f;if(r)for(var u,c=r(t),a=i.f,f=0;c.length>f;)a.call(t,u=c[f++])&&n.push(u);return n}},3856:function(t,n,r){var e=r(3938),o=r(4579),i=r(9216),u=r(1818),c=r(7069),a=function(t,n,r){var f,s,l,p=t&a.F,y=t&a.G,v=t&a.S,h=t&a.P,b=t&a.B,d=t&a.W,g=y?o:o[n]||(o[n]={}),_=g.prototype,x=y?e:v?e[n]:(e[n]||{}).prototype;for(f in y&&(r=n),r)(s=!p&&x&&void 0!==x[f])&&c(g,f)||(l=s?x[f]:r[f],g[f]=y&&"function"!=typeof x[f]?r[f]:b&&s?i(l,e):d&&x[f]==l?function(t){var n=function(n,r,e){if(this instanceof t){switch(arguments.length){case 0:return new t;case 1:return new t(n);case 2:return new t(n,r)}return new t(n,r,e)}return t.apply(this,arguments)};return n.prototype=t.prototype,n}(l):h&&"function"==typeof l?i(Function.call,l):l,h&&((g.virtual||(g.virtual={}))[f]=l,t&a.R&&_&&!_[f]&&u(_,f,l)))};a.F=1,a.G=2,a.S=4,a.P=8,a.B=16,a.W=32,a.U=64,a.R=128,t.exports=a},7929:function(t){t.exports=function(t){try{return!!t()}catch(t){return!0}}},3938:function(t){var n=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=n)},7069:function(t){var n={}.hasOwnProperty;t.exports=function(t,r){return n.call(t,r)}},1818:function(t,n,r){var e=r(4743),o=r(3101);t.exports=r(9666)?function(t,n,r){return e.f(t,n,o(1,r))}:function(t,n,r){return t[n]=r,t}},4881:function(t,n,r){var e=r(3938).document;t.exports=e&&e.documentElement},3758:function(t,n,r){t.exports=!r(9666)&&!r(7929)((function(){return 7!=Object.defineProperty(r(7467)("div"),"a",{get:function(){return 7}}).a}))},6778:function(t){t.exports=function(t,n,r){var e=void 0===r;switch(n.length){case 0:return e?t():t.call(r);case 1:return e?t(n[0]):t.call(r,n[0]);case 2:return e?t(n[0],n[1]):t.call(r,n[0],n[1]);case 3:return e?t(n[0],n[1],n[2]):t.call(r,n[0],n[1],n[2]);case 4:return e?t(n[0],n[1],n[2],n[3]):t.call(r,n[0],n[1],n[2],n[3])}return t.apply(r,n)}},799:function(t,n,r){var e=r(2894);t.exports=Object("z").propertyIsEnumerable(0)?Object:function(t){return"String"==e(t)?t.split(""):Object(t)}},5991:function(t,n,r){var e=r(5449),o=r(2939)("iterator"),i=Array.prototype;t.exports=function(t){return void 0!==t&&(e.Array===t||i[o]===t)}},1421:function(t,n,r){var e=r(2894);t.exports=Array.isArray||function(t){return"Array"==e(t)}},6727:function(t){t.exports=function(t){return"object"==typeof t?null!==t:"function"==typeof t}},5602:function(t,n,r){var e=r(2159);t.exports=function(t,n,r,o){try{return o?n(e(r)[0],r[1]):n(r)}catch(n){var i=t.return;throw void 0!==i&&e(i.call(t)),n}}},3945:function(t,n,r){"use strict";var e=r(8989),o=r(3101),i=r(5378),u={};r(1818)(u,r(2939)("iterator"),(function(){return this})),t.exports=function(t,n,r){t.prototype=e(u,{next:o(1,r)}),i(t,n+" Iterator")}},5700:function(t,n,r){"use strict";var e=r(6227),o=r(3856),i=r(7470),u=r(1818),c=r(5449),a=r(3945),f=r(5378),s=r(5089),l=r(2939)("iterator"),p=!([].keys&&"next"in[].keys()),y="keys",v="values",h=function(){return this};t.exports=function(t,n,r,b,d,g,_){a(r,n,b);var x,w,m,O=function(t){if(!p&&t in E)return E[t];switch(t){case y:case v:return function(){return new r(this,t)}}return function(){return new r(this,t)}},S=n+" Iterator",j=d==v,T=!1,E=t.prototype,P=E[l]||E["@@iterator"]||d&&E[d],k=P||O(d),N=d?j?O("entries"):k:void 0,A="Array"==n&&E.entries||P;if(A&&(m=s(A.call(new t)))!==Object.prototype&&m.next&&(f(m,S,!0),e||"function"==typeof m[l]||u(m,l,h)),j&&P&&P.name!==v&&(T=!0,k=function(){return P.call(this)}),e&&!_||!p&&!T&&E[l]||u(E,l,k),c[n]=k,c[S]=h,d)if(x={values:j?k:O(v),keys:g?k:O(y),entries:N},_)for(w in x)w in E||i(E,w,x[w]);else o(o.P+o.F*(p||T),n,x);return x}},6630:function(t,n,r){var e=r(2939)("iterator"),o=!1;try{var i=[7][e]();i.return=function(){o=!0},Array.from(i,(function(){throw 2}))}catch(t){}t.exports=function(t,n){if(!n&&!o)return!1;var r=!1;try{var i=[7],u=i[e]();u.next=function(){return{done:r=!0}},i[e]=function(){return u},t(i)}catch(t){}return r}},5084:function(t){t.exports=function(t,n){return{value:n,done:!!t}}},5449:function(t){t.exports={}},6227:function(t){t.exports=!0},7177:function(t,n,r){var e=r(5730)("meta"),o=r(6727),i=r(7069),u=r(4743).f,c=0,a=Object.isExtensible||function(){return!0},f=!r(7929)((function(){return a(Object.preventExtensions({}))})),s=function(t){u(t,e,{value:{i:"O"+ ++c,w:{}}})},l=t.exports={KEY:e,NEED:!1,fastKey:function(t,n){if(!o(t))return"symbol"==typeof t?t:("string"==typeof t?"S":"P")+t;if(!i(t,e)){if(!a(t))return"F";if(!n)return"E";s(t)}return t[e].i},getWeak:function(t,n){if(!i(t,e)){if(!a(t))return!0;if(!n)return!1;s(t)}return t[e].w},onFreeze:function(t){return f&&l.NEED&&a(t)&&!i(t,e)&&s(t),t}}},8989:function(t,n,r){var e=r(2159),o=r(7856),i=r(3338),u=r(7281)("IE_PROTO"),c=function(){},a=function(){var t,n=r(7467)("iframe"),e=i.length;for(n.style.display="none",r(4881).appendChild(n),n.src="javascript:",(t=n.contentWindow.document).open(),t.write("<script>document.F=Object<\/script>"),t.close(),a=t.F;e--;)delete a.prototype[i[e]];return a()};t.exports=Object.create||function(t,n){var r;return null!==t?(c.prototype=e(t),r=new c,c.prototype=null,r[u]=t):r=a(),void 0===n?r:o(r,n)}},4743:function(t,n,r){var e=r(2159),o=r(3758),i=r(3206),u=Object.defineProperty;n.f=r(9666)?Object.defineProperty:function(t,n,r){if(e(t),n=i(n,!0),e(r),o)try{return u(t,n,r)}catch(t){}if("get"in r||"set"in r)throw TypeError("Accessors not supported!");return"value"in r&&(t[n]=r.value),t}},7856:function(t,n,r){var e=r(4743),o=r(2159),i=r(6162);t.exports=r(9666)?Object.defineProperties:function(t,n){o(t);for(var r,u=i(n),c=u.length,a=0;c>a;)e.f(t,r=u[a++],n[r]);return t}},6183:function(t,n,r){var e=r(6274),o=r(3101),i=r(7932),u=r(3206),c=r(7069),a=r(3758),f=Object.getOwnPropertyDescriptor;n.f=r(9666)?f:function(t,n){if(t=i(t),n=u(n,!0),a)try{return f(t,n)}catch(t){}if(c(t,n))return o(!e.f.call(t,n),t[n])}},4368:function(t,n,r){var e=r(7932),o=r(3230).f,i={}.toString,u="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[];t.exports.f=function(t){return u&&"[object Window]"==i.call(t)?function(t){try{return o(t)}catch(t){return u.slice()}}(t):o(e(t))}},3230:function(t,n,r){var e=r(2963),o=r(3338).concat("length","prototype");n.f=Object.getOwnPropertyNames||function(t){return e(t,o)}},8195:function(t,n){n.f=Object.getOwnPropertySymbols},5089:function(t,n,r){var e=r(7069),o=r(6530),i=r(7281)("IE_PROTO"),u=Object.prototype;t.exports=Object.getPrototypeOf||function(t){return t=o(t),e(t,i)?t[i]:"function"==typeof t.constructor&&t instanceof t.constructor?t.constructor.prototype:t instanceof Object?u:null}},2963:function(t,n,r){var e=r(7069),o=r(7932),i=r(7428)(!1),u=r(7281)("IE_PROTO");t.exports=function(t,n){var r,c=o(t),a=0,f=[];for(r in c)r!=u&&e(c,r)&&f.push(r);for(;n.length>a;)e(c,r=n[a++])&&(~i(f,r)||f.push(r));return f}},6162:function(t,n,r){var e=r(2963),o=r(3338);t.exports=Object.keys||function(t){return e(t,o)}},6274:function(t,n){n.f={}.propertyIsEnumerable},2584:function(t,n,r){var e=r(3856),o=r(4579),i=r(7929);t.exports=function(t,n){var r=(o.Object||{})[t]||Object[t],u={};u[t]=n(r),e(e.S+e.F*i((function(){r(1)})),"Object",u)}},2661:function(t,n,r){var e=r(3230),o=r(8195),i=r(2159),u=r(3938).Reflect;t.exports=u&&u.ownKeys||function(t){var n=e.f(i(t)),r=o.f;return r?n.concat(r(t)):n}},3101:function(t){t.exports=function(t,n){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:n}}},7470:function(t,n,r){t.exports=r(1818)},2906:function(t,n,r){var e=r(6727),o=r(2159),i=function(t,n){if(o(t),!e(n)&&null!==n)throw TypeError(n+": can't set as prototype!")};t.exports={set:Object.setPrototypeOf||("__proto__"in{}?function(t,n,e){try{(e=r(9216)(Function.call,r(6183).f(Object.prototype,"__proto__").set,2))(t,[]),n=!(t instanceof Array)}catch(t){n=!0}return function(t,r){return i(t,r),n?t.__proto__=r:e(t,r),t}}({},!1):void 0),check:i}},5378:function(t,n,r){var e=r(4743).f,o=r(7069),i=r(2939)("toStringTag");t.exports=function(t,n,r){t&&!o(t=r?t:t.prototype,i)&&e(t,i,{configurable:!0,value:n})}},7281:function(t,n,r){var e=r(250)("keys"),o=r(5730);t.exports=function(t){return e[t]||(e[t]=o(t))}},250:function(t,n,r){var e=r(4579),o=r(3938),i="__core-js_shared__",u=o[i]||(o[i]={});(t.exports=function(t,n){return u[t]||(u[t]=void 0!==n?n:{})})("versions",[]).push({version:e.version,mode:r(6227)?"pure":"global",copyright:"© 2020 Denis Pushkarev (zloirock.ru)"})},510:function(t,n,r){var e=r(1052),o=r(8333);t.exports=function(t){return function(n,r){var i,u,c=String(o(n)),a=e(r),f=c.length;return a<0||a>=f?t?"":void 0:(i=c.charCodeAt(a))<55296||i>56319||a+1===f||(u=c.charCodeAt(a+1))<56320||u>57343?t?c.charAt(a):i:t?c.slice(a,a+2):u-56320+(i-55296<<10)+65536}}},6531:function(t,n,r){var e=r(1052),o=Math.max,i=Math.min;t.exports=function(t,n){return(t=e(t))<0?o(t+n,0):i(t,n)}},1052:function(t){var n=Math.ceil,r=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?r:n)(t)}},7932:function(t,n,r){var e=r(799),o=r(8333);t.exports=function(t){return e(o(t))}},8728:function(t,n,r){var e=r(1052),o=Math.min;t.exports=function(t){return t>0?o(e(t),9007199254740991):0}},6530:function(t,n,r){var e=r(8333);t.exports=function(t){return Object(e(t))}},3206:function(t,n,r){var e=r(6727);t.exports=function(t,n){if(!e(t))return t;var r,o;if(n&&"function"==typeof(r=t.toString)&&!e(o=r.call(t)))return o;if("function"==typeof(r=t.valueOf)&&!e(o=r.call(t)))return o;if(!n&&"function"==typeof(r=t.toString)&&!e(o=r.call(t)))return o;throw TypeError("Can't convert object to primitive value")}},5730:function(t){var n=0,r=Math.random();t.exports=function(t){return"Symbol(".concat(void 0===t?"":t,")_",(++n+r).toString(36))}},6347:function(t,n,r){var e=r(3938),o=r(4579),i=r(6227),u=r(5103),c=r(4743).f;t.exports=function(t){var n=o.Symbol||(o.Symbol=i?{}:e.Symbol||{});"_"==t.charAt(0)||t in n||c(n,t,{value:u.f(t)})}},5103:function(t,n,r){n.f=r(2939)},2939:function(t,n,r){var e=r(250)("wks"),o=r(5730),i=r(3938).Symbol,u="function"==typeof i;(t.exports=function(t){return e[t]||(e[t]=u&&i[t]||(u?i:o)("Symbol."+t))}).store=e},3728:function(t,n,r){var e=r(4677),o=r(2939)("iterator"),i=r(5449);t.exports=r(4579).getIteratorMethod=function(t){if(null!=t)return t[o]||t["@@iterator"]||i[e(t)]}},2586:function(t,n,r){"use strict";var e=r(9216),o=r(3856),i=r(6530),u=r(5602),c=r(5991),a=r(8728),f=r(2445),s=r(3728);o(o.S+o.F*!r(6630)((function(t){Array.from(t)})),"Array",{from:function(t){var n,r,o,l,p=i(t),y="function"==typeof this?this:Array,v=arguments.length,h=v>1?arguments[1]:void 0,b=void 0!==h,d=0,g=s(p);if(b&&(h=e(h,v>2?arguments[2]:void 0,2)),null==g||y==Array&&c(g))for(r=new y(n=a(p.length));n>d;d++)f(r,d,b?h(p[d],d):p[d]);else for(l=g.call(p),r=new y;!(o=l.next()).done;d++)f(r,d,b?u(l,h,[o.value,d],!0):o.value);return r.length=d,r}})},3882:function(t,n,r){"use strict";var e=r(9003),o=r(5084),i=r(5449),u=r(7932);t.exports=r(5700)(Array,"Array",(function(t,n){this._t=u(t),this._i=0,this._k=n}),(function(){var t=this._t,n=this._k,r=this._i++;return!t||r>=t.length?(this._t=void 0,o(1)):o(0,"keys"==n?r:"values"==n?t[r]:[r,t[r]])}),"values"),i.Arguments=i.Array,e("keys"),e("values"),e("entries")},6760:function(t,n,r){var e=r(3856);e(e.S,"Object",{create:r(8989)})},1477:function(t,n,r){var e=r(3856);e(e.S+e.F*!r(9666),"Object",{defineProperty:r(4743).f})},5178:function(t,n,r){var e=r(7932),o=r(6183).f;r(2584)("getOwnPropertyDescriptor",(function(){return function(t,n){return o(e(t),n)}}))},7220:function(t,n,r){var e=r(6530),o=r(5089);r(2584)("getPrototypeOf",(function(){return function(t){return o(e(t))}}))},961:function(t,n,r){var e=r(6530),o=r(6162);r(2584)("keys",(function(){return function(t){return o(e(t))}}))},9349:function(t,n,r){var e=r(3856);e(e.S,"Object",{setPrototypeOf:r(2906).set})},4058:function(){},9650:function(t,n,r){var e=r(3856),o=r(8989),i=r(5663),u=r(2159),c=r(6727),a=r(7929),f=r(4094),s=(r(3938).Reflect||{}).construct,l=a((function(){function t(){}return!(s((function(){}),[],t)instanceof t)})),p=!a((function(){s((function(){}))}));e(e.S+e.F*(l||p),"Reflect",{construct:function(t,n){i(t),u(n);var r=arguments.length<3?t:i(arguments[2]);if(p&&!l)return s(t,n,r);if(t==r){switch(n.length){case 0:return new t;case 1:return new t(n[0]);case 2:return new t(n[0],n[1]);case 3:return new t(n[0],n[1],n[2]);case 4:return new t(n[0],n[1],n[2],n[3])}var e=[null];return e.push.apply(e,n),new(f.apply(t,e))}var a=r.prototype,y=o(c(a)?a:Object.prototype),v=Function.apply.call(t,y,n);return c(v)?v:y}})},6917:function(t,n,r){var e=r(6183),o=r(5089),i=r(7069),u=r(3856),c=r(6727),a=r(2159);u(u.S,"Reflect",{get:function t(n,r){var u,f,s=arguments.length<3?n:arguments[2];return a(n)===s?n[r]:(u=e.f(n,r))?i(u,"value")?u.value:void 0!==u.get?u.get.call(s):void 0:c(f=o(n))?t(f,r,s):void 0}})},1867:function(t,n,r){"use strict";var e=r(510)(!0);r(5700)(String,"String",(function(t){this._t=String(t),this._i=0}),(function(){var t,n=this._t,r=this._i;return r>=n.length?{value:void 0,done:!0}:(t=e(n,r),this._i+=t.length,{value:t,done:!1})}))},6840:function(t,n,r){"use strict";var e=r(3938),o=r(7069),i=r(9666),u=r(3856),c=r(7470),a=r(7177).KEY,f=r(7929),s=r(250),l=r(5378),p=r(5730),y=r(2939),v=r(5103),h=r(6347),b=r(337),d=r(1421),g=r(2159),_=r(6727),x=r(6530),w=r(7932),m=r(3206),O=r(3101),S=r(8989),j=r(4368),T=r(6183),E=r(8195),P=r(4743),k=r(6162),N=T.f,A=P.f,R=j.f,I=e.Symbol,L=e.JSON,M=L&&L.stringify,F=y("_hidden"),C=y("toPrimitive"),D={}.propertyIsEnumerable,G=s("symbol-registry"),B=s("symbols"),V=s("op-symbols"),K=Object.prototype,U="function"==typeof I&&!!E.f,W=e.QObject,z=!W||!W.prototype||!W.prototype.findChild,H=i&&f((function(){return 7!=S(A({},"a",{get:function(){return A(this,"a",{value:7}).a}})).a}))?function(t,n,r){var e=N(K,n);e&&delete K[n],A(t,n,r),e&&t!==K&&A(K,n,e)}:A,J=function(t){var n=B[t]=S(I.prototype);return n._k=t,n},$=U&&"symbol"==typeof I.iterator?function(t){return"symbol"==typeof t}:function(t){return t instanceof I},Y=function(t,n,r){return t===K&&Y(V,n,r),g(t),n=m(n,!0),g(r),o(B,n)?(r.enumerable?(o(t,F)&&t[F][n]&&(t[F][n]=!1),r=S(r,{enumerable:O(0,!1)})):(o(t,F)||A(t,F,O(1,{})),t[F][n]=!0),H(t,n,r)):A(t,n,r)},Z=function(t,n){g(t);for(var r,e=b(n=w(n)),o=0,i=e.length;i>o;)Y(t,r=e[o++],n[r]);return t},q=function(t){var n=D.call(this,t=m(t,!0));return!(this===K&&o(B,t)&&!o(V,t))&&(!(n||!o(this,t)||!o(B,t)||o(this,F)&&this[F][t])||n)},Q=function(t,n){if(t=w(t),n=m(n,!0),t!==K||!o(B,n)||o(V,n)){var r=N(t,n);return!r||!o(B,n)||o(t,F)&&t[F][n]||(r.enumerable=!0),r}},X=function(t){for(var n,r=R(w(t)),e=[],i=0;r.length>i;)o(B,n=r[i++])||n==F||n==a||e.push(n);return e},tt=function(t){for(var n,r=t===K,e=R(r?V:w(t)),i=[],u=0;e.length>u;)!o(B,n=e[u++])||r&&!o(K,n)||i.push(B[n]);return i};U||(c((I=function(){if(this instanceof I)throw TypeError("Symbol is not a constructor!");var t=p(arguments.length>0?arguments[0]:void 0),n=function(r){this===K&&n.call(V,r),o(this,F)&&o(this[F],t)&&(this[F][t]=!1),H(this,t,O(1,r))};return i&&z&&H(K,t,{configurable:!0,set:n}),J(t)}).prototype,"toString",(function(){return this._k})),T.f=Q,P.f=Y,r(3230).f=j.f=X,r(6274).f=q,E.f=tt,i&&!r(6227)&&c(K,"propertyIsEnumerable",q,!0),v.f=function(t){return J(y(t))}),u(u.G+u.W+u.F*!U,{Symbol:I});for(var nt="hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","),rt=0;nt.length>rt;)y(nt[rt++]);for(var et=k(y.store),ot=0;et.length>ot;)h(et[ot++]);u(u.S+u.F*!U,"Symbol",{for:function(t){return o(G,t+="")?G[t]:G[t]=I(t)},keyFor:function(t){if(!$(t))throw TypeError(t+" is not a symbol!");for(var n in G)if(G[n]===t)return n},useSetter:function(){z=!0},useSimple:function(){z=!1}}),u(u.S+u.F*!U,"Object",{create:function(t,n){return void 0===n?S(t):Z(S(t),n)},defineProperty:Y,defineProperties:Z,getOwnPropertyDescriptor:Q,getOwnPropertyNames:X,getOwnPropertySymbols:tt});var it=f((function(){E.f(1)}));u(u.S+u.F*it,"Object",{getOwnPropertySymbols:function(t){return E.f(x(t))}}),L&&u(u.S+u.F*(!U||f((function(){var t=I();return"[null]"!=M([t])||"{}"!=M({a:t})||"{}"!=M(Object(t))}))),"JSON",{stringify:function(t){for(var n,r,e=[t],o=1;arguments.length>o;)e.push(arguments[o++]);if(r=n=e[1],(_(n)||void 0!==t)&&!$(t))return d(n)||(n=function(t,n){if("function"==typeof r&&(n=r.call(this,t,n)),!$(n))return n}),e[1]=n,M.apply(L,e)}}),I.prototype[C]||r(1818)(I.prototype,C,I.prototype.valueOf),l(I,"Symbol"),l(Math,"Math",!0),l(e.JSON,"JSON",!0)},3264:function(t,n,r){var e=r(3856),o=r(2661),i=r(7932),u=r(6183),c=r(2445);e(e.S,"Object",{getOwnPropertyDescriptors:function(t){for(var n,r,e=i(t),a=u.f,f=o(e),s={},l=0;f.length>l;)void 0!==(r=a(e,n=f[l++]))&&c(s,n,r);return s}})},8174:function(t,n,r){r(6347)("asyncIterator")},6461:function(t,n,r){r(6347)("observable")},3871:function(t,n,r){r(3882);for(var e=r(3938),o=r(1818),i=r(5449),u=r(2939)("toStringTag"),c="CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,TextTrackList,TouchList".split(","),a=0;a<c.length;a++){var f=c[a],s=e[f],l=s&&s.prototype;l&&!l[u]&&o(l,u,f),i[f]=i.Array}}},n={};function r(e){var o=n[e];if(void 0!==o)return o.exports;var i=n[e]={exports:{}};return t[e](i,i.exports,r),i.exports}r.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(n,{a:n}),n},r.d=function(t,n){for(var e in n)r.o(n,e)&&!r.o(t,e)&&Object.defineProperty(t,e,{enumerable:!0,get:n[e]})},r.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)};var e={};return function(){"use strict";r.d(e,{default:function(){return $}});var t=r(3497),n=r.n(t);function o(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}var i=r(200),u=r(4255);function c(t,n){return(c=u||function(t,n){return t.__proto__=n,t})(t,n)}function a(t,n){if("function"!=typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function");t.prototype=i(n&&n.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),n&&c(t,n)}var f=r(7219),s=r.n(f),l=r(7544),p=r.n(l);function y(t){return(y="function"==typeof f&&"symbol"==typeof l?function(t){return typeof t}:function(t){return t&&"function"==typeof f&&t.constructor===f&&t!==f.prototype?"symbol":typeof t})(t)}function v(t,n){if(n&&("object"===y(n)||"function"==typeof n))return n;if(void 0!==n)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}var h=r(4100);function b(t){return(b=u?h:function(t){return t.__proto__||h(t)})(t)}var d=r(8548);function g(t,n,r){return n in t?d(t,n,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[n]=r,t}var _=r(3133),x=r.n(_),w=r(3929),m=r.n(w),O=r(4309),S=r.n(O),j=r(3287),T=r.n(j),E=r(1765),P=r.n(E);function k(t,n){for(var r=0;r<n.length;r++){var e=n[r];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),d(t,e.key,e)}}function N(t,n,r){return n&&k(t.prototype,n),r&&k(t,r),t}var A={"+":{binocular:!0,priority:14,exchangeable:!0,processor:function(t,n){return t+n}},"-":{binocular:!0,priority:14,exchangeable:!1,processor:function(t,n){return t-n}},"*":{binocular:!0,priority:15,exchangeable:!0,processor:function(t,n){return t*n}},"/":{binocular:!0,priority:15,exchangeable:!1,processor:function(t,n){return t/n}},"%":{binocular:!0,priority:15,exchangeable:!1,processor:function(t,n){return t%n}},"**":{binocular:!0,priority:16,exchangeable:!1,rightToLeft:!0,processor:function(t,n){return Math.pow(t,n)}},"&":{binocular:!0,priority:10,exchangeable:!0,bitwise:!0,processor:function(t,n){return t&n}},"|":{binocular:!0,priority:8,exchangeable:!0,bitwise:!0,processor:function(t,n){return t|n}},"^":{binocular:!0,priority:9,exchangeable:!0,bitwise:!0,processor:function(t,n){return t^n}},"~":{binocular:!1,priority:17,bitwise:!0,processor:function(t){return~t}},NEG:{match:!1,binocular:!1,priority:17,processor:function(t){return-t}}},R=["(",")"];for(var I in A)!1!==A[I].match&&R.push(I);R.sort((function(t,n){return n.length-t.length}));var L,M=R.map((function(t){return t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")})),F=new RegExp("^("+M.join("|")+")"),C=A,D=r(7781);function G(t,n,r){return(G="undefined"!=typeof Reflect&&D?D:function(t,n,r){var e=function(t,n){for(;!Object.prototype.hasOwnProperty.call(t,n)&&null!==(t=b(t)););return t}(t,n);if(e){var o=j(e,n);return o.get?o.get.call(r):o.value}})(t,n,r||t)}function B(t,n){(null==n||n>t.length)&&(n=t.length);for(var r=0,e=new Array(n);r<n;r++)e[r]=t[r];return e}L=p();var V,K=function(){function t(n){o(this,t),this.__input=this.__inputOrig=n,this.__pos=0}return N(t,[{key:L,value:function(){return this}},{key:"__proc",value:function(n){var r,e=function(t,n){var r=void 0!==s()&&t[p()]||t["@@iterator"];if(!r){if(Array.isArray(t)||(r=function(t,n){if(t){if("string"==typeof t)return B(t,n);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?x()(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?B(t,n):void 0}}(t))||n&&t&&"number"==typeof t.length){r&&(t=r);var e=0,o=function(){};return{s:o,n:function(){return e>=t.length?{done:!0}:{done:!1,value:t[e++]}},e:function(t){throw t},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,u=!0,c=!1;return{s:function(){r=r.call(t)},n:function(){var t=r.next();return u=t.done,t},e:function(t){c=!0,i=t},f:function(){try{u||null==r.return||r.return()}finally{if(c)throw i}}}}(t.__lexTable);try{for(e.s();!(r=e.n()).done;){var o=r.value,i=o.rule.exec(n);if(i&&0==i.index)return{type:o.type,value:i[0]}}}catch(t){e.e(t)}finally{e.f()}return null}},{key:"getPos",value:function(){return this.__pos}},{key:"next",value:function(){for(;this.__input;){var t=this.__proc(this.__input);if(!t)throw new SyntaxError("Unexpected Character at position ".concat(this.__pos));var n=t.type,r=t.value;if(this.__input=this.__input.slice(r.length),this.__pos+=r.length,n)return{done:!1,value:{type:n,value:r}}}return this.__input=this.__inputOrig,this.__pos=0,{done:!0}}}]),t}();function U(t,n){var r=m()(t);if(S()){var e=S()(t);n&&(e=e.filter((function(n){return T()(t,n).enumerable}))),r.push.apply(r,e)}return r}g(K,"__lexTable",[{rule:/^\s+/,type:null},{rule:/^0x[0-9A-Fa-f]+/,type:1},{rule:/^[0-9]+(\.[0-9]+)?([Ee][+\-][0-9]+)?/,type:1},{rule:F,type:3},{rule:/^[A-Za-z_\u0080-\uffff][A-Za-z0-9_\u0080-\uffff]*/,type:2}]),V=p();var W=function(t){a(u,t);var r,e,i=(r=u,e=function(){if("undefined"==typeof Reflect||!n())return!1;if(n().sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(n()(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,o=b(r);if(e){var i=b(this).constructor;t=n()(o,arguments,i)}else t=o.apply(this,arguments);return v(this,t)});function u(t){var n;return o(this,u),(n=i.call(this,t)).__reset(),n}return N(u,[{key:V,value:function(){return this}},{key:"__reset",value:function(){this.__lastToken=null,this.__lastTokenType="START",this.__bracketDepth=0}},{key:"next",value:function(){var t=u.syntaxTable;try{var n=G(b(u.prototype),"next",this).call(this),r=n.done,e=n.value,o=G(b(u.prototype),"getPos",this).call(this),i=null,c=null;if(r)c="END";else{if(o-=e.value.length,3==(i=function(t){for(var n=1;n<arguments.length;n++){var r=null!=arguments[n]?arguments[n]:{};n%2?U(Object(r),!0).forEach((function(n){g(t,n,r[n])})):P()?Object.defineProperties(t,P()(r)):U(Object(r)).forEach((function(n){Object.defineProperty(t,n,T()(r,n))}))}return t}({},e)).type&&"-"==i.value&&u.lastTokenNEGConv[this.__lastTokenType]){var a=this.__lastToken;if(a&&3==a.type&&("NEG"==a.value||"-"==a.value))throw new SyntaxError("Invalid input at position ".concat(o));i.value="NEG"}c=u.getTokenType(i)}if(!t[this.__lastTokenType]||!t[this.__lastTokenType][c])throw new SyntaxError("Invalid input at position ".concat(o));switch(c){case"(":this.__bracketDepth++;break;case")":this.__bracketDepth--;break;case"END":if(this.__bracketDepth)throw new SyntaxError("Bracket mismatch")}return"END"==c?(this.__reset(),{done:!0}):(this.__lastToken=i,this.__lastTokenType=c,{done:!1,value:i})}catch(t){try{this.__reset()}catch(t){console.error(t)}throw t}}}],[{key:"getTokenType",value:function(t){return t?1==t.type||2==t.type?"N":3==t.type?"("==t.value?"(":")"==t.value?")":C[t.value].binocular?"B":"S":null:"START"}}]),u}(K);function z(t,n){var r=m()(t);if(S()){var e=S()(t);n&&(e=e.filter((function(n){return T()(t,n).enumerable}))),r.push.apply(r,e)}return r}function H(t,n){var r=void 0!==s()&&t[p()]||t["@@iterator"];if(!r){if(Array.isArray(t)||(r=function(t,n){if(t){if("string"==typeof t)return J(t,n);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?x()(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?J(t,n):void 0}}(t))||n&&t&&"number"==typeof t.length){r&&(t=r);var e=0,o=function(){};return{s:o,n:function(){return e>=t.length?{done:!0}:{done:!1,value:t[e++]}},e:function(t){throw t},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,u=!0,c=!1;return{s:function(){r=r.call(t)},n:function(){var t=r.next();return u=t.done,t},e:function(t){c=!0,i=t},f:function(){try{u||null==r.return||r.return()}finally{if(c)throw i}}}}function J(t,n){(null==n||n>t.length)&&(n=t.length);for(var r=0,e=new Array(n);r<n;r++)e[r]=t[r];return e}g(W,"syntaxTable",{START:{N:!0,S:!0,"(":!0},N:{B:!0,")":!0,END:!0},S:{N:!0,"(":!0},B:{N:!0,"(":!0,S:!0},"(":{S:!0,N:!0,"(":!0},")":{")":!0,B:!0,END:!0}}),g(W,"lastTokenNEGConv",{START:!0,"(":!0,B:!0,S:!0});var $=function(t){a(u,t);var r,e,i=(r=u,e=function(){if("undefined"==typeof Reflect||!n())return!1;if(n().sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(n()(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,o=b(r);if(e){var i=b(this).constructor;t=n()(o,arguments,i)}else t=o.apply(this,arguments);return v(this,t)});function u(t){return o(this,u),i.call(this,t)}return u}(function(){function t(n){o(this,t),g(this,"__data",[]),n instanceof t&&this.setRPN(n.getRPN()),"string"==typeof n?this.compile(n):Array.isArray(n)&&n.length&&this.setRPN(n)}return N(t,[{key:"__numConv",value:function(t){if(isNaN(t))throw new TypeError("Invalid number format");return Number(t)}},{key:"compile",value:function(t){var n,r=[],e=[],o=H(new W(t));try{for(o.s();!(n=o.n()).done;){var i=n.value;if(1==i.type)i.value=this.__numConv(i.value),r.push(i);else if(2==i.type)r.push(i);else if(3==i.type)if(e.length&&"("!=i.value)if(")"==i.value)for(var u=null;(u=e.pop())&&"("!=u.value;)r.push(u);else{for(;e.length;){var c=e[e.length-1].value,a=C[c],f=C[i.value];if("("==c||a.priority<f.priority||a.rightToLeft&&f.rightToLeft)break;r.push(e.pop())}e.push(i)}else e.push(i)}}catch(t){o.e(t)}finally{o.f()}for(;e.length;)r.push(e.pop());return this.__data=r,this}},{key:"compress",value:function(){var t,n=[],r=H(this.__data);try{for(r.s();!(t=r.n()).done;){var e=t.value;if(3==e.type){var o=C[e.value];if(o.binocular&&n.length>1&&1==n[n.length-1].type&&1==n[n.length-2].type){var i=n.pop().value,u=n.pop().value;n.push({type:1,value:o.processor(u,i)})}else!o.binocular&&n.length>0&&1==n[n.length-1].type?n.push({type:1,value:o.processor(o.pop().value)}):n.push(e)}else n.push(e)}}catch(t){r.e(t)}finally{r.f()}return this.__data=n,this}},{key:"getRPN",value:function(){return this.__data.length?this.__data.map((function(t){return function(t){for(var n=1;n<arguments.length;n++){var r=null!=arguments[n]?arguments[n]:{};n%2?z(Object(r),!0).forEach((function(n){g(t,n,r[n])})):P()?Object.defineProperties(t,P()(r)):z(Object(r)).forEach((function(n){Object.defineProperty(t,n,T()(r,n))}))}return t}({},t)})):null}},{key:"setRPN",value:function(t){var n=this;if(!Array.isArray(t))throw new TypeError('Input must be an array with objects contains key "type" and "value"');if(!t.length)return this.__data=[],this;var r=[],e=0;if(t.forEach((function(t,o){var i,u;try{i=t.type,u=t.value}catch(t){throw new TypeError("Invalid RPN token at position ".concat(o))}if(2===i){if("string"!=typeof u||!u)throw new TypeError("Invalid RPN token at position ".concat(o));e++}else if(1===i){try{u=n.__numConv(u)}catch(t){throw new TypeError("Invalid number at position ".concat(o))}e++}else{if(3!==i)throw new TypeError("Invalid RPN token at position ".concat(o));var c=C[u];if(!c)throw new TypeError("Invalid operand at position ".concat(o));if(!c.binocular&&e<1||c.binocular&&e<2)throw new SyntaxError("Invalid RPN");c.binocular&&e--}r.push({type:i,value:u})})),1!=e)throw new SyntaxError("Invalid RPN");return this.__data=r,this}},{key:"calc",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};if(!this.__data.length)return null;var n,r=[],e=H(this.__data);try{for(e.s();!(n=e.n()).done;){var o=n.value;if(1!=o.type)if(2!=o.type){if(3==o.type){var i=C[o.value];if(i.binocular){var u=r.pop(),c=r.pop();r.push(i.processor(c,u))}else r.push(i.processor(r.pop()))}}else{if(!t.hasOwnProperty(o.value))throw new ReferenceError("Value of variable ".concat(o.value," not specified."));r.push(this.__numConv(t[o.value]))}else r.push(o.value)}}catch(t){e.e(t)}finally{e.f()}if(1!=r.length)throw new SyntaxError("Malformed RPN");return r[0]}}]),t}());g($,"TOKEN_NUM",1),g($,"TOKEN_VAR",2),g($,"TOKEN_OPER",3)}(),e.default}()}));