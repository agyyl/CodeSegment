<template>
  <div class="tab-page">
    <el-form
      class="page-form"
      label-position="right"
      label-width="180px"
      size="small"
      ref="form"
      :rules="rules"
      :model="interfaceData"
    >
      <el-form-item
        label="发起调用的系统"
        prop="callerModelCategoryId"
        >
        <el-select
          v-model="interfaceData.callerModelCategoryId"
          placeholder="请选择系统"
          filterable
        >
          <el-option v-for="c in $modelCategories" :label="c.categoryName + '(' + c.categoryAbbreviation + ')'" :value="c.categoryId" :key="c.categoryId"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="被调用的系统"
        prop="calleeModelCategoryId"
        >
        <el-select
          v-model="interfaceData.calleeModelCategoryId"
          placeholder="请选择系统"
          @change="calleeMoCaChange"
          filterable
        >
          <el-option v-for="c in $modelCategories" :label="c.categoryName + '(' + c.categoryAbbreviation + ')'" :value="c.categoryId" :key="c.categoryId"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="引用方式"
        prop="callType"
        >
        <el-select
          v-model="interfaceData.callType"
          placeholder="请选择引用方式"
          @change="changeType"
        >
          <el-option v-for="item in callTypeArr" :label="item.label" :value="item.value" :key="item.value">
             {{item.label}} <span style="font-size:12px;color:#666;opacity:0.8">（{{item.desc}}）</span>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="被调用的系统中的数据库"
        :prop="requiredName ? 'calleeModelId' : null"
        >
        <!-- <el-select
          v-model="interfaceData.calleeModelName"
          placeholder="请选择或填写数据库"
          allow-create
          clearable
          filterable
          @change="changeModelId"
        >
          <el-option v-for="item in dataSourceArr" :label="item.definition" :value="item.definition" :key="item.definition"></el-option>
        </el-select> -->
          <!-- @change="changeModelId" -->
        <el-autocomplete
          v-model="interfaceData.calleeModelName"
          placeholder="请选择或填写数据库"
          clearable
          @select="(item) => {changeModelId(item.value)}"
          @blur="(e)=>{changeModelId(interfaceData.calleeModelName)}"
          :fetch-suggestions="(queryString, cb) => {cb($getSuggettionInputValue(queryString, cb, dataSourceArr, 'definition'));}"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item
        label="资源类型"
        :prop="requiredName ? 'resourceType' : null"
        >
        <el-select
          v-model="interfaceData.resourceType"
          placeholder="请选择资源类型"
          clearable
          filterable
        >
          <!-- allow-create -->
          <el-option v-for="item in resourceTypeArrSelected" :label="item.label" :value="item.value" :key="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="资源名称"
        :prop="requiredName ? 'resourceName' : null"
        >
        <el-input
          v-model="interfaceData.resourceName"
          placeholder="请填写资源名称"
          ></el-input>
      </el-form-item>
      <el-form-item
        label="功能说明"
        prop="description"
        >
        <el-input
          v-model="interfaceData.description"
          type="textarea"
          placeholder="请填写功能说明"
          ></el-input>
      </el-form-item>
      <el-form-item
        label="填写人"
        prop="filer"
        >
        <el-input
          v-model="interfaceData.filer"
          placeholder="请填写填写人"
          ></el-input>
      </el-form-item>
    </el-form>
    <div class="page-btn-group left-bottom">
      <el-button size="small" type="primary" @click="confirmPost" :disabled="btnDisable">确 定</el-button>
      <el-button size="small" class="white-btn" @click="removetab">取消</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['oldInterface', 'interfaceUrl', 'resourceTypeArr', 'callTypeArr'],
  data() {
    return {
      emptyData: {
        callerModelCategoryId: '',
        calleeModelCategoryId: '',
        calleeModelId: '',
        calleeModelName: '',
        resourceType: '',
        resourceName: '',
        callType: '',
        description: '',
        filer: '',
        id: null,
      },
      rules: {
        callerModelCategoryId: {
          required: true,
          trigger: 'blur',
          message: '请填入开发负责人',
        },
        calleeModelCategoryId: {
          required: 'true',
          trigger: 'blur',
          message: '请填入开发负责人',
        },
        callType: {
          required: 'true',
          trigger: 'blur',
          message: '请填入开发负责人',
        },
        calleeModelId: {
          required: this.requiredName + '',
          trigger: 'blur',
          message: '请填入开发负责人',
        },
        resourceType: {
          required: this.requiredName + '',
          trigger: 'blur',
          message: '请填入开发负责人',
        },
        resourceName: {
          required: this.requiredName + '',
          trigger: 'blur',
          message: '请填入开发负责人',
        },
      },
      interfaceData: {},
      isEdit: false,
      dataSourceArr: [],
      requiredName: false,
      customCalleeModelName: false, // 数据库名称是否自定义
      resourceTypeArrSelected: [],
    };
  },

  components: {},

  computed: {
    btnDisable() {
      let result = false;
      if (this.requiredName) {
        result = result || !this.interfaceData.calleeModelName || !this.interfaceData.calleeModelId || !this.interfaceData.resourceName || !this.interfaceData.resourceType;
      }
      result = result || !this.interfaceData.callerModelCategoryId || !this.interfaceData.calleeModelCategoryId || !this.interfaceData.callType;
      return result;
    }
  },

  mounted() {
    this.dataInit();
  },
  destroyed() {
  },
  watch: {
  },
  methods: {
    /**响应事件 */
    dataInit() {
      this.interfaceData = {};
      if (this.oldInterface.id === 'add') {
        for (let key in this.emptyData) {
          this.$set(this.interfaceData, key, this.emptyData[key]);
        }
      } else {
        for (let key in this.oldInterface) {
          this.$set(this.interfaceData, key, this.oldInterface[key]);
        }
        if (this.interfaceData.calleeModelName && !this.interfaceData.calleeModelId) {
          this.interfaceData.calleeModelId = this.interfaceData.calleeModelName;
          this.customCalleeModelName = true;
        }
        if (this.interfaceData.calleeModelCategoryId) {
          this.calleeMoCaChange(this.interfaceData.calleeModelCategoryId, true)
        }
      }
    },
    changeType(callType) {
      this.requiredName = callType === 'DB_LINK' || callType === 'DIRECT';
      this.resourceTypeArrSelected = [];
      this.interfaceData.resourceType = '';
      let pushArr = [];
      switch (callType) {
        case 'DB_LINK':
        pushArr = [1, 1, 0, 0];
        break;
        case 'FILE_TRANSFER':
        pushArr = [0, 0, 0, 1];
        break;
        case 'DIRECT':
        pushArr = [1, 1, 0, 0];
        break;
        case 'MESSAGE':
        pushArr = [0, 0, 1, 1];
        break;
        case 'API':
        pushArr = [0, 0, 1, 0];
        break;
      }
      for(let i=0; i<this.resourceTypeArr.length; i++) {
        if (pushArr[i] === 1) {
          this.resourceTypeArrSelected.push(this.resourceTypeArr[i]);
        }
      }
    },
    confirmPost() {
      let url = this.interfaceUrl + '/';
      for(let key in this.interfaceData) {
        if (!this.interfaceData[key]) {
          this.interfaceData[key] = null;
        }
      }
      if (this.customCalleeModelName) {
        this.interfaceData.calleeModelId = null;
      }
      this.$http.post(url, this.interfaceData)
      .then(res => {
        this.$emit('editSuccesed');
      })
      .catch(e => {
        this.$showFailure(e);
      })
    },
    removetab() {
      this.$emit('closeEditTab');
    },
    calleeMoCaChange(id, isDataInit) {
      this.$http.get(this.$url + '/service/models/category/' + id)
      .then(res => {
        if (res && Array.isArray(res.data)) {
          this.dataSourceArr = res.data;
        } else {
          this.dataSourceArr = [];
        }
        if (!isDataInit) {
          this.interfaceData.calleeModelId = '';
        }
      })
      .catch(e => {
        this.$showFailure(e);
        this.dataSourceArr = [];
      });
    },
    changeModelId(name) {
      let index = this.dataSourceArr.findIndex(item => {
        return item.definition == name;
      });
      if (index === -1) {
        this.interfaceData.calleeModelId = name;
        this.customCalleeModelName = true;
      } else {
        this.customCalleeModelName = false;
        this.interfaceData.calleeModelId = this.dataSourceArr[index] ? this.dataSourceArr[index].modelId : name;
      }
    },
  }
};
</script>
<style lang='scss'>
.halfWidth {
  width: 40%;
}
.description {
  #desc {
    width: 40%;
  }
}
</style>
