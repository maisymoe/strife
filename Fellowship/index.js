(function(i,b,u){"use strict";const f=function(r){return u.logger.warn(`Tried to call ${r}, not implemented!`)};function c(r,e,o){var n=this;switch(r){case"before":return function(t){return e(n,t,o)};case"instead":return function(t,a){return e(n,t,a)};case"after":return function(t,a){return e(n,t,a)}}}const l=function(r,e,o,n,t){return u.patcher.before(o,e,c("before",n,e?.[o]),t)},s=function(r,e,o,n,t){return u.patcher.instead(o,e,c("before",n),t)},h=function(r,e,o,n,t){return u.patcher.after(o,e,c("after",n),t)};var g=Object.freeze({__proto__:null,after:h,before:l,create:function(){return{getPatchesByCaller:function(){return f("getPatchesByCaller")},before:l,instead:s,after:h,unpatchAll:function(){return f("unpatchAll")}}},instead:s});function p(){return globalThis.enmity={patcher:g},function(){return delete globalThis.enmity}}b.storage.plugins??={};const d=[p()],m=function(){return d.forEach(function(r){return r()})};return i.onUnload=m,i})({},vendetta.plugin,vendetta);
