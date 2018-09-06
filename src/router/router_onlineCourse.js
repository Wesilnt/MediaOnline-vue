const videoColumnDetail = () =>
  import(/* webpackChunkName: "videoCourse" */ "../views/onlineCourse/videoCourseDetail");
const videoCourseDetail = () =>
  import(/* webpackChunkName: "videoColumn" */ "../views/onlineCourse/videoColumnDetail");

const PageInfo_From_onlineCourse = [
  {
    path: "/videoColumnDetail",
    name: "videoColumn",
    component: videoColumnDetail
  },
  {
    path: "/videoCourseDetail",
    name: "videoCourse",
    component: videoCourseDetail
  }
];

export default PageInfo_From_onlineCourse;
