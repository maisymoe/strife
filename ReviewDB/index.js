(function(t,e,a,c,i,r,s){"use strict";const l="https://discord.com/api/v9/oauth2/authorize?client_id=915703782174752809&response_type=code&redirect_uri=https%3A%2F%2Fmanti.vendicated.dev%2FURauth&scope=identify",{FormSection:d,FormRow:n,FormInput:m}=s.Forms,{openDeeplink:u}=c.findByProps("openDeeplink");var h=()=>(i.useProxy(e.storage),React.createElement(a.ReactNative.ScrollView,{style:{flex:1},contentContainerStyle:{paddingBottom:38}},React.createElement(d,{title:"Authentication",titleStyleType:"no_border"},React.createElement(m,{value:e.storage.authToken,onChange:o=>e.storage.authToken=o,placeholder:"dQw4w9WgXcQ",title:"TOKEN"}),React.createElement(n,{label:"Authenticate with ReviewDB",subLabel:"This will open the OAuth2 page. Copy the token you are given, and paste it above.",leading:React.createElement(n.Icon,{source:r.getAssetIDByName("copy")}),trailing:n.Arrow,onPress:()=>u(l)}))));e.storage.authToken??="";const p=[],v=()=>p.forEach(o=>o());return t.onUnload=v,t.settings=h,t})({},vendetta.plugin,vendetta.metro.common,vendetta.metro,vendetta.storage,vendetta.ui.assets,vendetta.ui.components);
