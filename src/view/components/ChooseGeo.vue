<style  scoped>
    /* .longlat
        position relative
        .form-class
            >>>.el-form-item__error
                right -8px
            .el-input
                width 136px !important
            .el-input:first-child
                margin-right 8px
        .map-point
            cursor pointer
            position absolute
            width 14px
            height 20px
            left 290px
            background url('~image/map_point.png') center no-repeat
            background-size cover */
</style>

<template lang='pug'>
div.block.longlat
    el-form(:model='form' ref='form' :label-width='labelWidth' )
        .form-class
            el-form-item(prop='longlat' label='经纬度：'  :rules='isValidate?rules.longlat:[{required: false}]')
                el-input(v-model='form.longlat[0]' :disabled="readonly" @input="onFilter")
                el-input(v-model='form.longlat[1]' :disabled="readonly" @input="onFilter")
                //-经纬度不可修改时，隐藏掉点位标志
                span.map-point.center-v( @click='selectGeo' v-show="!readonly")
</template>

<script>
    import emitter from 'element-ui/src/mixins/emitter.js'
    import validator from './validator'

    export default {
        name: 'choose-geo',
        mixins: [emitter,validator],
        props: {
            value: {
                type: Array,
                
            },
            readonly: {
                type: Boolean,
                default: false
            },
            //- 是否进行经纬度验证
            isValidate: {
                type: Boolean,
                default: true
            },
            //- label宽度
            labelWidth: {
                type: String,
                default: '160px'
            }
        },
        data() {
            return {
                form: {
                    longlat: [],
                },
                rules: {
                    longlat: [{
                        required: true,
                        trigger: "change",
                        validator: validator.longlat
                    }]
                }
            }
        },
        watch: {
            value: {
                handler(val){
                    this.form.longlat = val
                },
                deep: true
            },
        },
        methods: {
            // 打开地图选点
            selectGeo() {
                let long = this.form.longlat[0]
                let lat = this.form.longlat[1]
                this.$dialog('geo', {
                    long,
                    lat
                }).then(geo => {
                    this.form.longlat = [geo.long,geo.lat]
                    this.sync()
                }).catch((error) => {
                    console.log(error)
                })
            },
            onFilter(){
                this.sync()
            },
            sync() {
                let arr = [this.form.longlat[0], this.form.longlat[1]]
                this.$emit('input', arr)
                
                //- element版本兼容问题导致此方法在编辑页面值改变时传值失败
                // 所以原有的修改经纬度验证 替换掉dispatch的使用
                //this.dispatch('ElFormItem', 'el.form.change', [arr])
            },
            //- 表单验证
            validateForm() {
                let flag = null
                this.$refs.form.validate(valid => {
                    if (valid) {
                        flag = true
                    } else {
                        flag = false
                    }
                })
                return flag
            }
        },
        mounted() {
            if(Array.isArray(this.value) && this.value.length === 2) {
                this.form.longlat[0] = this.value[0]
                this.form.longlat[1] = this.value[1]
            }
        }
    }
</script>
