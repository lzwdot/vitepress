export default {
  data() {
    return {
      userList: [
        { id: 1, name: 'a' },
        { id: 2, name: 'b' },
        { id: 3, name: 'c' },
      ],
    };
  },
  computed: {
    userNameList() {
      return this.userList.map((item) => item.name); // 适配器，返回用户名列表
    },
  },
};
