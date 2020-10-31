<template>
  <div class="process-result">
    <datablau-tab-with-table
      class="table-tab-container"
      ref="processTaskResult"
      :totalShow="totalShow"
      :columnDefs="columnDefs"
      :getShowData="getShowData"
      :hideTopLine="true"
      :hideBottomLine="false"
      :tableOption="tableOption"
      :tableHidePagination="tableHidePagination"
      :defaultParaData="defaultParaData"
    >
      <div class="right-btn-container" slot="header">
        <el-button
          size="mini"
          @click="refreshTable"
        >刷 新</el-button>
      </div>
    </datablau-tab-with-table>
  </div>
</template>

// 规划
// 需要作为参数, 或者 根据组件修改的 内容:
//   2. table 字段 数组, 操作 字段 回调函数
//   3. 右上角 创建/上传/下载 按钮
// 需要增加的 固定的功能:
//   1. 这个组件里, 在最外层 添加一个 tab组件,
//   2. 增加 通用的编辑/创建组件, 从另一个文件引入自定义组件, 作为插槽 放到 编辑 的 tab 或者 弹框
//   3. 全局增加一个 前台分页加过滤 的函数 // 获取数据 api,  过滤字段 // 获取数据的函数, 根据 配置, 判断是 前台/后台 分页 或者 自定义
<script>
  export default {
    data () {
      return {

        // *** tab with table ***
        totalShow: 0,
        columnDefs: [],
        hideTopLine: false,
        tableOption: {
          rowSelection: 'single',
        },
        tableHidePagination: false,
        defaultParaData: {
          currentPage: 1,
          pageSize: 20,
        },
        getAllInfo: null,

      }
    },
    props: {
      taskId: {
        required: true,
        type: [String, Number]
      }
    },
    components: {

    },
    beforeMount() {
      let formatterTime = (data) => {
        let t = this.$timeFormatter(data.value);
        return t;
      };
      let columnDefs = [
        {
          type: ['firstEmptyColumn'],
        },
        // {
        //   headerName: '任务名称',
        //   field: 'taskName',
        //   tooltipField: 'taskName',
        //   width: 150,
        //   // type: ['customSortCol'],
        // },
        {
          headerName: '审批人',
          field: 'assignee',
          tooltipField: 'assignee',
          width: 150,
          // type: ['customSortCol'],
        },
        {
          headerName: '开始时间',
          field: 'startTime',
          // tooltipField: 'createTime',
          valueFormatter: formatterTime,
          tooltipValueGetter: formatterTime,
          width: 150,
          // type: ['customSortCol'],
        },
        {
          headerName: '结束时间',
          field: 'endTime',
          // tooltipField: 'modifyTime',
          valueFormatter: formatterTime,
          tooltipValueGetter: formatterTime,
          width: 150,
          // type: ['customSortCol'],
        },
      ];
      this.columnDefs = columnDefs;
    },
    computed: {
      editBottomItemConfirm() {
        let bool = false;
        bool = !!(this.editSynonymsData && this.editSynonymsData.synonyms);
        return bool;
      },
    },
    mounted() {

    },
    methods: {
      getShowData(para) {
        if (!this.getAllInfo) {
          this.setTaskResult();
        }
        return new Promise((resolve, reject) => {

            // let data = res.data.content;
            // if (!data || !Array.isArray(data)) {
            //   data = [];
            // }

            // let keyword = para.keyword || '';
            // keyword = _.trim(keyword);
            // if (keyword) {
            //   let result = [];
            //   keyword = keyword.toLowerCase();
            //   let name = '';
            //   data.forEach(item => {
            //     name = item.taskName || '';
            //     name = name.toLowerCase();
            //     let index = name.indexOf(keyword);
            //     if ( index!== -1) {
            //       result.push(item);
            //     }
            //   })
            //   data = result;
            // }
            // this.totalShow = data.length;
            // let value = data;


          let keyword = para.keyword || '';

          if (this.getAllInfo) {
            this.getAllInfo
            .then(res => {
              let data = res.data;
              if (!data || !Array.isArray(data)) {
                data = [];
              }

              let keyword = para.keyword || '';
              keyword = _.trim(keyword);
              if (keyword) {
                let result = [];
                keyword = keyword.toLowerCase();
                let name = '';
                data.forEach(item => {
                  name = item.name || '';
                  name = name.toLowerCase();
                  let index = name.indexOf(keyword);
                  if ( index!== -1) {
                    result.push(item);
                  }
                })
                data = result;
              }

              this.totalShow = data.length;

              let s = para.pageSize;
              let c = para.currentPage;

              let arr = data.slice(s*(c-1), s*c);
              resolve(arr);
            })
            .catch(e => {
              this.$showFailure(e);
              reject(e);
            });
          } else {
            resolve([]);
            this.$showFailure('找不到指定任务');
          }


        });
      },

      setTaskResult() {
        let taskId = this.taskId;
        if (!taskId) return;
        let url = `${this.$url}/service/workflow/task/detail/info?processInstanceId=${taskId}`;
        this.getAllInfo = this.$http.get(url);
      },

      refreshTable() {
        this.setTaskResult();
        if (this.$refs.processTaskResult && this.$refs.processTaskResult.refreshData) {
          this.$refs.processTaskResult.refreshData();
        }
      },
      tableLayout() {
        if (this.$refs.processTaskResult && this.$refs.processTaskResult.resetTableStyle) {
          this.$refs.processTaskResult.resetTableStyle();
        }
      },
    },
    watch: {
      taskId(newVal) {
        this.refreshTable();
      }
    },
  }
</script>

<style lang="scss" scpoed>
.process-result {
  .delete-btn {
    margin-left: 20px;
  }
}

</style>

<style lang="scss">
.edit-synonyms-dia {
  .synonyms-dialog-body {
    .el-textarea {
      max-width: 400px;
    }
  }
}
</style>
