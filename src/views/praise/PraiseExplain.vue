<template> 
    <div class="explain-container">
        <div class="explain-content">
            <h3>集赞说明</h3>
            <hr class="horizon-line">
            <p>
                一. 报名时需关注秦汉胡同微信号并安装秦汉胡同国学APP；
                <br/>二. 秦汉胡同公益课正式学员有权享受由秦汉胡同提供的免费的公益课服务，为确保良好的出勤秩序，秦汉胡同授权各个校区在当期公益课学员报名时收取500元人名币作为出勤保证金，具体说明如下：
                <br/>1. 面试未通过不能菜参加该期公益课的学员，出勤保证金将在十个工作日内全额退还；
                <br/>2.报名未签署合同的学员因自身原因不参加当期及后期的公益课，出勤保证金不予以退还；
                <br/>3. 公益课学员出勤保证金将在学员全勤完成公益
            </p>
            <hr>
            <a @click.prevent="onConfirm">好的</a>
        </div>
    </div>
</template>
<script>
export default { 
    data(){
        return{ }
    },
    methods:{
        onConfirm(){
            this.$emit('close')
        }
    }, 
};
</script>
<style lang="scss" scoped>
.explain-container {
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  .explain-content { 
    width: 670px;
    display: flex;
    flex-direction: column;
    background-color: white;
    border-radius: 30px;
  }
  .explain-content h3 {
    font-size: 34px;
    color: rgb(85, 86, 87);
    margin: 40px 0 0 0;
    text-align: center;
  }
  .explain-content hr{
    border: none;
    margin: 32px 30px 0;
    height: 1px; /*no*/
    box-sizing: content-box;
    background-color: rgb(222, 225, 227);
  }
  .explain-content p {
    border: none;
    margin: 24px 30px 0px;
    color: rgb(153, 153, 153);
    font-size: 28px;
  }
  .explain-content a {
    border: 1px solid rgb(255, 163, 47);/*no*/
    margin: 40px auto 40px;
    width: 208px;
    height: 64px;
    line-height: 64px;
    font-size: 28px;
    text-align: center;
    border-radius: 64px;
    color: rgb(255, 163, 47);
  }
}
</style>
