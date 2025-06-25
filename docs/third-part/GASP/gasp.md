
GSAP 是一个非常强大且广泛使用的 JavaScript 动画库，适用于创建高性能的动画效果。以下是一个详细的文档，介绍如何安装和使用 GSAP。
GSAP 前端动画库文档
1. 引言
GSAP（GreenSock Animation Platform）是一个高性能的 JavaScript 动画库，用于创建流畅且复杂的动画效果。GSAP 提供了丰富的 API 和工具，支持多种动画类型，包括 CSS 动画、SVG 动画和 JavaScript 动画。本文档将详细介绍如何安装和使用 GSAP 来增强您的 Web 应用。
2. 安装
GSAP 可以通过多种方式安装，最常见的是通过 npm（Node Package Manager）进行安装。
使用 npm 安装
npm install gsap
使用 CDN
如果您不想使用 npm，也可以通过 CDN 直接在 HTML 文件中引入 GSAP。
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.9.1/gsap.min.js"></script>
3. 快速开始
以下是一个简单的示例，展示如何使用 GSAP 创建一个基本的 CSS 动画。
HTML
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GSAP Animation Example</title>
    <style>
        #box {
            width: 100px;
            height: 100px;
            background-color: blue;
        }
    </style>
</head>
<body>
    <div id="box"></div>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.9.1/gsap.min.js"></script>
    <script src="app.js"></script>
</body>
</html>
JavaScript (app.js)
import { gsap } from 'gsap';

const box = document.getElementById('box');

gsap.to(box, {
    duration: 2,
    x: 200,
    backgroundColor: 'red',
    ease: 'power2.inOut',
    onComplete: () => {
        console.log('Animation completed');
    }
});
4. API 参考
GSAP 提供了丰富的 API 来控制动画的行为。以下是一些常用的方法和属性：
gsap.to(element, duration, vars)
● element: 要动画的 DOM 元素。
● duration (number): 动画持续时间（秒）。
● vars (object): 动画配置对象，包含以下属性：

    ○ x (number): 水平位置（像素）, translateX的缩写。
    ○ y (number): 垂直位置（像素），translateY的缩写。
    ○ backgroundColor (string): 背景颜色。
    ○ ease (string | function): 缓动函数（如 'linear', 'power2.inOut', 'bounce.out' 等）。
    ○ onComplete (function): 动画完成时的回调函数。
    ○ rotaion(number): 旋转，对应css的rotate
    ○ paused(boolean): 暂停，刚开始不播放动画，手动调用`play()`,执行动画 
gsap.from(element, duration, vars)
与 gsap.to 类似，但动画从指定的初始状态开始。
gsap.from(box, {
    duration: 2,
    x: -200,
    backgroundColor: 'blue',
    ease: 'power2.inOut'
});
gsap.fromTo(element, duration, fromVars, toVars)
与 gsap.to 类似，但动画从指定的初始状态开始到指定的结束状态。
gsap.fromTo(box, {}, {})

gsap.set(element, vars)
立即设置元素的属性，不进行动画。
gsap.set(box, {
    x: 100,
    backgroundColor: 'green'
});
gsap.timeline(vars)
创建一个新的时间线实例，可以按顺序执行多个动画。
const tl = gsap.timeline();

tl.to(box, { duration: 1, x: 200, backgroundColor: 'red' })
  .to(box, { duration: 1, y: 200, backgroundColor: 'yellow' })
  .to(box, { duration: 1, x: 0, y: 0, backgroundColor: 'blue' });
5. 高级用法
动画序列
GSAP 支持动画序列，可以按顺序执行多个动画。
const tl = gsap.timeline();

tl.to(box, { duration: 1, x: 200, backgroundColor: 'red' })
  .to(box, { duration: 1, y: 200, backgroundColor: 'yellow' })
  .to(box, { duration: 1, x: 0, y: 0, backgroundColor: 'blue' });
动画的时间线控制
GSAP 的时间线功能非常强大，允许您对多个动画进行复杂的编排。您可以使用 add(), addLabel(), 和 call() 等方法来管理时间线中的动画和事件。
const tl = gsap.timeline();

tl.addLabel('start')
  .to(box, { duration: 1, x: 200, backgroundColor: 'red' }, 'start')
  .to(box, { duration: 1, y: 200, backgroundColor: 'yellow' }, 'start+=1')
  .call(() => {
      console.log('Custom function called after 1 second');

  }, [ ], 'start+=1.5')

  .to(box, { duration: 1, x: 0, y: 0, backgroundColor: 'blue' }, 'start+=2');
动画的缓动函数
GSAP 提供了丰富的缓动函数库，可以实现各种不同的动画效果。您可以通过 ease 属性来指定缓动函数。
gsap.to(box, {
    duration: 2,
    x: 200,
    backgroundColor: 'red',
    ease: 'elastic.out(1, 0.3)'
});
常见的缓动函数包括：
● linear: 匀速运动
● power1.in: 平滑加速
● power2.inOut: 平滑加减速
● bounce.out: 弹跳效果
● elastic.out(1, 0.3): 弹性效果
回调函数和事件
GSAP 提供了多种回调函数和事件，以便在动画的不同阶段执行自定义代码。
● onStart: 动画开始时触发。
● onUpdate: 每帧更新时触发。
● onComplete: 动画完成时触发。
● onRepeat: 动画重复时触发。
● onReverseComplete: 动画反向完成时触发。
gsap.to(box, {
    duration: 2,
    x: 200,
    backgroundColor: 'red',
    ease: 'power2.inOut',
    onStart: () => {
        console.log('Animation started');
    },
    onUpdate: () => {
        console.log('Animation updating');
    },
    onComplete: () => {
        console.log('Animation completed');
    },
    onRepeat: () => {
        console.log('Animation repeated');
    },
    onReverseComplete: () => {
        console.log('Animation reversed and completed');
    }
});
循环和重复
GSAP 支持动画的循环和重复，可以设置动画无限循环或指定次数重复。
gsap.to(box, {
    duration: 2,
    x: 200,
    backgroundColor: 'red',
    ease: 'power2.inOut',
    repeat: -1, // 无限循环
    yoyo: true, // 反向播放
    onComplete: () => {
        console.log('Animation completed');
    }
});
● repeat: 设置为 -1 时表示无限重复，设置为具体数字时表示重复次数。
● yoyo: 设置为 true 时，动画会在完成一次后反向播放。
控制Tween
Tween继承了Animation类，可以通过pauseresumeseektimeScale等控制Tween
tween.pause(3) // 立刻跳转到第3s，暂停，可不传值
tween.resume() // 恢复
tween.seek(3) // 跳转到第3s
tween.timeScale(2) // 2倍数播放
tween.reverse() // 反向
6. 性能优化
为了确保动画的高性能，以下是一些最佳实践：
● 使用 will-change 属性：通过在 CSS 中使用 will-change 属性，提前告知浏览器哪些属性将会发生变化，从而提高渲染性能。
#box {
    will-change: transform, background-color;
}
● 避免布局重排：尽量减少对布局产生影响的属性变化，如 width 和 height。使用 transform 和 opacity 等不会触发布局重排的属性。
● 使用 requestAnimationFrame：对于复杂动画，考虑使用 requestAnimationFrame 来手动控制每一帧的更新。
function animate() {
    requestAnimationFrame(animate);
    // 更新动画状态
}
animate();
● 分层动画：将不同的动画分配到不同的图层，以减少重绘区域。
7. 总结
GSAP 是一个功能强大且灵活的 JavaScript 动画库，适用于创建各种高性能的动画效果。通过本文档，您已经了解了如何安装和使用 GSAP，以及如何利用其丰富的 API 创建基本和高级动画。希望这些内容能帮助您在 Web 开发中实现更流畅、更吸引人的用户体验。
如果您想进一步探索 GSAP 的更多功能和示例，请访问 GSAP 官方文档和 CodePen 上的 GSAP 示例。

gsap有三个重要的方法创建tweens，gsap.to()gsap.from()gsap.fromTo

GSAP (GreenSock Animation Platform) 是一个非常强大的 JavaScript 动画库，可以用来创建高性能的动画。stagger 是 GSAP 中的一个功能，用于在一组元素之间创建交错动画效果。
基本用法
stagger 可以应用于 TweenMax, TimelineMax, 或 gsap.to/tween 等方法中。它允许你为一组元素设置不同的延迟时间，从而创建出平滑的交错动画效果。
示例 1: 使用 gsap.to 和 stagger
假设你有一组元素（例如，多个 div），你想让它们依次淡入：
<div class="box" style="width: 50px; height: 50px; background: red;"></div>
<div class="box" style="width: 50px; height: 50px; background: blue;"></div>
<div class="box" style="width: 50px; height: 50px; background: green;"></div>
gsap.to(".box", {
  opacity: 1, // 目标属性
  stagger: 0.2, // 每个元素之间的延迟时间
  duration: 0.5, // 动画持续时间
  ease: "power1.inOut" // 缓动函数
});
在这个例子中，每个 .box 元素会依次淡入，每个元素之间有 0.2 秒的延迟。
示例 2: 使用 TimelineMax 和 stagger
如果你需要更复杂的动画序列，可以使用 TimelineMax：
const tl = gsap.timeline();

tl.to(".box", {
  opacity: 1,
  stagger: 0.2,
  duration: 0.5,
  ease: "power1.inOut"
})
.to(".box", {
  x: 100, // 水平移动 100px
  stagger: 0.2,
  duration: 1,
  ease: "power1.inOut"
});
在这个例子中，首先所有 .box 元素会依次淡入，然后依次水平移动 100px。
高级用法
stagger 还支持一些高级选项，例如自定义每个元素的延迟时间和从最后一个元素开始倒序应用延迟。
自定义每个元素的延迟时间
你可以传递一个函数来计算每个元素的具体延迟时间：
gsap.to(".box", {
  opacity: 1,
  stagger: (i, target, targets) => 0.2 * (targets.length - i), // 倒序延迟
  duration: 0.5,
  ease: "power1.inOut"
});
在这个例子中，延迟时间会根据元素的索引和总数进行计算，从而实现倒序延迟效果。
从最后一个元素开始倒序应用延迟
你可以使用 from 选项来指定从最后一个元素开始倒序应用延迟：
gsap.to(".box", {
  opacity: 1,
  stagger: {
    amount: 0.2,
    from: "end" // 从最后一个元素开始
  },
  duration: 0.5,
  ease: "power1.inOut"
});
总结
stagger 是 GSAP 中一个非常有用的功能，可以轻松创建出平滑的交错动画效果。通过结合 gsap.to, TimelineMax 以及自定义延迟时间，你可以实现各种复杂的动画效果。希望这些示例对你有所帮助！

创建时间轴
你可以通过 gsap.timeline() 来创建一个新的时间轴对象：
const tl = gsap.timeline();
向时间轴添加动画
可以使用 to, from, fromTo 等方法向时间轴添加动画。这些方法会返回时间轴本身，因此你可以链式调用它们来添加多个动画。
tl.to(元素1, { duration: 1, x: 100 })
  .to(元素2, { duration: 1, y: 100, delay: 0.5 })
  .from(元素3, { duration: 1, opacity: 0, ease: "power2.inOut" });
控制时间轴
你可以使用各种方法如 play(), pause(), reverse(), 和 restart() 来控制时间轴。
tl.play(); // 开始播放时间轴
tl.pause(); // 暂停时间轴
tl.reverse(); // 反转时间轴
tl.restart(); // 从头开始重新播放时间轴
tl.seek(3); // 跳转到3s
tl.progress(0.5); // 
示例
这里有一个完整的例子，展示了如何使用 GSAP 时间轴来创建一个简单的动画序列：
<!DOCTYPE html>
<html lang="zh">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>GSAP 时间轴示例</title>
  <style>
    .box {
      width: 100px;
      height: 100px;
      background-color: red;
      position: absolute;
    }
  </style>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.9.1/gsap.min.js"></script>
</head>
<body>
  <div class="box" id="box1"></div>
  <div class="box" id="box2" style="top: 120px; left: 120px;"></div>
  <div class="box" id="box3" style="top: 240px; left: 240px;"></div>

  <script>
    const box1 = document.getElementById('box1');
    const box2 = document.getElementById('box2');
    const box3 = document.getElementById('box3');

    const tl = gsap.timeline();

    tl.to(box1, { duration: 1, x: 100, y: 100, ease: "power2.inOut" })
      .to(box2, { duration: 1, x: -100, y: -100, ease: "power2.inOut" }, "-=0.5")
      .from(box3, { duration: 1, scale: 0, rotation: 360, ease: "elastic.out(1, 0.5)" });

    // 可选：添加事件监听器来控制时间轴
    document.addEventListener('click', () => {
      if (tl.reversed()) {
        tl.play();
      } else {
        tl.reverse();
      }
    });
  </script>
</body>
</html>
在这个例子中：
● box1 向右下移动。
● box2 在 box1 完成前 0.5 秒开始向左上移动（使用了 -= 标记来指定重叠时间）。
● box3 从无到有放大并旋转 360 度。
点击页面上的任意位置将会切换时间轴的播放与反转状态。
额外功能
● 标签：你可以在时间轴中添加标签，以便引用特定点。
● 时间缩放：你可以控制整个时间轴的速度。
● 事件回调：你可以在时间轴中的特定点添加回调函数。
这些特性使得 GSAP 时间轴成为创建复杂动画的强大且灵活的工具。如果你需要更详细的文档或示例，请访问 GSAP 官方网站获取更多信息。

gsap effect
6. GSAP Effects
GSAP 提供了一些内置的效果插件，可以轻松地创建复杂的动画效果。这些效果插件通常用于处理特定类型的动画，如弹跳、弹性、分屏等。以下是一些常用的 GSAP 效果插件及其用法。
6.1 SplitText 插件
SplitText 插件可以将文本拆分成单独的字符或单词，并对它们进行动画处理。这在创建文字动画时非常有用。
安装
如果您使用 npm，可以通过以下命令安装 SplitText 插件：
npm install @gsap/split-text
或者通过 CDN 引入：
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.9.1/SplitText.min.js"></script>
使用示例
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GSAP SplitText Example</title>
    <style>
        #text {
            font-size: 24px;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div id="text">Hello, World!</div>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.9.1/gsap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.9.1/SplitText.min.js"></script>
    <script>
        const text = document.getElementById('text');
        const splitText = new SplitText(text, { type: 'chars' });

        gsap.to(splitText.chars, {
            duration: 1,
            y: -50,
            stagger: 0.1,
            ease: 'power2.inOut',
            onComplete: () => {
                console.log('Animation completed');
            }
        });
    </script>
</body>
</html>
在这个示例中，SplitText 插件将文本拆分成单个字符，并对每个字符应用不同的 y 位置动画。
6.2 ScrollTrigger 插件
ScrollTrigger 是一个强大的插件，它为 GSAP（GreenSock Animation Platform）提供了丰富的滚动动画功能。通过 ScrollTrigger，开发者可以轻松实现基于滚动的动画效果，如视差滚动、元素的淡入淡出、动态布局变化等。这一插件不仅简化了复杂的滚动动画逻辑，还提供了高度可定制性和性能优化。
6.2.1 安装与配置
首先，确保你已经安装了 GSAP 和 ScrollTrigger。如果你使用的是 npm 或 yarn，可以通过以下命令进行安装：
npm install gsap
# 或者
yarn add gsap
安装完成后，你需要在项目中引入 GSAP 和 ScrollTrigger。如果你使用的是模块化开发方式，可以在 JavaScript 文件中这样导入：
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// 注册 ScrollTrigger 插件
gsap.registerPlugin(ScrollTrigger);
对于非模块化的项目，可以直接通过 CDN 引入：
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.9.1/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.9.1/ScrollTrigger.min.js"></script>
6.2.2 基本用法
ScrollTrigger 的基本用法非常直观。以下是一个简单的示例，展示如何在滚动到某个元素时触发动画：
gsap.to(".box", {
  x: 500, // 移动 500px
  duration: 2,
  scrollTrigger: {
    trigger: ".box", // 触发器元素
    start: "top 80%", // 当 .box 元素的顶部到达视口顶部 80% 时开始动画
    end: "bottom 20%", // 当 .box 元素的底部离开视口底部 20% 时结束动画
    scrub: true, // 平滑滚动
  }
});
在这个示例中，当 .box 元素的顶部达到视口顶部 80% 时，动画开始执行，并且随着滚动继续，动画会平滑地进行。当 .box 元素的底部离开视口底部 20% 时，动画结束。
6.2.3 高级功能
ScrollTrigger 提供了许多高级功能，以满足更复杂的需求。例如，你可以设置多个触发点、自定义回调函数、以及控制动画的回弹效果等。
多个触发点
你可以为一个动画设置多个触发点，从而实现更复杂的滚动效果：
gsap.to(".box", {
  x: 500,
  duration: 2,
  scrollTrigger: {
    trigger: ".box",
    start: "top 80%",
    end: "bottom 20%",
    markers: true, // 显示标记线，方便调试
    toggleActions: "play pause reverse reset" // 控制不同阶段的动作
  }
});
自定义回调函数
ScrollTrigger 还支持自定义回调函数，允许你在特定时刻执行额外的操作：
gsap.to(".box", {
  x: 500,
  duration: 2,
  scrollTrigger: {
    trigger: ".box",
    start: "top 80%",
    end: "bottom 20%",
    onEnter: () => console.log("进入"),
    onLeave: () => console.log("离开"),
    onEnterBack: () => console.log("反向进入"),
    onLeaveBack: () => console.log("反向离开")
  }
});
回弹效果
为了增强用户体验，你可以添加回弹效果，使动画更加自然：
gsap.to(".box", {
  x: 500,
  duration: 2,
  ease: "power2.inOut",
  scrollTrigger: {
    trigger: ".box",
    start: "top 80%",
    end: "bottom 20%",
    scrub: 2, // 更大的 scrub 值会使动画更平滑
    pin: true, // 固定元素
    pinSpacing: false // 不保留空间
  }
});
6.2.4 性能优化
尽管 ScrollTrigger 功能强大，但在处理大量动画时仍需注意性能问题。以下是一些优化建议：
在处理大量动画时，ScrollTrigger的性能优化是一个不可忽视的问题。为了确保流畅的用户体验，可以采取以下几种策略来进一步提升性能：
1. 减少触发器数量：尽量合并相邻或功能相似的触发器，避免为每一个小元素单独设置触发条件。通过合理规划动画逻辑，使用更少但更智能的触发器来控制多个动画，能够显著降低计算开销。
2. 利用视口检测优化：对于不在当前视口内的元素，可以暂时禁用其相关联的ScrollTrigger实例，直到它们进入可视区域后再激活。这样不仅可以节省CPU资源，还能加快页面加载速度。
3. 延迟加载非关键性动画：如果某些动画对用户首次访问体验影响不大，则可考虑采用懒加载技术，在实际需要时再初始化这些动画。这有助于减轻初始渲染负担，提高整体响应速度。
4. 采用更高效的缓动函数：选择合适的缓动曲线对于改善动画流畅度至关重要。一些复杂的缓动算法虽然视觉效果出色，但可能消耗更多计算资源。因此，在保证视觉效果的同时，应优先选用性能更好的缓动方案。
5. 限制同时播放的动画数量：当多个动画同时运行时，浏览器可能会面临较大的压力。可以通过设定最大并发数等方式，控制同一时刻内活跃的动画数目，从而保持页面稳定性和响应性。
6. 定期清理不再使用的ScrollTrigger实例：随着页面内容的变化，部分ScrollTrigger可能已经失去了作用。定期检查并移除这些无效实例，可以释放内存空间，防止内存泄漏问题的发生。
7. 使用Web Workers进行复杂计算：对于涉及大量数据处理或者数学运算的任务，可以尝试将其转移到Web Worker中执行，以减轻主线程的压力。尽管这种方法不能直接应用于所有类型的动画，但在特定场景下仍然非常有用。
通过上述措施的实施，即使面对复杂的滚动动画需求，也能有效保障网站性能，提供给用户更加顺畅、愉悦的浏览体验。

GSAP AttrPlugin
如何使用 AttrPlugin
1. 引入 GSAP 和 AttrPlugin:
首先，你需要在项目中引入 GSAP 和 AttrPlugin。你可以通过 CDN 或者通过 npm 安装。
使用 CDN:
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.9.1/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.9.1/AttrPlugin.min.js"></script>
使用 npm:
npm install gsap
2. 注册插件:
如果你使用的是 GSAP 3，AttrPlugin 在导入时会自动注册。对于 GSAP 2，你需要手动注册插件。
GSAP 3:
import { gsap } from 'gsap';
import { AttrPlugin } from 'gsap/AttrPlugin';

// 插件会自动注册
GSAP 2:
import * as gsap from 'gsap';
import { AttrPlugin } from 'gsap/AttrPlugin';

gsap.registerPlugin(AttrPlugin);
3. 对属性进行动画处理:
一旦插件注册成功，你就可以使用它来对 HTML 属性进行动画处理。
示例：对 SVG 中的 xlink:href 进行动画处理:
<svg width="100" height="100">
  <image id="myImage" xlink:href="image1.png" x="0" y="0" width="100" height="100" />
</svg>
gsap.to("#myImage", {
  duration: 2,
  attr: {
    "xlink:href": "image2.png"
  }
});
示例：对锚点标签的 href 进行动画处理:
<a id="myLink" href="page1.html">链接</a>
gsap.to("#myLink", {
  duration: 2,
  attr: {
    href: "page2.html"
  }
});
4. 自定义属性:
你也可以对自定义属性进行动画处理。
示例：对自定义属性进行动画处理:
<div id="myDiv" data-custom-attr="value1">Hello</div>
gsap.to("#myDiv", {
  duration: 2,
  attr: {
    "data-custom-attr": "value2"
  }
});
总结
AttrPlugin 是一个非常有用的插件，可以让你轻松地对各种 HTML 属性进行动画处理。无论是标准属性还是自定义属性，都可以通过这个插件实现平滑的过渡效果。希望这些示例能帮助你更好地理解和使用 AttrPlugin。如果你有任何其他问题，欢迎继续提问！

GSAP ScrollTrigger 插件
GSAP 的 ScrollTrigger 插件是一个非常强大的工具，用于创建与滚动相关的动画效果。它允许你根据滚动位置触发动画、控制动画的播放和停止，以及实现各种复杂的滚动效果。以下是如何使用 ScrollTrigger 揗件的详细指南。
如何使用 ScrollTrigger 插件
1. 引入 GSAP 和 ScrollTrigger:
首先，你需要在项目中引入 GSAP 和 ScrollTrigger 插件。你可以通过 CDN 或者通过 npm 安装。
使用 CDN:
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.9.1/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.9.1/ScrollTrigger.min.js"></script>
使用 npm:
npm install gsap
2. 注册插件:
如果你使用的是 GSAP 3，ScrollTrigger 在导入时会自动注册。对于 GSAP 2，你需要手动注册插件。
GSAP 3:
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// 插件会自动注册
GSAP 2:
import * as gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
3. 创建基本的滚动动画:
一旦插件注册成功，你就可以使用 ScrollTrigger 来创建滚动动画。
示例：当元素进入视口时开始动画:
<div id="myElement" style="height: 200px; background-color: lightblue;">Hello, World!</div>
gsap.to("#myElement", {
  duration: 2,
  x: 500,
  scrollTrigger: {
    trigger: "#myElement",
    start: "top 80%", // 当元素顶部距离视口顶部 80% 时开始动画
    end: "bottom 20%", // 当元素底部距离视口顶部 20% 时结束动画
    scrub: true, // 平滑过渡
  }
});
4. 配置 ScrollTrigger 参数:
ScrollTrigger 有很多参数可以配置，以满足不同的需求。
    ○ trigger: 触发动画的元素。
    ○ start: 动画开始的位置，可以是字符串（例如 "top 80%"）或数字（例如 100 表示像素值）。
    ○ end: 动画结束的位置，格式同 start。
    ○ scrub: 是否平滑过渡，设置为 true 时会在滚动过程中平滑更新动画。
    ○ toggleActions: 控制动画在不同阶段的行为，格式为 "play pause resume reset"，分别对应动画开始、暂停、恢复和重置。
    ○ markers: 显示标记线，方便调试，设置为 true 时会显示标记。
示例：使用 toggleActions 和 markers:
gsap.to("#myElement", {
  duration: 2,
  x: 500,
  scrollTrigger: {
    trigger: "#myElement",
    start: "top 80%",
    end: "bottom 20%",
    scrub: true,
    toggleActions: "play none none reverse", // 开始时播放，结束时不操作，离开时不操作，重新进入时反转
    markers: true, // 显示标记线
  }
});
其他高级用法
ScrollTrigger 插件还支持许多高级功能，可以帮助你实现更复杂的滚动动画效果。以下是一些常见的高级用法示例：
1. 创建多个触发点
你可以为不同的元素设置独立的 ScrollTrigger，每个触发点可以控制不同的动画效果。
示例：创建多个触发点
<div id="element1" style="height: 200px; background-color: lightblue;">Element 1</div>
<div id="element2" style="height: 200px; background-color: lightgreen;">Element 2</div>
gsap.to("#element1", {
  duration: 2,
  x: 500,
  scrollTrigger: {
    trigger: "#element1",
    start: "top 80%",
    end: "bottom 20%",
    scrub: true,
    toggleActions: "play none none reverse",
    markers: true,
  }
});

gsap.to("#element2", {
  duration: 2,
  y: -500,
  scrollTrigger: {
    trigger: "#element2",
    start: "top 80%",
    end: "bottom 20%",
    scrub: true,
    toggleActions: "play none none reverse",
    markers: true,
  }
});
在这个示例中，当 #element1 和 #element2 分别进入视口时，会触发动画效果。每个元素都有自己的动画和触发条件。
2. 控制多个动画
你可以使用一个 ScrollTrigger 来控制多个动画，通过将多个动画对象传递给 ScrollTrigger 的 animation 属性来实现。
示例：控制多个动画
<div id="container">
  <div id="box1" style="width: 100px; height: 100px; background-color: red;"></div>
  <div id="box2" style="width: 100px; height: 100px; background-color: blue;"></div>
</div>
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: "#container",
    start: "top 80%",
    end: "bottom 20%",
    scrub: true,
    markers: true,
  }
});

tl.to("#box1", { duration: 1, x: 300 });
tl.to("#box2", { duration: 1, y: 300 }, "<");
在这个示例中，#container 触发了一个时间线（timeline），该时间线包含了两个动画：#box1 水平移动 300 像素，#box2 垂直移动 300 像素。这两个动画会在同一时间开始，并且在滚动过程中同步进行。
3. 设置回调函数
你可以为 ScrollTrigger 设置回调函数，在特定的滚动事件发生时执行自定义逻辑。
示例：设置回调函数
<div id="myElement" style="height: 200px; background-color: lightblue;">Hello, World!</div>
gsap.to("#myElement", {
  duration: 2,
  x: 500,
  scrollTrigger: {
    trigger: "#myElement",
    start: "top 80%",
    end: "bottom 20%",
    scrub: true,
    onEnter: () => console.log("Element entered the viewport"),
    onLeave: () => console.log("Element left the viewport"),
    onEnterBack: () => console.log("Element re-entered the viewport from below"),
    onLeaveBack: () => console.log("Element left the viewport from above"),
    markers: true,
  }
});
在这个示例中，当 #myElement 进入视口、离开视口、从下方重新进入视口或从上方离开视口时，会分别调用相应的回调函数并输出日志信息。
4. 自定义滚动容器
在使用 ScrollTrigger 时，如果需要在一个非标准的滚动容器中实现特定的滚动效果，可以通过设置 scrollContainer 参数来指定具体的滚动元素。例如，假设你有一个具有 overflow: auto 样式的 div，并且希望在这个 div 内部实现滚动触发的效果，那么你需要明确地将这个 div 作为 scrollContainer 传递给 ScrollTrigger。
具体操作步骤如下：
1. 选择滚动容器：首先，确保你的滚动容器已经定义好，并且具备滚动功能。例如：
<div id="myScrollContainer" style="overflow: auto; height: 300px;">
  <!-- 滚动内容 -->
</div>
2. 初始化 ScrollTrigger：在 JavaScript 中初始化 ScrollTrigger 时，通过 scrollContainer 参数指定该滚动容器。例如：
gsap.to(".targetElement", {
  x: 500,
  duration: 2,
  scrollTrigger: {
    trigger: ".triggerElement",
    start: "top 80%",
    end: "bottom 20%",
    scrub: true,
    scrollContainer: "#myScrollContainer"
  }
});
3. 确保滚动容器的尺寸和内容：为了使 ScrollTrigger 能够正确工作，滚动容器的内容必须足够多，以便能够产生滚动效果。同时，滚动容器的高度或宽度应适当设置，以确保可以显示滚动条。
4. 调试和测试：在实际应用中，可能会遇到一些布局或样式问题，导致 ScrollTrigger 无法正常工作。这时，可以通过浏览器的开发者工具检查滚动容器的尺寸、位置以及内容是否符合预期。此外，还可以利用 ScrollTrigger 提供的调试功能，例如 markers: true，来可视化触发点的位置，帮助调试。
通过以上步骤，你可以确保 ScrollTrigger 在非标准滚动容器中正常工作，从而实现复杂的滚动动画效果。这种方法不仅适用于简单的滚动效果，还适用于更复杂的交互式滚动体验，为用户提供更加丰富和动态的视觉效果。
