(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-fe1f682a"],{"1d2c":function(t,n,a){"use strict";a.r(n);var o=function(){var t=this,n=t.$createElement,o=t._self._c||n;return o("section",{staticClass:"my-download-page"},[t.wxOpen?o("section",{staticClass:"my-download-page__img-box",on:{click:function(n){t.wxOpen=!1}}}):t._e(),o("section",{staticClass:"my-download-page__bg-box"},[o("img",{staticClass:"my-download-page__bg-box--bg-img",attrs:{src:a("f9ac"),alt:"bg-group"}}),o("img",{staticClass:"my-download-page__bg-box--dl-qr",attrs:{src:a("f393"),alt:"dl_qr"}}),o("img",{staticClass:"my-download-page__bg-box--dl-text",attrs:{src:a("393b"),alt:"dl_text"}}),o("section",{staticClass:"my-download-page__bg-box--btn-area"},[o("section",{staticClass:"my-download-page__btn-area--box",on:{click:t.handleClick}},[t.isShowBtn?o("img",{attrs:{src:t.btnImgs[0],alt:"ios"},on:{click:t.handleClick}}):o("img",{attrs:{src:t.btnImgs[1],alt:"ios"},on:{click:t.handleClick}})])])])])},e=[],i=(a("4917"),a("7514"),a("bc3a")),s=a.n(i),r=["https://res.squrab.com/web/download/btn_ios.png","https://res.squrab.com/web/download/btn_android.png"],c={name:"MyDownload",data:function(){return{isShowBtn:1,btnImgs:r,reLoadUrl:"",wxOpen:!1}},methods:{getUserAgent:function(){var t=this;s()({method:"get",url:"https://asapi.squrab.com/api/app/url"}).then(function(n){var a=n.data.data,o=a.info,e=a.list;o.Mobile&&"ios"==o.Version.toLocaleLowerCase()?(t.isShowBtn=1,t.reLoadUrl=e.find(function(t){return 2==t.app_type}).download_path):o.Mobile&&"android"==o.Version.toLocaleLowerCase()&&(t.isShowBtn=0,t.reLoadUrl=e.find(function(t){return 1==t.app_type}).download_path)})},handleClick:function(){var t=window.navigator.userAgent.toLowerCase();"micromessenger"==t.match(/MicroMessenger/i)?this.wxOpen=!0:window.location.href=this.reLoadUrl}},created:function(){this.getUserAgent()},mixins:[]},l=c,d=(a("ae5f"),a("2877")),g=Object(d["a"])(l,o,e,!1,null,"2eaded0c",null);n["default"]=g.exports},"30b8":function(t,n,a){},"393b":function(t,n,a){t.exports=a.p+"static/img/dl_text.b0da262a.png"},4917:function(t,n,a){"use strict";var o=a("cb7c"),e=a("9def"),i=a("0390"),s=a("5f1b");a("214f")("match",1,function(t,n,a,r){return[function(a){var o=t(this),e=void 0==a?void 0:a[n];return void 0!==e?e.call(a,o):new RegExp(a)[n](String(o))},function(t){var n=r(a,t,this);if(n.done)return n.value;var c=o(t),l=String(this);if(!c.global)return s(c,l);var d=c.unicode;c.lastIndex=0;var g,u=[],p=0;while(null!==(g=s(c,l))){var b=String(g[0]);u[p]=b,""===b&&(c.lastIndex=i(l,e(c.lastIndex),d)),p++}return 0===p?null:u}]})},ae5f:function(t,n,a){"use strict";var o=a("30b8"),e=a.n(o);e.a},f393:function(t,n,a){t.exports=a.p+"static/img/dl_qr.11f043a1.png"},f9ac:function(t,n,a){t.exports=a.p+"static/img/bg_group.7e05f4ab.png"}}]);