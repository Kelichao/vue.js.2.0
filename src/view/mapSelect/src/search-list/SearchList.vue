<template>
    <div class="result-list-wrapper" ref="resultWrapper">
        <el-card class="box-card" v-show="result.length > 0 &&! isNoData">
            <el-scrollbar class="yf_scroll-list" style="height:250px;">
                <div class="item" v-for="(item, index) in addressList " :key="item.index" @click="setLocationItem(item, index)">
                    <span class="el-icon-location-information yf_icon" :style="{color: index === activeIndex ? '#3385ff' : '#ff0000'}"></span>
                    <span class="yf_label">
                        <p :title="item.name"> {{item.name}}</p>
                        <p class="detail" :title="item.detailAddress"> {{item.detailAddress}}</p>
                        <p class="detail" :title="item.district"> {{item.district}}</p>
                    </span>    
                </div>
            </el-scrollbar>
        </el-card>
        <p class="no-search-data" v-show="isNoData && result.length === 0"> 暂无记录 </p>   
    </div>
</template>

<script>
export default  {
    name: 'SearchList',
    props: {
         result: {
             type: [Array, Object],
             default: () => {
                 return []
             }
         },
         left: {
              type: [Number, String],
              default: 32  
         },
         top: {
             type: [Number, String],
             default: 76
         },
         width: {
              type: Number,
             default: 0
         },
         height: {
             type: Number,
             default: 0
         },
         isNoData: {
              type: Boolean,
              default: false
         },
         activeIndex: {
              type: Number,
              default: 0
         }
    },
    computed: {
        addressList() {
            return this.result.map((item) => {
                return {
                    detailAddress: this.renderDetailAddress(item),
                    ...item,
                };
            });
        }  
    },
    methods: {
        /**
         * 渲染详细地址
         * @param row
         */
        renderDetailAddress(row) {
            let str = '';
            str += row.pname ? row.pname : '';
            str += row.cityname ? row.cityname : '';
            str += row.adname ? row.adname : '';
            str += row.address ? row.address : '';
            return str;
        },
        setLocationItem(item, index) {
            this.$emit('setLocationItem', {item, index})
            return {item, index};
        },
    }
}
</script>
<style lang="css" scoped src="./index.css"></style>
