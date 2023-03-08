(function(c,r,n,v,g,y,f,s,o,m){"use strict";const{FormRow:l}=o.Forms;function w(e){let{plugin:t}=e;const a=s.getSettings(t.id),i=n.NavigationNative.useNavigation();return React.createElement(l,{label:t.manifest.name,leading:React.createElement(l.Icon,{source:m.getAssetIDByName(t.manifest.vendetta?.icon??"ic_application_command_24px")}),trailing:l.Arrow,onPress:function(){return i.push("VendettaCustomPage",{title:t.manifest.name,render:a})}})}const{FormSection:P,FormDivider:S}=o.Forms;function F(){f.useProxy(r.storage);const e=Object.keys(r.storage.pinnedPlugins),t=window.hasOwnProperty("enmity")||window.hasOwnProperty("Aliucord");if(e.length===0)return null;const a=e.map(function(i,u){return React.createElement(React.Fragment,null,React.createElement(w,{plugin:s.plugins[i]}),u!==e.length-1&&React.createElement(S,null))});return r.storage.appendExisting?React.createElement(React.Fragment,null,a):React.createElement(P,{key:"PinSettingsPlugins",title:`${t?"Vendetta ":""}Plugins`},a)}const h=v.findByDisplayName("UserSettingsOverviewWrapper",!1);function I(){const e=new Array,t=g.after("default",h,function(a,i){const u=y.findInReactTree(i.props.children,function(d){return d.type&&d.type.name==="UserSettingsOverview"});e.push(g.after("render",u.type.prototype,function(d,M){let{props:{children:R}}=M;const U=[n.i18n.Messages.BILLING_SETTINGS,n.i18n.Messages.PREMIUM_SETTINGS],E=R.findIndex(function(V){return U.includes(V.props.title)});R.splice(E===-1?4:E,0,React.createElement(F,null))})),t()});return function(){return e.forEach(function(a){return a()})}}const{FormRow:N,FormRadioRow:b}=o.Forms;function x(e){let{name:t,id:a}=e;const i=r.storage.pinnedPlugins[a];return React.createElement(b,{label:t,trailing:N.Arrow,selected:i,onPress:function(){i?delete r.storage.pinnedPlugins[a]:r.storage.pinnedPlugins[a]=!0}})}const{FormRow:_,FormSection:p,FormSwitchRow:A,FormDivider:O}=o.Forms;function T(){return f.useProxy(r.storage),n.React.createElement(n.ReactNative.ScrollView,{style:{flex:1},contentContainerStyle:{paddingBottom:38}},n.React.createElement(p,{title:"Options",titleStyleType:"no_border"},n.React.createElement(A,{label:"Append to Vendetta section",subLabel:"May be incompatible with other client mods.",leading:n.React.createElement(_.Icon,{source:m.getAssetIDByName("ic_edit_24px")}),value:r.storage.appendExisting,onValueChange:function(e){r.storage.appendExisting=e}})),n.React.createElement(p,{title:"Plugins"},n.React.createElement(n.ReactNative.FlatList,{data:Object.values(s.plugins).filter(function(e){return s.getSettings(e.id)}),ItemSeparatorComponent:O,renderItem:function(e){let{item:t}=e;return n.React.createElement(x,{name:t.manifest.name,id:t.id})}})))}r.storage.pinnedPlugins??={},r.storage.appendExisting??=!1;const B=[I()],D=function(){return B.forEach(function(e){return e()})};return c.onUnload=D,c.settings=T,c})({},vendetta.plugin,vendetta.metro.common,vendetta.metro,vendetta.patcher,vendetta.utils,vendetta.storage,vendetta.plugins,vendetta.ui.components,vendetta.ui.assets);
