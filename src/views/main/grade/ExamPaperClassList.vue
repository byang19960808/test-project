<template>
    <div>
      <p class="management">待批班级</p>
      <Waitring :approval="approval"  /> 
    </div>
</template>

<script>
import Waitring from './Waiting';
import {mapActions, mapState } from 'vuex'
export default {
    components:{
        Waitring
    },
    computed: {
        ...mapState("Correction", ["approval", "list"])
    },
    methods: {
        ...mapActions("Correction", ["getManger"]),
    },
    created() {
        this.getManger()
    },
    data(){
        return {
            page:1,
            limit:3
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
