(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{UIBY:function(e,t,i){"use strict";i.r(t),i.d(t,"ChildProfileRoutesModule",(function(){return f}));var r=i("tyNb"),n=i("3Pt+"),a=i("PSD3"),c=i.n(a),o=i("fXoL"),b=i("on2l"),l=i("YJqY"),s=i("ofXK");function u(e,t){if(1&e&&o.Jb(0,"img",29),2&e){const e=o.Ub();o.Yb("src",e.usuario.imagenUrl,o.fc)}}function m(e,t){if(1&e&&o.Jb(0,"img",29),2&e){const e=o.Ub();o.Yb("src",e.imgTemp,o.fc)}}let d=(()=>{class e{constructor(e,t,i){this.formBuilder=e,this.usuarioService=t,this.fileUploadsService=i,this.imgTemp=null,this.usuario=t.usuario}ngOnInit(){this.profileForm=this.formBuilder.group({nombre:["",n.o.required],email:[this.usuario.email,[n.o.required,n.o.email]],role:[this.usuario.role]})}actualizarPerfil(){this.usuarioService.actualizarPerfil(this.profileForm.value).subscribe(e=>{const{nombre:t,email:i}=this.profileForm.value;this.usuario.nombre=t,this.usuario.email=i,c.a.fire({position:"center",icon:"success",title:"Perfect",text:"Changes save successed!",showConfirmButton:!1,timer:1750})},e=>{c.a.fire({position:"center",icon:"error",title:"Oh no...",text:e.error.msg,showConfirmButton:!1,timer:1750}),console.log(e)})}subirImagen(e){if(this.imagenSubir=e,!e)return this.imgTemp=null;const t=new FileReader;t.readAsDataURL(e),t.onloadend=()=>{this.imgTemp=t.result}}hayImagen(){const e=this.imagenSubir.name;return""===e?"there is no image...":e}uploadAvatar(){this.fileUploadsService.actualizarImagen(this.imagenSubir,"users",this.usuario.userID).then(e=>{this.usuario.img=e,c.a.fire({position:"center",icon:"success",title:"Perfect",text:"Avatar save successed!",showConfirmButton:!1,timer:1750})}).catch(e=>{c.a.fire({position:"center",icon:"error",title:"Oh no...",text:"Try Again Later :)",showConfirmButton:!1,timer:1750})})}}return e.\u0275fac=function(t){return new(t||e)(o.Ib(n.c),o.Ib(b.a),o.Ib(l.a))},e.\u0275cmp=o.Cb({type:e,selectors:[["app-profile"]],decls:51,vars:8,consts:[[1,"row"],[1,"col-lg-6"],[1,"card"],[1,"card-body"],[1,"card-title"],[1,"card-subtitle"],[2,"max-width","90%"],[1,"form",3,"formGroup","submit"],[1,"form-group"],["for","exampleInputuname"],[1,"input-group"],[1,"input-group-addon"],[1,"ti-user"],["type","text","id","exampleInputuname","formControlName","nombre",1,"form-control",3,"placeholder"],["for","exampleInputEmail1"],[1,"ti-email"],["type","email","id","exampleInutEmail1","formControlName","email",1,"form-control",3,"placeholder","readOnly"],[1,"text-right"],["type","submit",1,"btn","btn-success","waves-effect","waves-light","m-r-10",3,"disabled"],[1,"fa","fa-save"],[2,"padding-left","12px"],[1,"text-right",2,"max-width","90%"],["class","avatar",3,"src",4,"ngIf"],[1,"col","text-center",2,"padding-right","5px","align-items","center"],[2,"justify-items","center"],["for","files",1,"files"],["src","../../../assets/icons/search.svg",1,"icon"],["type","file","id","files",2,"display","none",3,"change"],["type","button",1,"btn","btn-success","waves-effect","waves-light","m-r-10",3,"disabled","click"],[1,"avatar",3,"src"]],template:function(e,t){1&e&&(o.Lb(0,"div",0),o.Lb(1,"div",1),o.Lb(2,"div",2),o.Lb(3,"div",3),o.Lb(4,"h4",4),o.jc(5,"My Profile"),o.Kb(),o.Lb(6,"h6",5),o.jc(7,"Settings"),o.Kb(),o.Jb(8,"hr",6),o.Lb(9,"form",7),o.Sb("submit",(function(){return t.actualizarPerfil()})),o.Lb(10,"div",8),o.Lb(11,"label",9),o.jc(12,"User"),o.Kb(),o.Lb(13,"div",10),o.Lb(14,"div",11),o.Jb(15,"i",12),o.Kb(),o.Jb(16,"input",13),o.Kb(),o.Kb(),o.Lb(17,"div",8),o.Lb(18,"label",14),o.jc(19,"Email address"),o.Kb(),o.Lb(20,"div",10),o.Lb(21,"div",11),o.Jb(22,"i",15),o.Kb(),o.Jb(23,"input",16),o.Kb(),o.Kb(),o.Lb(24,"div",17),o.Lb(25,"button",18),o.Jb(26,"i",19),o.Lb(27,"span",20),o.jc(28,"Change settings"),o.Kb(),o.Kb(),o.Kb(),o.Kb(),o.Kb(),o.Kb(),o.Kb(),o.Lb(29,"div",1),o.Lb(30,"div",2),o.Lb(31,"div",3),o.Lb(32,"h4",4),o.jc(33,"Avatar Profile"),o.Kb(),o.Lb(34,"h6",5),o.jc(35,"Image:"),o.Kb(),o.Jb(36,"hr",21),o.ic(37,u,1,1,"img",22),o.ic(38,m,1,1,"img",22),o.Jb(39,"br"),o.Lb(40,"div",0),o.Lb(41,"div",23),o.Lb(42,"div",24),o.Lb(43,"label",25),o.Jb(44,"img",26),o.jc(45," Select file "),o.Kb(),o.Lb(46,"input",27),o.Sb("change",(function(e){return t.subirImagen(e.target.files[0])})),o.Kb(),o.Lb(47,"button",28),o.Sb("click",(function(){return t.uploadAvatar()})),o.Jb(48,"i",19),o.Lb(49,"span",20),o.jc(50,"Upload image"),o.Kb(),o.Kb(),o.Kb(),o.Kb(),o.Kb(),o.Kb(),o.Kb(),o.Kb(),o.Kb()),2&e&&(o.xb(9),o.Yb("formGroup",t.profileForm),o.xb(7),o.Zb("placeholder",t.usuario.nombre),o.xb(7),o.Zb("placeholder",t.usuario.email),o.Yb("readOnly",t.usuario.google),o.xb(2),o.Yb("disabled",t.profileForm.invalid),o.xb(12),o.Yb("ngIf",!t.imgTemp),o.xb(1),o.Yb("ngIf",t.imgTemp),o.xb(9),o.Yb("disabled",!t.imagenSubir))},directives:[n.q,n.h,n.e,n.b,n.g,n.d,s.j],styles:["#files[_ngcontent-%COMP%], .files[_ngcontent-%COMP%]{background-color:#dcdcdc}.files[_ngcontent-%COMP%]{display:inline;align-items:center;margin-right:10px;padding:.55rem .75rem;border-radius:.25rem;font-weight:400;cursor:pointer;transition:.15s ease}.files[_ngcontent-%COMP%]:hover{background-color:rgba(0,194,184,.64);color:#fff;font-weight:400}.files[_ngcontent-%COMP%]:active{background-color:rgba(5,170,162,.74)}.icon[_ngcontent-%COMP%]{max-width:15px;margin-right:10px;margin-bottom:2px}.imagenSeleccionada[_ngcontent-%COMP%]{background-color:rgba(255,206,133,.25);padding:10px;margin:20px;border-radius:.25rem;text-align:center;color:hsla(0,0%,49.4%,.5);font-weight:400}.imagenSeleccionada[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{padding:0;margin:0}.imagenSeleccionada[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{font-weight:600;color:rgba(0,0,0,.5)}.avatar[_ngcontent-%COMP%]{display:flex;margin:auto;width:300px;border-radius:20px}"]}),e})();var h=i("6nr9");const g=[{path:"profile",component:d,data:{titulo:"User Profile"}},{path:"accountSettings",component:(()=>{class e{constructor(e){this.settingsServices=e}ngOnInit(){this.settingsServices.checkCurrentTheme()}changeTheme(e){this.settingsServices.changeTheme(e)}}return e.\u0275fac=function(t){return new(t||e)(o.Ib(h.a))},e.\u0275cmp=o.Cb({type:e,selectors:[["app-account-settings"]],decls:52,vars:0,consts:[[1,"row"],[1,"col-5"],[1,"card"],[1,"card-body"],[1,"r-panel-body"],["id","themecolors",1,"m-t-20"],["data-theme","default",1,"selector","default-theme",3,"click"],["data-theme","green",1,"selector","green-theme",3,"click"],["data-theme","red",1,"selector","red-theme",3,"click"],["data-theme","blue",1,"selector","blue-theme",3,"click"],["data-theme","purple",1,"selector","purple-theme",3,"click"],["data-theme","megna",1,"selector","megna-theme",3,"click"],[1,"d-block","m-t-30"],["data-theme","default-dark",1,"selector","default-dark-theme",3,"click"],["data-theme","green-dark",1,"selector","green-dark-theme",3,"click"],["data-theme","red-dark",1,"selector","red-dark-theme",3,"click"],["data-theme","blue-dark",1,"selector","blue-dark-theme","working",3,"click"],["data-theme","purple-dark",1,"selector","purple-dark-theme",3,"click"],["data-theme","megna-dark",1,"selector","megna-dark-theme",3,"click"]],template:function(e,t){1&e&&(o.Lb(0,"div",0),o.Lb(1,"div",1),o.Lb(2,"div",2),o.Lb(3,"div",3),o.Lb(4,"h4"),o.Lb(5,"b"),o.jc(6,"Selecciona un tema:"),o.Kb(),o.Kb(),o.Jb(7,"hr"),o.Lb(8,"div",4),o.Lb(9,"ul",5),o.Lb(10,"li"),o.Lb(11,"b"),o.jc(12,"Light Theme"),o.Kb(),o.Kb(),o.Lb(13,"li"),o.Lb(14,"a",6),o.Sb("click",(function(){return t.changeTheme("default")})),o.jc(15,"1"),o.Kb(),o.Kb(),o.Lb(16,"li"),o.Lb(17,"a",7),o.Sb("click",(function(){return t.changeTheme("green")})),o.jc(18,"2"),o.Kb(),o.Kb(),o.Lb(19,"li"),o.Lb(20,"a",8),o.Sb("click",(function(){return t.changeTheme("red")})),o.jc(21,"3"),o.Kb(),o.Kb(),o.Lb(22,"li"),o.Lb(23,"a",9),o.Sb("click",(function(){return t.changeTheme("blue")})),o.jc(24,"4"),o.Kb(),o.Kb(),o.Lb(25,"li"),o.Lb(26,"a",10),o.Sb("click",(function(){return t.changeTheme("purple")})),o.jc(27,"5"),o.Kb(),o.Kb(),o.Lb(28,"li"),o.Lb(29,"a",11),o.Sb("click",(function(){return t.changeTheme("megna")})),o.jc(30,"6"),o.Kb(),o.Kb(),o.Lb(31,"li",12),o.Lb(32,"b"),o.jc(33,"Dark Theme"),o.Kb(),o.Kb(),o.Lb(34,"li"),o.Lb(35,"a",13),o.Sb("click",(function(){return t.changeTheme("default-dark")})),o.jc(36,"7"),o.Kb(),o.Kb(),o.Lb(37,"li"),o.Lb(38,"a",14),o.Sb("click",(function(){return t.changeTheme("green-dark")})),o.jc(39,"8"),o.Kb(),o.Kb(),o.Lb(40,"li"),o.Lb(41,"a",15),o.Sb("click",(function(){return t.changeTheme("red-dark")})),o.jc(42,"9"),o.Kb(),o.Kb(),o.Lb(43,"li"),o.Lb(44,"a",16),o.Sb("click",(function(){return t.changeTheme("blue-dark")})),o.jc(45,"10"),o.Kb(),o.Kb(),o.Lb(46,"li"),o.Lb(47,"a",17),o.Sb("click",(function(){return t.changeTheme("purple-dark")})),o.jc(48,"11"),o.Kb(),o.Kb(),o.Lb(49,"li"),o.Lb(50,"a",18),o.Sb("click",(function(){return t.changeTheme("megna-dark")})),o.jc(51,"12"),o.Kb(),o.Kb(),o.Kb(),o.Kb(),o.Kb(),o.Kb(),o.Kb(),o.Kb())},encapsulation:2}),e})(),data:{titulo:"Account Settings"}}];let f=(()=>{class e{}return e.\u0275mod=o.Gb({type:e}),e.\u0275inj=o.Fb({factory:function(t){return new(t||e)},imports:[[r.g.forChild(g)],r.g]}),e})()}}]);