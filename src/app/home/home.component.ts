import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as echarts from 'echarts';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  title = 'Chinese Food Map';

  regionOptions;

  constructor(private http: HttpClient, private router: Router, private activeRouter: ActivatedRoute) { }

  public onChartClick(event) {
      console.log(event.data.webData.path);
      this.router.navigate([event.data.webData.path], {
        queryParams: {mapName: event.data.webData.name,
        path: event.data.webData.path}

      });
 /*     this.router.navigate(event.data.webData.path, {
        queryParams: {mapName: event.data.webData.path.name},

      });*/

 //   this.router.navigateByUrl("/jiangsu");
  }

  ngOnInit() {

    this.http.get('assets/china.json').subscribe(geoJson =>{
      //    echarts.geoJson =
      //  this.get('map/china.json', function (chinaJson) {
          echarts.registerMap('China', geoJson);

          this.regionOptions = {
            tooltip: {
              trigger: 'item',
              showDelay: 10,
              formatter: function(params) {
                let nam = params.name+'<br/>';
                console.log(params.data.rank);
                let rank = params.data.rank;
                console.log(params.data.rank);
                for(let i=0; i<rank.length; i++){
                  let j = i+1;
                  nam += 'Top '+j+' '+ rank[i] + '<br/>'
                }

                return nam;
              }
            },
            triggerOn: 'hover',

            visualMap:{

              layoutCenter: ['60%', '60%'],
              layoutSize: 400,
              min: 0,
              max: 50,
              text: ['High', 'Low'],
              realtime: false,
              calculable: true,
              inRange: {
                color: ['#ADCDEF', '#2171C1']
              }
            },

            series: [
              {

                type: 'map',
                map: 'china',

                mapType: 'China',//consistent with what in registerMap

                itemStyle: {
                  normal: {
                    areaColor: '#AAD5EF',
                    borderColor: 'white',

                    label: {show: true, color: 'blue', }
                  },
                  textStyle:{
                    align: 'center',
                    baseline: 'middle',
                  },
                  emphasis:{
                    areaColor: '#A5DABB'
                  }

              },
              zoom: 1.25,
              data: [
                { name: '北京', value: 0, rank: ['老北京涮羊肉', '北京烤鸭', '老北京炸酱面','豌豆黄', '驴打滚'], webData: {path: '/beijing',name: '北京'}},
                { name: '天津', value: 0, rank: ['煎饼果子', '八珍豆腐', '锅巴菜','卷圈', '老爆三'], webData: {path: '/tianjing',name: '天津'} },
                { name: '重庆', value: 0, rank: ['烤鱼', '九宫格火锅', '毛血旺','辣子鸡', '重庆小面'], webData: {path: '/chongqing',name: '重庆'} },
                { name: '上海', value: 0, rank: ['蟹黄汤包', '腌笃鲜', '生煎','大闸蟹', '红烧肉'], webData: {path: '/shanghai',name: '上海'} },
                { name: '湖南', value: 0, rank: ['辣椒炒肉', '剁椒鱼头', '口味虾','臭豆腐', '糖油粑粑'], webData: {path: '/hunan',name: '湖南'} },
                { name: '广东', value: 0, rank: ['虾饺', '肠粉', '干炒牛河','煲仔饭', '白切鸡'], webData: {path: '/guangdong',name: '广东'} },
                { name: '福建', value: 0, rank: ['福州佛跳墙', '厦门沙茶面', '漳州江东鲈鱼','泉州肉粽', '沙县扁肉'], webData: {path: '/fujian',name: '福建'} },
                { name: '江西', value: 0, rank: ['瓦罐汤', '藜蒿炒腊肉', '三杯鸡','米粉蒸肉', '清明果'], webData: {path: '/jiangxi',name: '江西'} },
                { name: '四川', value: 0, rank: ['麻辣火锅', '串串', '肥肠粉','兔头', '钵钵鸡'], webData: {path: '/sichuan',name: '四川'} },
                { name: '广西', value: 0, rank: ['柳州螺狮粉', '广西烤乳猪', '桂林米线','蜂蛹', '蚂蚱'], webData: {path: '/guangxi',name: '广西'} },
                { name: '新疆', value: 0, rank: ['大盘鸡', '手抓饭', '新疆拌面（拉条子）','新疆烤肉', '馕'], webData: {path: '/xinjiang',name: '新疆'} },
                { name: '西藏', value: 0, rank: ['西藏耗牛肉', '藏香猪', '林芝鲁朗石锅鸡','火烧蕨麻猪', '人参果饭伴酥油'], webData: {path: '/xizang',name: '西藏'} },
                { name: '青海', value: 0, rank: ['炕锅羊排', '卤耗牛', '牛肉面','肉蛋双飞', '炒面片'], webData: {path: '/qinghai',name: '青海'} },
                { name: '甘肃', value: 0, rank: ['兰州牛肉面', '面肠', '手抓羊肉','驼峰炒五丝', '驴肉黄面'], webData: {path: '/gansu',name: '甘肃' } },
                { name: '宁夏', value: 0, rank: ['羊杂碎', '羊蹄', '盖碗茶','羊肉粉汤', '粉汤水饺'], webData: {path: '/ningxia',name: '宁夏'} },
                { name: '内蒙古', value: 0, rank: ['烤羊腿', '烤猪方', '蒙古羊肉肠','金刀烤羊背', '扒驼掌'], webData: {path: '/neimenggu',name: '内蒙古'} },
                { name: '海南', value: 0, rank: ['椰子鸡', '文昌鸡', '四角豆','和乐蟹', '海南鸡饭'], webData: {path: '/hainan',name: '海南'} },
                { name: '山西', value: 0, rank: ['刀削面', '拨烂子', '饸饹','揪片', '莜面栲栳'], webData: {path: '/shanxi',name: '山西'} },
                { name: '陕西', value: 0, rank: ['肉夹馍', '凉皮', '泡馍','肉丸胡辣汤', '油泼面'], webData: {path: '/shanxi',name: '陕西'} },
                { name: '云南', value: 0, rank: ['过桥米线', '汽锅鸡', '菌子锅','昆虫宴', '酸汤猪脚火锅'], webData: {path: '/yunnan',name: '云南'} },
                { name: '贵州', value: 0, rank: ['肠旺面', '酸汤鱼', '独山盐酸菜','丝娃娃', '豆腐圆子'], webData: {path: '/guizhou',name: '贵州'} },
                { name: '湖北', value: 0, rank: ['热干面', '豆皮', '排骨莲藕汤','油焖大虾', '面窝'], webData: {path: '/hubei',name: '湖北'} },
                { name: '浙江', value: 0, rank: ['东坡肉', '葱包烩', '叫花鸡','西湖醋鱼', '龙井虾仁'], webData: {path: '/zhejiang',name: '浙江'} },
                { name: '安徽', value: 0, rank: ['臭鳜鱼', '毛豆腐', '三河米饺','吴山贡鹅', '鸭油烧饼'], webData: {path: '/anhui',name: '安徽'} },
                { name: '河南', value: 0, rank: ['胡辣汤', '黄河鲤鱼', '烩面','羊肉汤', '锅贴'], webData: {path: '/henan',name: '河南'} },
                { name: '山东', value: 0, rank: ['把子肉', '爆炒腰花', '糖醋鲤鱼','鲅鱼水饺', '辣炒蛤蜊'], webData: {path: '/shandong',name: '山东'}},
                { name: '江苏', value: 0, rank: ['南京盐水鸭', '阳澄湖大闸蟹', '无锡小笼包','松鼠桂鱼', '鸭血粉丝汤'], webData: {path: '/jiangsu',name: '江苏'}},
                { name: '河北', value: 0, rank: ['道口烧鸡', '鞋底儿烧饼', '邯郸拽面','永年驴肉灌肠', '饹馇'], webData: {path: '/hebei',name: '河北'} },
                { name: '辽宁', value: 0, rank: ['锅包肉', '拌鸡架', '雪绵豆沙','冷面', '麻辣拌'], webData: {path: '/liaoning',name: '辽宁'} },
                { name: '吉林', value: 0, rank: ['炭火锅', '铁锅炖鱼', '炒肉拉皮','白肉血肠', '炒肉渍菜粉'], webData: {path: '/jilin',name: '吉林'} },
                { name: '黑龙江', value: 0, rank: ['地三鲜', '烤冷面', '红肠','杀猪菜', '得莫利炖鱼'], webData: {path: '/heilongjiang',name: '黑龙江'} },
                { name: '台湾', value: 0, rank: ['卤肉饭', '台式奶茶', '台湾牛肉面','凤梨酥', '盐酥鸡'], webData: {path: '/xianggang',name: '香港'} },
                { name: '香港', value: 0, rank: ['糖水甜品', '深井烧鹅', '港式牛腩','车仔面', '糯米糍'], webData: {path: '/aomen',name: '澳门'} },
                { name: '澳门', value: 0, rank: ['葡式蛋挞', '牛杂', '水蟹粥','猪扒饭', '双皮奶'], webData: {path: '/taiwan',name: '台湾'} },
                { name: '南海诸岛', value: 0, rank: [], webData: {path: '/nanhaizhudao',name: '南海诸岛'}}]

            }
          ]//end of series



          }

        });

  }

}
