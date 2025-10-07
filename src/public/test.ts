interface IUser{
  buy:()=>void;
}

class VipUser implements IUser{
  buy(): void {
    console.log('VIP用户');
  }
}

class NormalUser implements IUser{
  buy(): void {
    console.log('普通用户');
  }   
}

const vipUser = new VipUser();
const normalUser = new NormalUser();