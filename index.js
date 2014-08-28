var offsetTop = function (e){
  var offset = e.offsetTop;
  if(e.offsetParent !== null) offset += offsetTop(e.offsetParent);
  return offset;
};

var offsetLeft = function (e){
  var offset = e.offsetLeft;
  if(e.offsetParent !== null) offset += offsetLeft(e.offsetParent);
  return offset;
};

var Vue = require("vue");

var Pool = Vue.extend({
    tagName: "span",
    className: "water"
});

var render = function(el) {
  var ff = new Vue({
    el: el,
    template: require("./template.html"),
    methods: {
      onClick: function(e) {
        var parent = e.currentTarget;
        var pool = new Pool();
        var p = pool.$el;
        if(!this.$el.querySelector(".water")){
            parent.appendChild(p);
        }

        p = parent.lastElementChild;
        p.className = "water";

        var d = parseInt(p.style.height, 10);

        if(!p.style.height && !p.style.width){
            d = Math.max(parent.offsetWidth, parent.offsetHeight);
            p.style.height = d + "px";
            p.style.width = d + "px";
        }

        var x = e.pageX - offsetLeft(parent) - d/2;
        var y = e.pageY - offsetTop(parent) - d/2;

        p.style.top = y + "px";
        p.style.left = x + "px";
        p.className = "water ripple";
      }
    }
  });
};

module.exports = {
    template: require("./template.html"),
    offsetTop: offsetTop,
    offsetLeft: offsetLeft,
    render: render
};
