Vue-Echarts是ECharts在Vue中的封装组件，它使得在Vue项目中使用ECharts图表变得更加方便。下面是如何在Vue项目中使用Vue-Echarts的基本步骤：
1. 安装Vue-Echarts
首先，确保你的项目中已经安装了Vue。
# npm安装
npm install vue-echarts echarts --save
# yarn安装
yarn add vue-echarts echarts
#pnpm安装（推荐）
pnpm add vue-echarts echarts
这里同时安装了echarts，因为vue-echarts是一个基于ECharts的封装，实际绘制图表时需要ECharts的核心库。
2. 在Vue组件中引入和注册Vue-Echarts
在你想要使用图表的Vue组件中，引入vue-echarts：
import VueECharts from 'vue-echarts'

export default {
  components: {
    'v-chart': VueECharts
  }
}
3. 使用Vue-Echarts组件绘制图表
在模板中，你可以像使用普通Vue组件一样使用v-chart来创建图表，并通过options属性来配置图表的各种属性和数据。
<template>
  <div>
    <v-chart :options="chartOptions"></v-chart>
  </div>
</template>

<script>
export default {
  data() {
    return {
      chartOptions: {
        title: {
          text: '示例图表'
        },
        tooltip: {},
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
        },
        yAxis: {},
        series: [{
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }]
      }
    }
  }
}
</script>
4. 风格和自动resize
为了使图表自适应容器大小变化，可以在mounted()和beforeDestroy()生命周期钩子中添加resize的监听和移除：
export default {
  mounted() {
    // 初始化图表大小
    this.$nextTick(() => {
      this.$refs.chart.resize();
    });
    // 添加窗口resize事件监听
    window.addEventListener('resize', this.handleResize);
  },
  beforeDestroy() {
    // 移除resize事件监听
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    handleResize() {
      this.$refs.chart.resize();
    }
  }
}
这里的this.$refs.chart是对v-chart组件的引用，通过调用其resize方法可以实现图表的自动重绘以适配新的容器尺寸。
以上就是Vue项目中使用Vue-Echarts的基本步骤。根据具体需求，你可以进一步探索ECharts丰富的图表类型和配置项，以创建更加复杂和美观的数据可视化界面。
Echarts按需引入
Echarts主要分为以下几种模块
1. echarts/core 核心模块 - 
2. echarts/renderer 渲染模块 - 以Renderer结尾, 例如：SVGRenderer渲染，CanvasRenderer渲染
3. echarts/charts 图表模块 -以Chart结尾，例如：BarChart 矩形图，LineChart 折线图。。。
4. echarts/components 组件模块 - 以Component结尾， 例如 gridComponent 直角坐标系、PolarComponent 极坐标系。。。
5. echarts/features 特性模块 - LabelLayout 标签自动布局、UniversalTransition 全局过渡动画
import { use } from 'echarts/core'
// 必须引入，确定echarts最终，使用什么渲染器，进行渲染
import { CanvasRender } from 'echarts/renderers'
// 在配置项series中使用`type: 'bar'`时
import { BarChart } from 'echarts/chart'
// 在配置项需要配置xAxis、yAxis时
import { gridComponent } from 'echarts/components'

use([
  CanvasRenderer,
  BarChart,
  gridComponents
])
Echarts中的components
TitleComponent: echarts中配置title时，必须引入
ToolTipComponent: echarts中配置toolTip提示语时，必须引入
LegendComponent: echarts中配置legend图例时，必须引入
GridComponent: echarts中配置xAxis、yAxi横纵直角坐标系时，必须引入
DatasetComponent: echarts中配置dataset数据集时，必须引入
TransformComponent: echart中需要进行数据转换时，必须引入
常见的使用
1. 一些基础概念

每一条轴分为5部分，轴线(axisLine)、刻度(axisTick)、标签(axisLabel)、标题(name)、分割线(splitLine)
2. 

