<template>
    <div class="descrip-container">
        <div class="descrip-header">
        </div>
        <div class="course-name">
            绿山墙
        </div>
        <hr>
        <div class="course-detail">
            <div class="course-content">
                <h2>内容介绍:</h2>
                <p>本书讲述安环科啊哈买好没喇嘛哈一哈组计划了你的将神卡刚复活哦哦哦啊哦套哦跑客户帕克海派就回家吧奔。</p>
            </div>
            <div class="course-author">
                <h2>作者介绍:</h2>
                <p>本书讲述安环科啊哈买好没喇嘛哈一哈组计划了你的将神卡刚复活哦哦哦啊哦套哦跑客户帕克海派就回家吧奔。</p>
            </div>
            <div class="course-speaker">
                <h2>播讲者介绍:</h2>
                <p>本书讲述安环科啊哈买好没喇嘛哈一哈组计划了你的将神卡刚复活哦哦哦啊哦套哦跑客户帕克海派就回家吧奔。</p>
            </div>
        </div>

    </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
.descrip-container {
  display: flex;
  flex-direction: column;
  .descrip-header {
    height: 372px;
    width: 100%;
    background-color: #fde3e3;
  }
  .course-name {
    font-size: 52px;
    color: rgb(47, 59, 81);
    margin-top: 72px;
    margin-left: 40px;
  }

  hr {
    border: none;
    height: 1px; /*no*/
    background-color: rgb(227, 227, 227);
    margin: 72px 40px 0;
  }
  .course-detail {
    display: flex;
    flex-direction: column;
    margin: 40px;
    box-sizing: border-box;
    h2 {
      margin: 40px 0 0 0 ;
      font-size: 36px;
      color: rgb(5, 4, 0);
    }
    p {
      margin: 0;
      letter-spacing: 2px;/*no*/
      font-size: 32px;
      line-height: 52px;
      color: rgb(70, 69, 77);
    }
  }
}
</style>
