var emitter={
    //注册事件
    on:function(event,fn){
      var handles=this._handles||(this._handles={}),
      calls=handles[event]||(handles[event]=[]);

      //入栈
      calls.push(fn);
      return this;
    },
    // 解绑事件
    off:function (event,fn) {
      if(!event||!this._handles) this._handles={};
      if(!this._handles) return;

      var handles=this._handles,calls;

      if(calls=handles[event]){
        //不带回调参数 进行清空
        if(!fn){
          handles[event]=[];
          return this;
        }

        //找到并移除
        for (var i=0,len=calls.length;i<len;i++){
          if(fn===calls[i]){
            calls.splice(i,1);
            return this;
          }
        }
      }
    },
    //触发指定事件
    emit:function (event) {
      var args=[].slice.call(arguments,1),
      handles=this._handles,calls;

      if(!handles || !(calls=handles[event]) ) return this;

      //触发所有对应明智的listeners
      for(var i=0,len=calls.length;i<len;i++){
        calls[i].apply(this);
      }
      return this;


    }

}


!function(){
//公有方法
//
//

 // 将HTML转换为节点
   function html2node(str){
     var container = document.createElement('div');
     container.innerHTML = str;
     console.dir(container.children[0]);
     return container.children[0];
   }

 // 赋值属性
  // extend({a:1}, {b:1, a:2}) -> {a:1, b:1}
function extend(o1,o2){
	for(var i in o2){
		if(typeof o1[i]==='undefined'){
			o1[i]=o2[i];
		}
	}
	return o1;
}



//模板
var template=
'<div class="modal" style="display: block">\
		<div class="modal-wrap animated">\
			<div class="modal-head">标题</div>\
			<div class="modal-body">主要内容</div>\
			<div class="modal-foot">\
				<a class="confirm" href="#">确认</a>\
				<a class="cancel" href="#">取消</a>\
			</div>\
		</div>\
	</div>';


function Modal(options){
	this.options=options||{};
  console.dir(this._layout);
	//节点
	this.container=this._layout.cloneNode(true);//cloneNode方法拷贝节点并返回
	//主要内容
	this.body=this.container.querySelector('.modal-body');
  //标题
  this.title=this.container.querySelector('.modal-head')
	//整个窗口
	this.wrap=this.container.querySelector('.modal-wrap');


  // 将options 复制到 组件实例上  同this.xx=options.xx  
  extend(this, options);

  this._initEvent();
}


extend(Modal.prototype,{
  _layout:html2node(template),
  setContent:function(content,title){

    if(!!title){
      this.title.innerHTML=title;
    }
    if(!!content){
      if(content.nodeType===1){
        this.body.innerHTML=0;
        this.body.appendChild(content);
      }else{
        this.body.innerHTML=content;
      }
    }

  },
  //显示弹窗
  show:function(content,title){
    this.setContent(content,title);
    document.body.appendChild(this.container);
    animateClass(this.wrap, this.animation.enter);
  },
  //隐藏弹窗
  hide:function(){
    //document.body.removeChild(this.container);
    var container=this.container;//如果this要作为回调函数中使用 进行本地化

    animateClass(this.wrap, this.animation.leave, function(){
      document.body.removeChild(container);
    })
  },
  _initEvent:function() {
    console.log(this);//modal

    //要保证Modal对象调用了_onConfirm方法

    //不可用
    // this.container.querySelector('.confirm').addEventListener('click',function(){
    //   console.log(this);//这里的this是执行时的dom  <a>
    //   this._onConfirm();
    // });

    // this.container.querySelector('.confirm').addEventListener('click',function(){
    //   modal._onConfirm () //这种方式不够通用  如果创建的对象名发生变化就不可用
    // });

    //推荐方式1  可以更简洁
    var fun=this._onConfirm.bind(this);
    this.container.querySelector('.confirm').addEventListener('click',fun);

    //推荐方式2
    this.container.querySelector('.cancel').addEventListener('click',this._onCancel.bind(this));
  },

  _onConfirm:function () {
    console.log(this);
    this.emit('confirm');
    this.hide();
  },

  _onCancel:function () {
    this.emit('cancel');
    this.hide();
  }




});


extend(Modal.prototype,emitter);

console.dir(Modal);
window.Modal=Modal;
















}();
