(this["webpackJsonpgoit-react-hw-03-image-finder"]=this["webpackJsonpgoit-react-hw-03-image-finder"]||[]).push([[0],{73:function(e,t,a){},74:function(e,t,a){"use strict";a.r(t);var r=a(0),n=a.n(r),s=a(12),c=a.n(s),i=a(4),o=a(5),u=a(7),h=a(6),l=a(8),p=a(26),m=a(1),b=function(e){Object(u.a)(a,e);var t=Object(h.a)(a);function a(){var e;Object(i.a)(this,a);for(var r=arguments.length,n=new Array(r),s=0;s<r;s++)n[s]=arguments[s];return(e=t.call.apply(t,[this].concat(n))).state={query:""},e.handleChange=function(t){var a=t.target.value;e.setState({query:a})},e.handleSubmit=function(t){t.preventDefault();var a=e.state.query;if(!a.trim())return l.b.warn("Please enter your search query and try again!");e.props.onSubmit(a.toLowerCase()),e.reset()},e.reset=function(){e.setState({query:""})},e}return Object(o.a)(a,[{key:"shouldComponentUpdate",value:function(e,t){return t.query!==this.state.query}},{key:"render",value:function(){var e=this.state.query;return Object(m.jsx)("header",{className:"Searchbar",children:Object(m.jsxs)("form",{className:"SearchForm",onSubmit:this.handleSubmit,children:[Object(m.jsx)("button",{type:"submit",className:"SearchForm-button","aria-label":"Search images",children:Object(m.jsx)(p.a,{style:{width:22,height:22}})}),Object(m.jsx)("input",{className:"SearchForm-input",type:"text",name:"searchQuery",value:e,autoComplete:"off",autoFocus:!0,placeholder:"Search images and photos",onChange:this.handleChange})]})})}}]),a}(r.Component),g=a(9),f=a.n(g),j=a(13),d=a(16),y=a(25),v=a.n(y),O=function(e){Object(u.a)(a,e);var t=Object(h.a)(a);function a(){return Object(i.a)(this,a),t.apply(this,arguments)}return Object(o.a)(a,[{key:"render",value:function(){var e=this.props.images;return Object(m.jsx)("ul",{className:"ImageGallery",children:e.map((function(e){var t=e.id,a=e.webformatURL,r=e.largeImageURL,n=e.tags;return Object(m.jsx)("li",{className:"ImageGalleryItem",children:Object(m.jsx)("img",{className:"ImageGalleryItem-image",src:a,"data-src":r,alt:n})},t)}))})}}]),a}(r.Component),S=function(e){var t=e.onClick;return Object(m.jsx)("button",{className:"Button",type:"button",onClick:t,children:"Load more"})},w=a(14),x=a.n(w);x.a.defaults.baseURL="https://pixabay.com/api",x.a.defaults.params={key:"22909528-f64cd92665831d6faf8601377",image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:12};var k=function(){var e=Object(j.a)(f.a.mark((function e(t){var a,r,n,s;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.query,r=t.page,e.next=3,x()("?".concat(new URLSearchParams({q:a,page:r}).toString()));case 3:return n=e.sent,s=n.data,e.abrupt("return",s);case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),q="idle",C="pending",I="rejected",N="resolved",F=function(e){Object(u.a)(a,e);var t=Object(h.a)(a);function a(){var e;Object(i.a)(this,a);for(var r=arguments.length,n=new Array(r),s=0;s<r;s++)n[s]=arguments[s];return(e=t.call.apply(t,[this].concat(n))).state={images:[],status:q},e.resetImages=function(){e.setState({images:[]})},e.addImages=function(t){e.setState((function(e){var a=e.images;return{images:[].concat(Object(d.a)(a),Object(d.a)(t))}}))},e.switchStatus=function(t){e.setState({status:t})},e}return Object(o.a)(a,[{key:"getSnapshotBeforeUpdate",value:function(e,t){return window.scrollY}},{key:"componentDidUpdate",value:function(){var e=Object(j.a)(f.a.mark((function e(t,a,r){var n,s,c,i,o,u,h,p;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n=this.props,s=n.query,c=n.page,i=s===t.query,o=c===t.page,!i||!o){e.next=5;break}return e.abrupt("return");case 5:return this.switchStatus(C),e.prev=6,e.next=9,k({query:s,page:c});case 9:if(u=e.sent,(h=u.hits).length){e.next=14;break}return this.switchStatus(q),e.abrupt("return",l.b.warn("Sorry, there are no images matching your search query!"));case 14:i||this.resetImages(),this.addImages(h),this.switchStatus(N),c>1&&this.scrollBottom(r),e.next=25;break;case 20:e.prev=20,e.t0=e.catch(6),p=e.t0.message,this.switchStatus(I),l.b.error(p);case 25:case"end":return e.stop()}}),e,this,[[6,20]])})));return function(t,a,r){return e.apply(this,arguments)}}()},{key:"scrollBottom",value:function(e){window.scrollTo({top:window.outerHeight+e,behavior:"smooth"})}},{key:"render",value:function(){var e=this.props.incrementPage,t=this.state,a=t.images,r=t.status;return console.log(r),Object(m.jsxs)(m.Fragment,{children:[Object(m.jsx)(O,{images:a}),r===C&&Object(m.jsx)(v.a,{type:"Puff",color:"#00BFFF",height:100,width:100,timeout:3e3}),r===N&&Object(m.jsx)(S,{onClick:e})]})}}]),a}(r.Component),P=function(e){Object(u.a)(a,e);var t=Object(h.a)(a);function a(){var e;Object(i.a)(this,a);for(var r=arguments.length,n=new Array(r),s=0;s<r;s++)n[s]=arguments[s];return(e=t.call.apply(t,[this].concat(n))).state={query:"",page:1},e.handleSubmit=function(t){e.setState({query:t,page:1})},e.incrementPage=function(){e.setState((function(e){return{page:e.page+1}}))},e}return Object(o.a)(a,[{key:"render",value:function(){var e=this.state,t=e.query,a=e.page;return Object(m.jsxs)("div",{className:"App",children:[Object(m.jsx)(b,{onSubmit:this.handleSubmit}),Object(m.jsx)(F,{query:t,page:a,incrementPage:this.incrementPage}),Object(m.jsx)(l.a,{autoClose:3e3})]})}}]),a}(r.Component),U=P;a(71),a(72),a(73);c.a.render(Object(m.jsx)(n.a.StrictMode,{children:Object(m.jsx)(U,{})}),document.getElementById("root"))}},[[74,1,2]]]);
//# sourceMappingURL=main.b9256969.chunk.js.map