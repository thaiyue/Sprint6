(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{11:function(e,t,a){e.exports=a(26)},22:function(e,t,a){},24:function(e,t,a){},26:function(e,t,a){"use strict";a.r(t);var c=a(0),n=a.n(c),r=a(9),s=a.n(r),i=a(1),o=a(2),l=a(4),h=a(3),u=a(5),m=a(10),p=(a(22),function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(l.a)(this,Object(h.a)(t).call(this))).state=Object(m.a)({},e),a}return Object(u.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return n.a.createElement("div",{className:"singleLetterComponent"},n.a.createElement("div",{className:"characterImage"},n.a.createElement("img",{src:"".concat(this.props.characters[0].thumbnail.path,".").concat(this.props.characters[0].thumbnail.extension)}),n.a.createElement("h2",null,"G is for ",this.props.characters[0].name)))}}]),t}(c.Component)),b="https://gateway.marvel.com:443/v1/public/characters/1009313?apikey=9e51a696b1806dcbcd5554c3c5e838e4",d=function(e){function t(){var e,a;Object(i.a)(this,t);for(var c=arguments.length,n=new Array(c),r=0;r<c;r++)n[r]=arguments[r];return(a=Object(l.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(n)))).state={characters:[]},a.getCharacters=function(){fetch(b).then(function(e){return e.json()}).then(function(e){a.setState({characters:e.data.results}),console.log(e)})},a}return Object(u.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){this.getCharacters()}},{key:"render",value:function(){return console.log(this.state.characters),this.state.characters.length>0?n.a.createElement("div",{className:"abcList"},n.a.createElement("div",{className:"cardContainer"},n.a.createElement(p,{characters:this.state.characters}),n.a.createElement(p,{characters:this.state.characters}))):n.a.createElement("div",{className:"abcList"},n.a.createElement("p",null,"loading"))}}]),t}(c.Component),f=function(e){function t(){return Object(i.a)(this,t),Object(l.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return n.a.createElement("div",{className:"app"},n.a.createElement(d,null))}}]),t}(c.Component);a(24);s.a.render(n.a.createElement(f,null),document.getElementById("root"))}},[[11,2,1]]]);
//# sourceMappingURL=main.59f8de64.chunk.js.map