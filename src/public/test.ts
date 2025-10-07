const user = {
  name: '张三',
  getName(){
    console.log('this', this);
    return this.name;
  },
};

const proxy = new Proxy(user, {});
user.getName(); //  User
proxy.getName(); // Proxy