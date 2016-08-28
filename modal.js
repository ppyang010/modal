!function(){
//公有方法
//
//

 // 将HTML转换为节点
  function html2node(str){
    var container=document.createElement('div');
    container.innerHtml=str;
    return container.children[0];
  }

 // 赋值属性
  // extend({a:1}, {b:1, a:2}) -> {a:1, b:1}
function extend(o1,o2){
	for(var i in o2){
		if(o1[i]==='undefinded'){
			o1[i]=o2[i];
		}
	}
	return o1;
}

//模板
var template='
<div class="modal" style="display: block">
		<div class="modal-wrap">
			<div class="modal-head">标题</div>
			<div class="modal-body">主要内容</div>
			<div class="modal-foot">
				<a class="confirm" href="#">确认</a>
				<a class="cancel" href="#">取消</a>
			</div>
		</div>
	</div>
';

var modal=function(options){
	options=options||{};
	//节点
	this.container=this._layout.cloneNode(true);
	//主要内容
	this.body=this.container.querySelector('.modal-body');

	//窗口
	this.wrap=this.container.querySelector('.modal-wrap');

}


extend(modal.prototype,{
	_layout:html2node(template)
});

















}()


