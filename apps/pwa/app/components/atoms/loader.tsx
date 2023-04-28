import React from "react";

interface Props {
  className: string;
}

export default function Loader({ className = "" }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      viewBox="0 0 48 48"
      className={className}
      fill="none"
    >
      <title>circle-03</title>
      <g
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4"
        transform="translate(0.5 0.5)"
      >
        <g
          className="nc-loop_circle-03-48"
          transform="rotate(30.59608874089117 24 24)"
        >
          <circle opacity="0.4" cx="24" cy="24" r="22"></circle>
          <path d="M24,2c12.2,0,22,9.8,22,22"></path>
        </g>
        <script>
          {
            '!function(){function t(t){return.5>t?4*t*t*t:(t-1)*(2*t-2)*(2*t-2)+1}function i(t){this.element=t,this.animationId,this.start=null,this.init()}if(!window.requestAnimationFrame){var n=null;window.requestAnimationFrame=function(t,i){var e=(new Date).getTime();n||(n=e);var a=Math.max(0,16-(e-n)),o=window.setTimeout(function(){t(e+a)},a);return n=e+a,o}}i.prototype.init=function(){var t=this;this.animationId=window.requestAnimationFrame(t.triggerAnimation.bind(t))},i.prototype.reset=function(){var t=this;window.cancelAnimationFrame(t.animationId)},i.prototype.triggerAnimation=function(i){var n=this;this.start||(this.start=i);var e=i-this.start;900>e||(this.start=this.start+900),this.element.setAttribute("transform","rotate("+Math.min(900*t(e/900)/2.5,360)+" 24 24)");if(document.documentElement.contains(this.element))window.requestAnimationFrame(n.triggerAnimation.bind(n))};var e=document.getElementsByClassName("nc-loop_circle-03-48"),a=[];if(e)for(var o=0;e.length>o;o++)!function(t){a.push(new i(e[t]))}(o);document.addEventListener("visibilitychange",function(){"hidden"==document.visibilityState?a.forEach(function(t){t.reset()}):a.forEach(function(t){t.init()})})}();'
          }
        </script>
      </g>
    </svg>
  );
}
