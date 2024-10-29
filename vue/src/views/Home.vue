<template>
  <div >
    <el-row>
      <el-col :span="10">    <div id="main" style="width:400px ; height:400px"> </div></el-col>
       <el-col :span="12">   <div id="pie" style="width:600px ; height:400px">  </div></el-col>
    </el-row>

         
   
  </div>
</template>


<script>

import * as echarts from 'echarts';
import request from '@/utils/request';
export default {
    name:"Home",
    data(){
      return{

      }
    },
    mounted(){  //页面元素div渲染完成之后再触发→ create则是div未创建就执行
var option = {
  xAxis: {
    text:'各季度会员注册统计图',
    type: 'category', 
    data: ['第一季度','第二季度','第三季度','第四季度']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [],
      type: 'line'
    }, 
    {
      data: [],
      type: 'bar'
    }
  ]
};

var chartDom = document.getElementById('main');
var myChart = echarts.init(chartDom);
this.request.get("/echarts/members").then( res => {
  // option.xAxis.data=res.data.x
   option.series[0].data=res.data
    option.series[1].data=res.data
    //请求数据后再渲染
    myChart.setOption(option);


    optionPie.series[0].data=[
      {
      name:'季度一' ,
      value: res.data[0]
    },
    {
      name:'季度二' ,
      value: res.data[1]
    },
    {
      name:'季度三' ,
      value: res.data[2]
    },
    {
      name:'季度四' ,
      value: res.data[3]
    },
    ]
var pieDom = document.getElementById('pie');
var myChartPie = echarts.init(pieDom);
myChartPie.setOption(optionPie);

})

//饼图

var optionPie;
optionPie = {
  title: {
    text: '季度会员统计',
    
    left: 'center'
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)'
  },
  legend: {
    left: 'center',
    top: 'bottom',
    data: [
      '季度一',
      '季度二',
      '季度三',
      '季度四'
    ]
  },
  toolbox: {
    show: true,
    feature: {
      mark: { show: true },
      dataView: { show: true, readOnly: false },
      restore: { show: true },
      saveAsImage: { show: true }
    }
  },
  series: [
    
    {
       name: 'Nightingale Chart',
      type: 'pie',
      radius: [20, 150],
      center: ['50%', '50%'],
      roseType: 'area',
      itemStyle: {
        borderRadius: 8
      },
      data: [
      
      ]
    }
  ]
};

}

}


</script>

<style scoped>

</style>