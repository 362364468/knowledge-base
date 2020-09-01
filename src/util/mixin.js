
/*
 *分页mixin
 * tableData: 表格数据
 * pageAll: 分页信息
 * */

export const pageMixin = {
	data() {
		return {
			isLoading: false,
			pageAll: {
				//分页属性布置
				pageInfo: {
					total: 1, //总页数
					pageCurrent: 1, //当前页-页码
					pageSize: 10, //当前页显示数据条数
					lastPage: 1 //最大页码
				}
			},
			tableH: null,//表格宽度
			addOffon: true,
			tableW: null,//表格高度
			num: 0,
			queryHeight:60,//查询模块高度
		}
	},
	methods: {
		//获取表格宽度
		getTableResizeWeight() {
			if (this.addOffon) {
				this.tableW = window.innerWidth - 260
			} else {
				this.tableW = window.innerWidth - 98
			}
		},
		// 菜单缩放按钮点击屏幕缩放事件-导致表格宽度变化事件
		getTableWidth(add) {
			this.addOffon = add
			this.getTableResizeWeight()
		},
		getTableHeight() {
			// console.l
			this.tableH = window.innerHeight - this.queryHeight - 136;
		}
	},
	mounted() {
		this.$Bus.$on('getTableWidth', (add) => {
			this.getTableWidth(add)
		})
	    this.$nextTick(()=>{
			this.tableH = window.innerHeight - this.queryHeight - 136;
			this.tableW = window.innerWidth - 260;
		})
		window.onresize = () => {
			this.getTableResizeWeight()
			this.getTableHeight()
			//当前页面是否启用屏幕变化事件
			if (this.resizeOffon) {
				this.windowOnEesize()
			}
			//console.log(this.tableH)
		}
	},
	watch: {
		$route(val) {
			this.getTableResizeWeight()
			this.getTableHeight()
		}
	},
}

