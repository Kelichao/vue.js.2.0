<style lang="stylus" scoped>
@import '~style/form.styl'

</style>
<template lang="pug">
.weather-entry
    Header.mgb-16(:isButton='true' :titleList="mode == 'add'?['新增气象站']:['编辑气象站']"  @go='goback')
    .form-pattern
        el-form.w640(label-width="160px" :model="formData" :rules='rules' ref='form')
            el-form-item(label="气象站名称：" prop="name")
                el-input(v-model="formData.name" )
            el-form-item(label="站点编码：", prop='code' )
                el-input(v-model='formData.code' :disabled='mode == "edit"')
            el-form-item(label="所属网格：" prop="gridCode")
                grid-select(v-model='formData.gridCode' url='/tree/all-grid-tree')
            el-form-item(label="所属部门：", prop='department' )
                el-select(v-model='department' placeholder='请选择所属部门' )
                    el-option(v-for='item in departmentData' :key='item.code' :value='item.code' :label='item.name')
            choose-geo(:readonly="readonly" v-model='formData.longlat' ref='validLonglat')
            el-form-item(label="地址：" prop="address")
                el-input(v-model="formData.address" )
            el-form-item(label="站点数据更新时长：", prop='dataUpdateTimeStep' )
                el-input(v-model='formData.dataUpdateTimeStep' )
                    template(slot="append") 分钟
            el-form-item(label='备注：', prop='remark')
                el-input.mgt-8(v-model='formData.remark' type='textarea')

    .txt-center
        el-button(type="primary" @click="onSubmit") 保存
        el-button(@click='goback') 取消 
</template>
<script>
import { entry } from 'mixin'
import GridSelect from 'comp/form/GridSelect'
import ChooseGeo from 'comp/form/ChooseGeo'

export default {
    name: 'weatherSite',
    mixins: [ entry ],
    data(){
        let checkAccessCode = (rule, value, callback) => {
            if (!value) {
                callback(new Error("请输入接入编码"))
            } else if (value.toString().indexOf(" ") != -1) {
                callback(new Error("请检查是否含有空格"))
            } else if ((/[^\w_-]/g).test(value)) {
                //输入含有空格
                callback(new Error("编码只能是数字、字母、下划线或'-'"))
            } else {
                this.$get(`/weather-site/isExistCode`,{
                    id:this.$route.query.id,
                    code: value
                }).then(resp => {
                    if (resp) {
                        callback(new Error("您输入的站点编码已存在！"))
                    } else {
                        callback()
                    }
                })
            }
        }
        
        let checkStr = (rule, value, callback) => {
            if(!value){
                callback(new Error('请输入气象站名称'))
            } else if (value.toString().indexOf(" ") != -1) {
                callback(new Error("请检查是否含有空格"));
            } else if(!/(^[a-zA-Z0-9_\u4e00-\u9fa5]+$)/.test(value)){
                callback(new Error("请输入中英文、数字、下划线"));
            } else {
                this.$get(`/weather-site/isExistName`,{
                    id:this.$route.query.id,
                    name: value
                }).then(resp => {
                    if (resp) {
                        callback(new Error("您输入的气象站名称已存在！"))
                    } else {
                        callback()
                    }
                })  
            }
            
            
        }
        return {
            formData: {
                gridCode: '',
            },
            department: '',
            departmentData: [],//部门数据
            readonly: false,
            rules: {
                name: [{
                    required: true,
                    validator: checkStr,
                    trigger: 'blur'
                },{
                    max: 50,
                    message: '长度小于50字',
                    trigger: 'blur'
                }],
                code: [{
                    required: true,
                    validator: checkAccessCode,
                    trigger: 'blur'
                },{
                    max: 50,
                    message: '长度小于50字',
                    trigger: 'blur'
                }],
                gridCode: [{
                    required: true,
                    message: "请选择所属网格",
                    trigger: "change"
                }],
                address: [{
                    max: 255,
                    message: '长度小于255字',
                    trigger: 'blur'
                }],
                //输入正整数
                dataUpdateTimeStep: [{
                    required: true,
                    trigger: "blur",
                    message: '请输入站点数据更新时长'
                },{
                    trigger: 'blur',
                    validator: this.$options.validator.isNumber
                }],
                remark: [{
                    max: 255,
                    message: '长度小于255字',
                    trigger: 'blur'
                }]
            }
        }
    },
    components:{
        GridSelect,
        ChooseGeo
    },
    methods: {
        //提交
        onSubmit(){
            let flag = this.$refs.validLonglat.validateForm()
            this.$refs.form.validate(valid => {
                if(valid && flag){
                    this.formData.longitude = this.formData.longlat[0]
                    this.formData.latitude = this.formData.longlat[1]
                    this.formData.departmentCode = this.department
                    if(this.mode == 'edit'){
                        this.formData.id = this.$route.query.id
                    }
                    this.$post(`/weather-site/save`,this.formData).then(resp => {
                        if(resp.flag){
                            this.$message.success(resp.message)
                            this.$router.back()
                        } else {
                            this.$message.info(resp.message)
                        }
                    })
                }
            })
        },
        getData() {
            if(this.mode == 'edit'){
                this.$get(`/weather-site/${this.$route.query.id}`).then(resp => {
                    this.formData = resp
                    this.department = this.formData.departmentCode
                    this.formData.longlat = (this.formData.longitude && this.formData.latitude) != null ? [this.formData.longitude,this.formData.latitude] : []
                })
            }
        }
    },
    mounted(){
        //获取部门数据
        this.$get(`/public/department-type-list`).then(resp => {
            this.departmentData = resp
            this.department = resp[0].code
            this.getData()
        })
        
    }
}
</script>