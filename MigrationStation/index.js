(function(P,s,n,b,c,d,g,o,R,T,w,u,f){"use strict";const D=n.stylesheet.createThemedStyleSheet({icon:{marginRight:10,tintColor:d.semanticColors.HEADER_PRIMARY}});function $(a){let{asset:t,onPress:e}=a;return n.React.createElement(n.ReactNative.TouchableOpacity,{onPress:e},n.React.createElement(n.ReactNative.Image,{style:D.icon,source:c.getAssetIDByName(t)}))}const{launchImageLibrary:S}=b.findByProps("launchImageLibrary");b.findByProps("downloadMediaAsset");const k=function(){return new Promise(function(a,t){return S({mediaType:"any",maxWidth:0,maxHeight:0,videoQuality:"high",durationLimit:0,quality:1,cameraType:"back",includeBase64:!1,includeExtra:!0,saveToPhotos:!1,selectionLimit:1},async function(e){if(e.didCancel)return t("Backup selection cancelled");if(e.errorCode)return t(`Native error: ${e.errorCode}`);const i=await fetch(e.assets[0].uri);let r;try{r=await i.json()}catch{return t("Malformed backup file")}a(r)})})},p=g.createProxy([]).proxy,C=function(a,t){let e=arguments.length>2&&arguments[2]!==void 0?arguments[2]:"info";return p.push({source:a,message:t,type:e})},N=function(a){return function(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"info";return C(a,t,e)}},v=N("BackupManager"),A=function(){return{settings:T.settings,...w.identity?.features?.loaderConfig&&{loaderConfig:w.config}}};async function I(a){const t={};for(const e of Object.values(u.plugins))e.id!==s.id&&(t[e.id]={...e,...a&&{storage:await g.createMMKVBackend(e.id).get()??{}}},v(`Added ${e.manifest.name} to backup`));return t}function x(){const a={};for(const t of Object.values(f.themes))a[t.id]=t,v(`Added ${t.data.name} to backup`);return a}async function O(a){if(Object.keys(a).length===0)throw new Error("At least one option should be selected");if(a.pluginData&&!a.plugins)throw new Error("Plugin data cannot be backed up independently of plugins");v(`Starting backup with ${Object.keys(a).join(", ")}`);const t={};return a.vendetta&&(t.vendetta=A()),a.plugins&&(t.plugins=await I(a.pluginData)),a.themes&&(t.themes=x()),t}const l=N("RestoreManager");function j(a){for(const t of Object.keys(a.settings))T.settings[t]=a.settings[t],l(`Restored settings ${t} to ${a.settings[t]}`);if(a.loaderConfig)for(let t of Object.keys(a.loaderConfig))w.config[t]=a.loaderConfig[t],l(`Restored loader config ${t} to ${a.loaderConfig[t]}`)}async function F(a,t){for(const e of Object.values(a)){if(!u.plugins[e.id])await u.fetchPlugin(e.id).catch(function(){l(`Couldn't fetch ${e.manifest.name}, falling back to local`,"warn");try{u.plugins[e.id]={id:e.id,manifest:e.manifest,enabled:e.enabled,update:e.update,js:e.js}}catch(i){const r=`Failed to restore ${e.manifest.name}`;l(`${r}
${i}`,"error"),o.showToast(r,c.getAssetIDByName("Small"))}});else try{u.stopPlugin(e.id)}catch(i){const r=`Failed to stop ${e.manifest.name}`;l(`${r}
${i}`,"error"),o.showToast(r,c.getAssetIDByName("Small"))}e.storage&&t&&await g.createMMKVBackend(e.id).set(e.storage),e.enabled&&await u.startPlugin(e.id).catch(function(i){const r=`Failed to start ${e.manifest.name}`;l(`${r}
${i}`,"error"),o.showToast(r,c.getAssetIDByName("Small"))}),l(`Restored ${e.manifest.name}`)}}async function L(a){for(const t of Object.values(a))f.themes[t.id]||await f.fetchTheme(t.id).catch(function(){try{f.themes[t.id]={id:t.id,selected:t.selected,data:t.data}}catch(e){const i=`Failed to restore ${t.data.name}`;l(`${i}
${e}`,"error"),o.showToast(i,c.getAssetIDByName("Small"))}}),t.selected&&await f.selectTheme(t.id),l(`Restored${t.selected?" and selected ":" "}${t.data.name}`)}async function V(a,t){if(Object.keys(t).length===0)throw new Error("At least one option should be selected");if(t.pluginData&&!t.plugins)throw new Error("Plugin data cannot be restored independently of plugins");l(`Starting restore with ${Object.keys(t).join(", ")}`),t.vendetta&&a.vendetta&&j(a.vendetta),t.plugins&&a.plugins&&await F(a.plugins,t.pluginData),t.themes&&a.themes&&await L(a.themes)}const{FormRow:h,FormSwitchRow:_,FormSection:M,FormDivider:W}=R.Forms,m=[{label:"Vendetta",subLabel:"Whether to include Vendetta's settings",icon:"settings",setting:"includeVendetta"},{label:"Plugins",subLabel:"Whether to include installed plugins",icon:"debug",setting:"includePlugins"},{label:"Plugin Data",subLabel:"Whether to include the data of installed plugins",icon:"ic_rulebook",setting:"includePluginData",depends:"includePlugins"},{label:"Themes",subLabel:"Whether to include installed themes",icon:"ic_theme_24px",setting:"includeThemes"}];function H(){const[,a]=n.React.useReducer(function(e){return~e},0);g.useProxy(s.storage);const t=Object.values(s.storage).every(function(e){return!e});return n.React.createElement(n.ReactNative.ScrollView,{style:{flex:1},contentContainerStyle:{paddingBottom:38}},m.map(function(e,i){return n.React.createElement(n.React.Fragment,null,n.React.createElement(_,{label:e.label,subLabel:e.subLabel,leading:e.icon&&n.React.createElement(h.Icon,{source:c.getAssetIDByName(e.icon)}),disabled:s.storage[e.depends]===!1,value:s.storage[e.setting],onValueChange:function(r){e.action?.(r),s.storage[e.setting]=r,r===!1&&(m.filter(function(y){return y.depends===e.setting}).forEach(function(y){return s.storage[y.setting]=!1}),a())}}),i!==m.length-1&&n.React.createElement(W,null))}),n.React.createElement(M,{title:"Actions"},n.React.createElement(h,{label:"Backup",leading:n.React.createElement(h.Icon,{source:c.getAssetIDByName("share")}),disabled:t,onPress:async function(){const e=await O({vendetta:s.storage.includeVendetta,plugins:s.storage.includePlugins,pluginData:s.storage.includePluginData,themes:s.storage.includeThemes}).catch(function(i){return o.showToast("Failed to create backup",c.getAssetIDByName("Small"))});n.ReactNative.Share.share({message:JSON.stringify(e),title:`vd-ms-backup-${Date.now()}`})}}),n.React.createElement(h,{label:"Restore",leading:n.React.createElement(h.Icon,{source:c.getAssetIDByName("ic_download_24px")}),disabled:t,onPress:function(){return k().then(async function(e){await V(e,{vendetta:s.storage.includeVendetta,plugins:s.storage.includePlugins,pluginData:s.storage.includePluginData,themes:s.storage.includeThemes}),o.showToast("Restored backup successfully.",c.getAssetIDByName("Check"))}).catch(function(e){return o.showToast(e,c.getAssetIDByName("Small"))})}})))}const{FormRow:B}=R.Forms;function K(){return n.React.createElement(n.ReactNative.ScrollView,{style:{flex:1},contentContainerStyle:{paddingBottom:38}},n.React.createElement(B,{label:"Prox-ify plugins",subLabel:"This will move any installed plugins that are on the plugin proxy to their proxied versions.",leading:n.React.createElement(B.Icon,{source:c.getAssetIDByName("ic_globe_24px")}),onPress:function(){return o.showToast("Soon\u2122")}}))}const Y=n.stylesheet.createThemedStyleSheet({log:{fontSize:12,fontFamily:n.constants.Fonts.CODE_SEMIBOLD,color:d.semanticColors.TEXT_NORMAL}});function q(){const[a,t]=n.React.useState("");return g.useProxy(p),n.React.createElement(n.ReactNative.View,{style:{flex:1}},n.React.createElement(R.Search,{style:{margin:10},onChangeText:function(e){return t(e)},placeholder:"Filter"}),n.React.createElement(n.ReactNative.FlatList,{data:p.filter(function(e){return Object.values(e).some(function(i){return i.toLowerCase().includes(a)})}),renderItem:function(e){let{item:i}=e;const r=i.type==="info"?d.rawColors.BRAND_360:i.type==="warn"?d.rawColors.YELLOW_360:d.rawColors.RED_360;return n.React.createElement(n.ReactNative.Text,{style:Y.log},n.React.createElement(n.ReactNative.Text,{style:{color:r}},"[",i.source,"]: "),i.message)},initialNumToRender:50}))}const{BadgableTabBar:z}=b.findByProps("BadgableTabBar"),E=[{id:"backup_restore",title:"Backup and Restore",render:H},{id:"tools",title:"Tools",render:K}];function J(){const a=n.NavigationNative.useNavigation(),[t,e]=n.React.useState(E[0]);return a.setOptions({headerRight:function(){return n.React.createElement($,{asset:"debug",onPress:function(){return a.push("VendettaCustomPage",{title:"MigrationStation Logs",render:q})}})}}),n.React.createElement(n.ReactNative.View,{style:{flex:1}},n.React.createElement(n.ReactNative.View,{style:{margin:10}},n.React.createElement(z,{tabs:E,activeTab:t.id,onTabSelected:function(i){const r=E.find(function(y){return y.id===i});r&&(r.onPress?.(r.id),r.render&&e(r))}})),n.React.createElement(t.render,null))}return s.storage.includeVendetta??=!0,s.storage.includePlugins??=!0,s.storage.includePluginData??=!0,s.storage.includeThemes??=!0,P.settings=J,P})({},vendetta.plugin,vendetta.metro.common,vendetta.metro,vendetta.ui.assets,vendetta.ui,vendetta.storage,vendetta.ui.toasts,vendetta.ui.components,vendetta,vendetta.loader,vendetta.plugins,vendetta.themes);