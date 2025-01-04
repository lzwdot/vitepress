---
editLink: false
lastUpdated: false
---

# 关于

lzw. 一个 web 开发者！欢迎交流，可通过以下方式联系我：

邮箱：lzwdot#qq.com

<script setup>
import { VPTeamMembers } from 'vitepress/theme'

const members = [
  {
    avatar: './images/wx-qrcode.webp',
    title: '微信',
  },
  {
    avatar: './images/wx-sponsor.webp',
    title: '赞赏',
  },
]
</script>
<VPTeamMembers  :members="members"/>
<style lang="scss" scoped>
::v-deep{
 .VPTeamMembersItem {
  .avatar{
    width: 200px !important;
    height: 200px !important;
    border-radius: 0 !important;

    .avatar-img{
      border-radius:0 !important;
    }

}
}
}
</style>
