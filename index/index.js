const app = getApp()
const Mock = require('../util/mock.js')
const Benchmark = require('../util/benchmark.js');
const queue = require('../util/queue.js');

const Random = Mock.Random;
console.info(Random)

Page({
  data: {
    users: []
  },
  onLoad: function () {
    console.log('代码片段是一种迷你、可分享的小程序或小游戏项目，可用于分享小程序和小游戏的开发经验、展示组件和 API 的使用、复现开发问题和 Bug 等。可点击以下链接查看代码片段的详细文档：')
    console.log('https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/devtools.html')
    var data = Mock.mock({
      // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
      'list|20': [{
        // 属性 id 是一个自增数，起始值为 1，每次增 1
        'id': function() {
          return Random.guid()
        },
        'name': function() {
          return Mock.mock('@first()')
        },
        'content': function() {
          return Random.sentence(3, 5)
        },  
        'background': function() {
          return Random.color()
        },
        'avatar': function() {
          return Random.image('200x200', Random.color())
        }
      }]
    })
    console.info(data)
    let start = new Date();
    this.setData({ users: data.list},()=> {
      Benchmark.benchmark(start);
      this.ramdomUpdate(data.list)
    })
  },
  ramdomUpdate(data) {
    let start = new Date();
    let randomControl  = [];
    const arr = Random.sentence(10).split(' ');
    (arr).forEach(element => {
      randomControl.push({
        handle: (next, old) =>{
          const pdata = old || data || [];
          const ctrl = Random.integer(0,3);
          const ctrlList = ['slice', 'concat', 'splice', 'unshift'];
          const ctrlKey = ctrlList[ctrl];
          console.info(ctrlKey);
          if(ctrlKey == 'slice') {
            let pndata = pdata.slice(2) || [];
            this.setData({ users: pndata}, ()=> {
              next(pndata)
            });
          } else if(ctrlKey == 'concat') {
            var cdata = Mock.mock({
              // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
              'list|20': [{
                // 属性 id 是一个自增数，起始值为 1，每次增 1
                'id': function() {
                  return Random.guid()
                },
                'name': function() {
                  return Mock.mock('@first()')
                },
                'content': function() {
                  return Random.sentence(3, 5)
                },  
                'background': function() {
                  return Random.color()
                },
                'avatar': function() {
                  return Random.image('200x200', Random.color())
                }
              }]
            })
            let pndata = pdata.concat(cdata.list) || [];
            this.setData({ users: pndata }, ()=> {
              next(pndata);
            });
          } else if(ctrlKey == 'unshift'){
            var cdata = Mock.mock({
              // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
              'list|20': [{
                // 属性 id 是一个自增数，起始值为 1，每次增 1
                'id': function() {
                  return Random.guid()
                },
                'name': function() {
                  return Mock.mock('@first()')
                },
                'content': function() {
                  return Random.sentence(3, 5)
                },  
                'background': function() {
                  return Random.color()
                },
                'avatar': function() {
                  return Random.image('200x200', Random.color())
                }
              }]
            })
            pdata.unshift.apply(pdata, cdata.list);
            let pndata = pdata;
            this.setData({ users: pndata }, ()=> {
              next(pndata);
            });
          } else if(ctrlKey == 'splice'){
            var cdata = Mock.mock({
              // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
              'list|20': [{
                // 属性 id 是一个自增数，起始值为 1，每次增 1
                'id': function() {
                  return Random.guid()
                },
                'name': function() {
                  return Mock.mock('@first()')
                },
                'content': function() {
                  return Random.sentence(3, 5)
                },  
                'background': function() {
                  return Random.color()
                },
                'avatar': function() {
                  return Random.image('200x200', Random.color())
                }
              }]
            })
            pdata.splice.apply(pdata, [3, 2, ...cdata.list]);
            let pndata = pdata;
            this.setData({ users: pndata }, ()=> {
              next(pndata);
            });
          }
          
        }
      })
    });
    randomControl.push({
      handle: function() {
        Benchmark.benchmark(start);
      }
    })
    queue(randomControl);
    // this.setData({ users: data.list}
  }
})
