const videoColumnDetail = () =>
  import(/* webpackChunkName: "videoCourse" */ "../views/onlineCourse/videoColumnDetail");
const videoCourseDetail = () =>
  import(/* webpackChunkName: "videoColumn" */ "../views/onlineCourse/videoCourseDetail");

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
